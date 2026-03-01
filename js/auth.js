// Skilled Sapiens - Authentication Module

// Show Auth Modal
function showAuthModal(type) {
    const modal = document.getElementById('authModal');
    modal.classList.add('active');
    switchAuthTab(type);
}

// Close Auth Modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('active');
    // Reset forms
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
}

// Autofill Login Credentials
function autofillLogin(email, password) {
    document.getElementById('loginEmail').value = email;
    document.getElementById('loginPassword').value = password;
}

// Switch Auth Tab
function switchAuthTab(tab) {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.style.display = 'none');

    document.querySelector(`.auth-tab[data-tab="${tab}"]`).classList.add('active');
    document.getElementById(`${tab}Form`).style.display = 'block';
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        }

        closeAuthModal();
        updateNavAuth();
        showToast('Welcome back, ' + user.name + '!', 'success');

        // Refresh current page
        const currentPage = document.querySelector('.page.active').id;
        if (currentPage === 'homePage') {
            loadPopularCourses();
        }
    } else {
        showToast('Invalid email or password', 'error');
    }
}

// Handle Register
function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirm').value;
    const role = document.getElementById('registerRole').value;

    // Validation
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    // Check if user exists
    if (users.find(u => u.email === email)) {
        showToast('Email already registered', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        role: role,
        avatar: 'https://via.placeholder.com/150',
        bio: '',
        phone: '',
        location: '',
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    currentUser = newUser;
    saveData();

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    closeAuthModal();
    updateNavAuth();
    showToast('Account created successfully! Welcome to Skilled Sapiens.', 'success');

    // Refresh courses
    loadPopularCourses();
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    updateNavAuth();
    showPage('home');
    showToast('You have been logged out', 'info');
}

// Update Navigation Auth State
function updateNavAuth() {
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    const adminLink = document.getElementById('adminLink');

    if (currentUser) {
        navAuth.style.display = 'none';
        navUser.style.display = 'block';

        // Update user info
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userAvatar').src = currentUser.avatar;

        // Show/hide admin link
        if (currentUser.role === 'admin') {
            adminLink.style.display = 'flex';
        } else {
            adminLink.style.display = 'none';
        }
    } else {
        navAuth.style.display = 'flex';
        navUser.style.display = 'none';
    }
}

// Toggle User Dropdown
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
    const userMenu = document.querySelector('.nav-user');
    const dropdown = document.getElementById('userDropdown');

    if (userMenu && !userMenu.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Check auth state on load
function checkAuthState() {
    const storedUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }
    updateNavAuth();
}

// Initialize auth
checkAuthState();
