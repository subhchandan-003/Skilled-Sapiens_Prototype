// Skilled Sapiens - Main Application Module

// Page Navigation
function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show selected page
    const pageElement = document.getElementById(page + 'Page');
    if (pageElement) {
        pageElement.classList.add('active');
    }

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    // Close mobile menu
    document.getElementById('navMenu').classList.remove('active');

    // Scroll to top
    window.scrollTo(0, 0);

    // Load page-specific content
    switch (page) {
        case 'home':
            loadPopularCourses();
            break;
        case 'courses':
            loadCourses();
            break;
        case 'dashboard':
            if (!currentUser) {
                showAuthModal('login');
                return;
            }
            loadDashboard();
            break;
        case 'tasks':
            if (!currentUser) {
                showAuthModal('login');
                return;
            }
            loadTasksPage();
            break;
        case 'alerts':
            if (!currentUser) {
                showAuthModal('login');
                return;
            }
            loadAlertsPage();
            break;
        case 'mentor':
            loadMentorPage();
            break;
        case 'my-learning':
            if (!currentUser) {
                showAuthModal('login');
                return;
            }
            loadMyLearning();
            break;
        case 'analytics':
            if (!currentUser) {
                showAuthModal('login');
                return;
            }
            loadAnalytics();
            break;
        case 'admin':
            if (!currentUser || currentUser.role !== 'admin') {
                showPage('home');
                return;
            }
            loadAdminDashboard();
            break;
        case 'profile':
            if (!currentUser) {
                showAuthModal('login');
                return;
            }
            loadProfile();
            break;
    }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <i class="fas ${icon[type]}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Load Popular Courses
function loadPopularCourses() {
    const grid = document.getElementById('popularCoursesGrid');
    const popular = courses.slice(0, 4);

    grid.innerHTML = popular.map(course => createCourseCard(course)).join('');

    // Add click handlers
    grid.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
            const courseId = parseInt(card.dataset.id);
            showCourseDetail(courseId);
        });
    });
}

// Create Course Card
function createCourseCard(course) {
    const price = course.price === 0 ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`;
    const priceClass = course.price === 0 ? 'free' : '';

    return `
        <div class="course-card" data-id="${course.id}">
            <div class="course-thumbnail">
                <img src="${course.thumbnail}" alt="${course.title}">
                <span class="course-badge">${course.level}</span>
            </div>
            <div class="course-body">
                <span class="course-category">${formatCategory(course.category)}</span>
                <h3 class="course-title">${course.title}</h3>
                <div class="course-meta">
                    <span><i class="fas fa-clock"></i> ${course.duration}h</span>
                    <span><i class="fas fa-play-circle"></i> ${course.lessons} lessons</span>
                    <span><i class="fas fa-star"></i> ${course.rating}</span>
                </div>
                <div class="course-footer">
                    <div class="course-instructor">
                        <img src="${course.instructor.avatar}" alt="${course.instructor.name}">
                        <span>${course.instructor.name}</span>
                    </div>
                    <span class="course-price ${priceClass}">${price}</span>
                </div>
            </div>
        </div>
    `;
}

// Format Category
function formatCategory(category) {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Show Course Detail
function showCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    showPage('courseDetail');

    const detail = document.getElementById('courseDetail');
    const price = course.price === 0 ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`;
    const priceClass = course.price === 0 ? 'free' : '';
    const isEnrolled = currentUser && currentUser.enrolledCourses && currentUser.enrolledCourses.includes(course.id);

    detail.innerHTML = `
        <div class="course-detail-header">
            <div class="course-detail-info">
                <span class="course-category" style="margin-bottom: 12px; display: inline-block;">${formatCategory(course.category)}</span>
                <h1>${course.title}</h1>
                <p style="font-size: 18px; color: var(--gray-color); margin-bottom: 20px;">${course.description}</p>
                <div class="course-detail-meta">
                    <span><i class="fas fa-star"></i> ${course.rating} rating</span>
                    <span><i class="fas fa-users"></i> ${course.students.toLocaleString()} students</span>
                    <span><i class="fas fa-clock"></i> ${course.duration} hours</span>
                    <span><i class="fas fa-play-circle"></i> ${course.lessons} lessons</span>
                    <span><i class="fas fa-signal"></i> ${course.level}</span>
                </div>
                <div class="course-instructor" style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                    <img src="${course.instructor.avatar}" alt="${course.instructor.name}" style="width: 56px; height: 56px; border-radius: 50%;">
                    <div>
                        <p style="font-size: 14px; color: var(--gray-color); margin-bottom: 4px;">Instructor</p>
                        <p style="font-weight: 600; color: var(--dark-color);">${course.instructor.name}</p>
                    </div>
                </div>
            </div>
            <div class="course-enroll-card">
                <img src="${course.thumbnail}" alt="${course.title}" style="width: 100%; border-radius: var(--radius-md); margin-bottom: 24px;">
                <div class="course-price ${priceClass}" style="font-size: 32px; margin-bottom: 24px;">${price}</div>
                ${isEnrolled ? `
                    <button class="btn btn-primary btn-block" onclick="continueCourse(${course.id})">
                        <i class="fas fa-play"></i> Continue Learning
                    </button>
                ` : `
                    <button class="btn btn-primary btn-block" onclick="enrollCourse(${course.id})">
                        <i class="fas fa-shopping-cart"></i> Enroll Now
                    </button>
                `}
                <button class="btn btn-outline btn-block" onclick="addToWishlist(${course.id})">
                    <i class="fas fa-heart"></i> Add to Wishlist
                </button>
                <div class="course-includes">
                    <h4>This course includes:</h4>
                    <ul>
                        <li><i class="fas fa-video"></i> ${course.duration} hours on-demand video</li>
                        <li><i class="fas fa-file-code"></i> Coding exercises</li>
                        <li><i class="fas fa-certificate"></i> Certificate of completion</li>
                        <li><i class="fas fa-infinity"></i> Lifetime access</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="course-curriculum">
            <h2>Course Curriculum</h2>
            ${course.curriculum ? course.curriculum.map((section, index) => `
                <div class="curriculum-section">
                    <div class="curriculum-header" onclick="toggleCurriculum(${index})">
                        <h3>${section.title}</h3>
                        <span>${section.lessons.length} lessons</span>
                    </div>
                    <div class="curriculum-lessons" id="curriculum-${index}">
                        ${section.lessons.map(lesson => `
                            <div class="curriculum-lesson" onclick="playLesson(${course.id}, ${lesson.id})">
                                <i class="fas ${lesson.completed ? 'fa-check-circle' : 'fa-play-circle'}"></i>
                                <span>${lesson.title}</span>
                                <span class="lesson-duration">${lesson.duration}</span>
                                <span class="lesson-status ${lesson.completed ? 'completed' : ''}">
                                    ${lesson.completed ? '<i class="fas fa-check"></i>' : ''}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('') : '<p>Curriculum coming soon</p>'}
        </div>
    `;
}

// Toggle Curriculum
function toggleCurriculum(index) {
    const section = document.getElementById(`curriculum-${index}`);
    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

// Enroll Course
function enrollCourse(courseId) {
    if (!currentUser) {
        showAuthModal('login');
        return;
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    if (!currentUser.enrolledCourses) {
        currentUser.enrolledCourses = [];
    }

    currentUser.enrolledCourses.push(courseId);
    course.enrolled = true;
    course.progress = 0;

    // Update user in users array
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    }

    saveData();
    showCourseDetail(courseId);
    showToast('Successfully enrolled in ' + course.title, 'success');
}

// Continue Course
function continueCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.curriculum) return;

    // Find the first incomplete lesson
    let lessonToPlay = null;
    for (const section of course.curriculum) {
        for (const lesson of section.lessons) {
            if (!lesson.completed) {
                lessonToPlay = lesson;
                break;
            }
        }
        if (lessonToPlay) break;
    }

    if (!lessonToPlay) {
        lessonToPlay = course.curriculum[0].lessons[0];
    }

    playLesson(courseId, lessonToPlay.id);
}

// Play Lesson
function playLesson(courseId, lessonId) {
    const course = courses.find(c => c.id === courseId);
    if (!course || !course.curriculum) return;

    // Find lesson
    let lesson = null;
    for (const section of course.curriculum) {
        lesson = section.lessons.find(l => l.id === lessonId);
        if (lesson) break;
    }

    if (!lesson) return;

    // Show video player
    showPage('videoPlayer');

    // Update video info
    document.getElementById('videoTitle').textContent = lesson.title;
    document.getElementById('videoDescription').textContent = `Lesson from ${course.title}`;

    // Store current lesson info
    window.currentCourseId = courseId;
    window.currentLessonId = lessonId;

    // Load lesson list
    const lessonList = document.getElementById('lessonList');
    lessonList.innerHTML = '';

    course.curriculum.forEach((section, sectionIndex) => {
        section.lessons.forEach(l => {
            const isActive = l.id === lessonId;
            const isCompleted = l.completed;

            lessonList.innerHTML += `
                <div class="lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                     onclick="playLesson(${courseId}, ${l.id})">
                    <div class="lesson-item-icon">
                        <i class="fas ${isCompleted ? 'fa-check' : 'fa-play'}"></i>
                    </div>
                    <div class="lesson-item-info">
                        <span class="lesson-item-title">${l.title}</span>
                        <span class="lesson-item-duration">${l.duration}</span>
                    </div>
                </div>
            `;
        });
    });

    // Load notes
    loadLessonNotes(courseId, lessonId);
}

// Mark Complete
function markComplete() {
    const courseId = window.currentCourseId;
    const lessonId = window.currentLessonId;

    if (!courseId || !lessonId) return;

    const course = courses.find(c => c.id === courseId);
    if (!course || !course.curriculum) return;

    // Mark lesson as complete
    for (const section of course.curriculum) {
        const lesson = section.lessons.find(l => l.id === lessonId);
        if (lesson) {
            lesson.completed = true;
            break;
        }
    }

    // Calculate progress
    const totalLessons = course.curriculum.reduce((sum, s) => sum + s.lessons.length, 0);
    const completedLessons = course.curriculum.reduce((sum, s) =>
        sum + s.lessons.filter(l => l.completed).length, 0
    );
    course.progress = Math.round((completedLessons / totalLessons) * 100);

    saveData();

    // Reload lesson list
    playLesson(courseId, lessonId);

    if (course.progress === 100) {
        showToast('Congratulations! You completed the course!', 'success');
    } else {
        showToast('Lesson marked as complete!', 'success');
    }
}

// Toggle Notes
function toggleNotes() {
    const panel = document.getElementById('notesPanel');
    panel.classList.toggle('active');
}

// Load Lesson Notes
function loadLessonNotes(courseId, lessonId) {
    const notesKey = `notes_${courseId}_${lessonId}`;
    const notes = localStorage.getItem(notesKey) || '';
    document.getElementById('lessonNotes').value = notes;
}

// Save Notes
function saveNotes() {
    const courseId = window.currentCourseId;
    const lessonId = window.currentLessonId;

    if (!courseId || !lessonId) return;

    const notesKey = `notes_${courseId}_${lessonId}`;
    const notes = document.getElementById('lessonNotes').value;
    localStorage.setItem(notesKey, notes);

    showToast('Notes saved!', 'success');
}

// Add to Wishlist
function addToWishlist(courseId) {
    if (!currentUser) {
        showAuthModal('login');
        return;
    }

    showToast('Added to wishlist!', 'success');
}

// Initialize App
document.addEventListener('DOMContentLoaded', function () {
    // Check auth state
    checkAuthState();

    // Load popular courses
    loadPopularCourses();
});
