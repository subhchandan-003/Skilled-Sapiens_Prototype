// Skilled Sapiens - Courses Module

// Load All Courses
function loadCourses() {
    const grid = document.getElementById('coursesGrid');

    const coursesHTML = courses.map(course => createCourseCard(course)).join('');
    grid.innerHTML = coursesHTML;

    // Add click handlers
    grid.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
            const courseId = parseInt(card.dataset.id);
            showCourseDetail(courseId);
        });
    });
}

// Filter Courses
function filterCourses() {
    const category = document.getElementById('categoryFilter').value;
    const level = document.getElementById('levelFilter').value;
    const search = document.getElementById('searchFilter').value.toLowerCase();

    let filtered = courses;

    if (category) {
        filtered = filtered.filter(c => c.category === category);
    }

    if (level) {
        filtered = filtered.filter(c => c.level === level);
    }

    if (search) {
        filtered = filtered.filter(c =>
            c.title.toLowerCase().includes(search) ||
            c.description.toLowerCase().includes(search) ||
            c.instructor.name.toLowerCase().includes(search)
        );
    }

    const grid = document.getElementById('coursesGrid');

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-search"></i>
                <h3>No courses found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
    } else {
        grid.innerHTML = filtered.map(course => createCourseCard(course)).join('');

        grid.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', () => {
                const courseId = parseInt(card.dataset.id);
                showCourseDetail(courseId);
            });
        });
    }
}

// Load My Learning
function loadMyLearning() {
    if (!currentUser || !currentUser.enrolledCourses) {
        document.getElementById('learningContent').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>No courses yet</h3>
                <p>Start learning by enrolling in courses</p>
                <button class="btn btn-primary" onclick="showPage('courses')">Browse Courses</button>
            </div>
        `;
        return;
    }

    const enrolledCourses = courses.filter(c => currentUser.enrolledCourses.includes(c.id));

    if (enrolledCourses.length === 0) {
        document.getElementById('learningContent').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>No courses yet</h3>
                <p>Start learning by enrolling in courses</p>
                <button class="btn btn-primary" onclick="showPage('courses')">Browse Courses</button>
            </div>
        `;
        return;
    }

    updateLearningContent('in-progress');
}

// Switch Learning Tab
function switchLearningTab(tab, event) {
    document.querySelectorAll('.learning-tab').forEach(t => t.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // Fallback: find the tab element and activate it
        const tabElement = document.querySelector(`.learning-tab[data-tab="${tab}"]`);
        if (tabElement) {
            tabElement.classList.add('active');
        }
    }

    updateLearningContent(tab);
}

// Update Learning Content
function updateLearningContent(tab) {
    if (!currentUser || !currentUser.enrolledCourses) return;

    const enrolledCourses = courses.filter(c => currentUser.enrolledCourses.includes(c.id));
    let displayCourses = [];

    switch (tab) {
        case 'in-progress':
            displayCourses = enrolledCourses.filter(c => c.progress > 0 && c.progress < 100);
            break;
        case 'completed':
            displayCourses = enrolledCourses.filter(c => c.progress === 100);
            break;
        case 'wishlist':
            // For now, show enrolled courses as wishlist
            displayCourses = enrolledCourses;
            break;
    }

    const content = document.getElementById('learningContent');

    if (displayCourses.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h3>No courses here</h3>
                <p>${tab === 'in-progress' ? 'Continue your learning journey' : 'Complete courses to see them here'}</p>
                ${tab === 'in-progress' ? '<button class="btn btn-primary" onclick="showPage(\'courses\')">Browse Courses</button>' : ''}
            </div>
        `;
    } else {
        content.innerHTML = displayCourses.map(course => `
            <div class="progress-card">
                <div class="progress-card-image">
                    <img src="${course.thumbnail}" alt="${course.title}">
                </div>
                <div class="progress-card-content">
                    <h3>${course.title}</h3>
                    <p>${course.shortDescription}</p>
                    <div class="progress-info">
                        <span>Progress:</span>
                        <strong>${course.progress}%</strong>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                    <div style="margin-top: 16px; display: flex; gap: 12px;">
                        <button class="btn btn-primary btn-sm" onclick="continueCourse(${course.id})">
                            ${course.progress === 0 ? 'Start Learning' : 'Continue'}
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="showCourseDetail(${course.id})">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Load Course Detail
function loadCourseDetail(courseId) {
    showCourseDetail(courseId);
}

// Format Duration
function formatDuration(hours) {
    if (hours < 1) {
        return Math.round(hours * 60) + ' min';
    }
    return hours + ' hours';
}

// Get Course Progress
function getCourseProgress(course) {
    if (!course.curriculum) return 0;

    const totalLessons = course.curriculum.reduce((sum, s) => sum + s.lessons.length, 0);
    const completedLessons = course.curriculum.reduce((sum, s) =>
        sum + s.lessons.filter(l => l.completed).length, 0
    );

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
}
