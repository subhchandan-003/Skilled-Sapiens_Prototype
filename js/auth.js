// Skilled Sapiens - Authentication Module

// ─── Initials Avatar Helpers ───────────────────────────────────────────────
function getInitials(name) {
    if (!name) return '?';
    return name.split(' ')
        .filter(Boolean)
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
}

function getAvatarColor(name) {
    const palette = [
        '#6366f1', '#10b981', '#f59e0b', '#ef4444',
        '#8b5cf6', '#06b6d4', '#ec4899', '#14b8a6',
        '#f97316', '#84cc16'
    ];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return palette[Math.abs(hash) % palette.length];
}

/**
 * Returns an HTML string for an initials avatar <div>.
 * @param {string} name  - Full name of the user
 * @param {number} size  - Pixel size (diameter)
 * @param {string} [extraClass] - Optional extra CSS class
 */
function createInitialsAvatarHTML(name, size, extraClass = '') {
    const initials = getInitials(name);
    const bg = getAvatarColor(name);
    const fontSize = Math.round(size * 0.38);
    return `<div class="initials-avatar ${extraClass}"
        style="width:${size}px;height:${size}px;background:${bg};border-radius:50%;
               display:inline-flex;align-items:center;justify-content:center;
               color:#fff;font-weight:700;font-size:${fontSize}px;
               flex-shrink:0;letter-spacing:0.5px;user-select:none;"
    >${initials}</div>`;
}

// ─── Show / Close Auth Modal ───────────────────────────────────────────────
function showAuthModal(type) {
    const modal = document.getElementById('authModal');
    modal.classList.add('active');
    switchAuthTab(type || 'login');
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('active');
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
}

// Close modal on backdrop click
document.getElementById('authModal').addEventListener('click', function (e) {
    if (e.target === this) closeAuthModal();
});

// ─── Autofill Quick Login ──────────────────────────────────────────────────
function autofillLogin(email, password) {
    document.getElementById('loginEmail').value = email;
    document.getElementById('loginPassword').value = password;
    // Visual feedback on the form
    ['loginEmail', 'loginPassword'].forEach(id => {
        const el = document.getElementById(id);
        el.classList.add('autofilled');
        setTimeout(() => el.classList.remove('autofilled'), 800);
    });
}

// ─── Toggle Password Visibility ───────────────────────────────────────────
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// ─── Switch Auth Tab ───────────────────────────────────────────────────────
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.style.display = 'none');

    const tabEl = document.querySelector(`.auth-tab[data-tab="${tab}"]`);
    if (tabEl) tabEl.classList.add('active');
    const formEl = document.getElementById(`${tab}Form`);
    if (formEl) formEl.style.display = 'block';
}

// ─── Handle Login ──────────────────────────────────────────────────────────
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const btn = event.target.querySelector('[type=submit]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in…';
    btn.disabled = true;

    setTimeout(() => {
        const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

        if (user) {
            currentUser = user;
            user.lastActive = new Date().toISOString().split('T')[0];

            if (rememberMe) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            }

            closeAuthModal();
            updateNavAuth();
            showToast(`Welcome back, ${user.name.split(' ')[0]}! 🎉`, 'success');

            // Redirect based on role
            if (user.role === 'admin') {
                showPage('admin');
            } else if (user.role === 'mentor') {
                showPage('mentor');
            } else {
                showPage('dashboard');
            }
        } else {
            showToast('Invalid email or password. Please try again.', 'error');
            btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
            btn.disabled = false;
        }
    }, 600);
}

// ─── Handle Register ───────────────────────────────────────────────────────
function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirm').value;
    const role = document.getElementById('registerRole').value;

    if (password !== confirmPassword) {
        showToast('Passwords do not match.', 'error');
        return;
    }
    if (password.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
    }
    if (users.find(u => u.email.toLowerCase() === email)) {
        showToast('This email is already registered.', 'error');
        return;
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        role,
        avatar: null,
        bio: '',
        phone: '',
        location: '',
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        notificationPrefs: { email: true, whatsapp: false, inApp: true }
    };

    users.push(newUser);
    currentUser = newUser;
    saveData();

    localStorage.setItem('currentUser', JSON.stringify(newUser));
    closeAuthModal();
    updateNavAuth();
    showToast(`Account created! Welcome to Skilled Sapiens, ${name.split(' ')[0]}! 🎓`, 'success');
    loadPopularCourses();
}

// ─── Logout ────────────────────────────────────────────────────────────────
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    updateNavAuth();
    showPage('home');
    showToast('You have been logged out. See you soon! 👋', 'info');
}

// ─── Update Nav Auth State ─────────────────────────────────────────────────
function updateNavAuth() {
    const navAuth = document.getElementById('navAuth');
    const navUser = document.getElementById('navUser');
    const adminLink = document.getElementById('adminLink');
    const mentorLink = document.getElementById('mentorLink');

    if (currentUser) {
        navAuth.style.display = 'none';
        navUser.style.display = 'block';

        document.getElementById('userName').textContent = currentUser.name.split(' ')[0];

        // Render initials avatar in nav
        const avatarEl = document.getElementById('userAvatarInitials');
        if (avatarEl) {
            const initials = getInitials(currentUser.name);
            const bg = getAvatarColor(currentUser.name);
            avatarEl.textContent = initials;
            avatarEl.style.background = bg;
        }

        // Show/hide role-specific links
        adminLink.style.display = (currentUser.role === 'admin') ? 'flex' : 'none';
        mentorLink.style.display = (currentUser.role === 'mentor' || currentUser.role === 'admin') ? 'flex' : 'none';
    } else {
        navAuth.style.display = 'flex';
        navUser.style.display = 'none';
    }
}

// ─── Toggle User Dropdown ──────────────────────────────────────────────────
function toggleUserDropdown() {
    document.getElementById('userDropdown').classList.toggle('active');
}

document.addEventListener('click', function (e) {
    const userMenu = document.querySelector('.nav-user');
    const dropdown = document.getElementById('userDropdown');
    if (userMenu && !userMenu.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// ─── Load Profile Page ─────────────────────────────────────────────────────
function loadProfile() {
    if (!currentUser) return;

    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileRole').textContent =
        currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

    const locEl = document.getElementById('profileLocation');
    if (locEl) locEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${currentUser.location || 'India'}`;

    const bioEl = document.getElementById('profileBio');
    if (bioEl) bioEl.textContent = currentUser.bio || 'No bio added yet.';

    // Large initials avatar
    const avatarLarge = document.getElementById('profileAvatarLarge');
    if (avatarLarge) {
        avatarLarge.textContent = getInitials(currentUser.name);
        avatarLarge.style.background = getAvatarColor(currentUser.name);
    }

    // Stats
    const statsEl = document.getElementById('profileStats');
    if (statsEl) {
        const enrolled = currentUser.enrolledCourses ? currentUser.enrolledCourses.length : 0;
        const completed = currentUser.completedCourses ? currentUser.completedCourses.length : 0;
        const progress = userProgress.find(p => p.userId === currentUser.id);
        statsEl.innerHTML = `
            <div class="profile-stat"><span class="stat-value">${enrolled}</span><span class="stat-label">Enrolled</span></div>
            <div class="profile-stat"><span class="stat-value">${completed}</span><span class="stat-label">Completed</span></div>
            <div class="profile-stat"><span class="stat-value">${progress ? progress.totalPoints : 0}</span><span class="stat-label">Points</span></div>
            <div class="profile-stat"><span class="stat-value">${progress ? progress.skillScore : 0}</span><span class="stat-label">Skill Score</span></div>
        `;
    }
}

// ─── Check Auth State on Load ──────────────────────────────────────────────
function checkAuthState() {
    const stored = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    if (stored) {
        currentUser = JSON.parse(stored);
    }
    updateNavAuth();
}

checkAuthState();
