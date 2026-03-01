// Skilled Sapiens - Analytics Module

// Load Analytics
function loadAnalytics() {
    if (!currentUser) {
        showAuthModal('login');
        return;
    }

    // Get user's enrolled courses
    const enrolledCourses = currentUser.enrolledCourses ?
        courses.filter(c => currentUser.enrolledCourses.includes(c.id)) : [];

    const completedCourses = enrolledCourses.filter(c => c.progress === 100);

    // Update stats
    document.getElementById('totalCoursesEnrolled').textContent = enrolledCourses.length;
    document.getElementById('coursesCompleted').textContent = completedCourses.length;
    document.getElementById('totalHoursLearned').textContent = calculateTotalHours(enrolledCourses);
    document.getElementById('certificatesEarned').textContent = completedCourses.length;

    // Load progress chart
    loadProgressChart(enrolledCourses);

    // Load quiz stats
    loadQuizStats();
}

// Calculate Total Hours
function calculateTotalHours(enrolledCourses) {
    let totalHours = 0;
    enrolledCourses.forEach(course => {
        totalHours += (course.duration || 0) * (course.progress || 0) / 100;
    });
    return Math.round(totalHours * 10) / 10;
}

// Load Progress Chart
function loadProgressChart(enrolledCourses) {
    const container = document.getElementById('progressChart');

    if (enrolledCourses.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 40px;">
                <i class="fas fa-chart-pie"></i>
                <h3>No progress yet</h3>
                <p>Enroll in courses to see your progress</p>
            </div>
        `;
        return;
    }

    container.innerHTML = enrolledCourses.slice(0, 5).map(course => `
        <div class="progress-item">
            <div class="progress-item-header">
                <h4>${course.title.substring(0, 30)}...</h4>
                <span>${course.progress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
        </div>
    `).join('');
}

// Load Quiz Stats
function loadQuizStats() {
    const container = document.getElementById('quizStats');
    const quizResults = analyticsData.quizResults;

    if (!quizResults || quizResults.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 40px;">
                <i class="fas fa-clipboard-list"></i>
                <h3>No quizzes yet</h3>
                <p>Complete quizzes to see your results</p>
            </div>
        `;
        return;
    }

    const passed = quizResults.filter(q => q.score >= 70).length;
    const failed = quizResults.filter(q => q.score < 70).length;
    const avgScore = quizResults.reduce((sum, q) => sum + q.score, 0) / quizResults.length;

    container.innerHTML = `
        <div class="quiz-stat-item">
            <div class="quiz-stat-icon passed">
                <i class="fas fa-check"></i>
            </div>
            <div class="quiz-stat-data">
                <h4>Passed</h4>
                <span>${passed} quizzes</span>
            </div>
        </div>
        <div class="quiz-stat-item">
            <div class="quiz-stat-icon failed">
                <i class="fas fa-times"></i>
            </div>
            <div class="quiz-stat-data">
                <h4>Failed</h4>
                <span>${failed} quizzes</span>
            </div>
        </div>
        <div class="quiz-stat-item">
            <div class="quiz-stat-icon average">
                <i class="fas fa-chart-line"></i>
            </div>
            <div class="quiz-stat-data">
                <h4>Average Score</h4>
                <span>${Math.round(avgScore)}%</span>
            </div>
        </div>
    `;
}

// Load Profile
function loadProfile() {
    if (!currentUser) return;

    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileImage').src = currentUser.avatar;
    document.getElementById('profileRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);

    // Fill form
    document.getElementById('editName').value = currentUser.name;
    document.getElementById('editEmail').value = currentUser.email;
    document.getElementById('editBio').value = currentUser.bio || '';
    document.getElementById('editPhone').value = currentUser.phone || '';
    document.getElementById('editLocation').value = currentUser.location || '';
}

// Update Profile
function updateProfile(event) {
    event.preventDefault();

    if (!currentUser) return;

    currentUser.name = document.getElementById('editName').value;
    currentUser.email = document.getElementById('editEmail').value;
    currentUser.bio = document.getElementById('editBio').value;
    currentUser.phone = document.getElementById('editPhone').value;
    currentUser.location = document.getElementById('editLocation').value;

    // Update in users array
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    }

    saveData();
    updateNavAuth();
    loadProfile();
    showToast('Profile updated successfully', 'success');
}

// Update Avatar
function updateAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Create object URL for preview
    const imageUrl = URL.createObjectURL(file);
    currentUser.avatar = imageUrl;

    // Update in users array
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].avatar = imageUrl;
    }

    saveData();
    updateNavAuth();
    document.getElementById('profileImage').src = imageUrl;
    showToast('Avatar updated', 'success');
}
