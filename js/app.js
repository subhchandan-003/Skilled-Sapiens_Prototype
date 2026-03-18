// Skilled Sapiens - Main Application Module

// ─── Page Navigation ───────────────────────────────────────────────────────
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    const pageElement = document.getElementById(page + 'Page');
    if (pageElement) pageElement.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) link.classList.add('active');
    });

    document.getElementById('navMenu').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (page) {
        case 'home':
            loadPopularCourses();
            initScrollAnimations();
            break;
        case 'courses':
            loadCourses();
            break;
        case 'dashboard':
            if (!currentUser) { showAuthModal('login'); return; }
            loadDashboard();
            break;
        case 'tasks':
            if (!currentUser) { showAuthModal('login'); return; }
            loadTasksPage();
            break;
        case 'alerts':
            if (!currentUser) { showAuthModal('login'); return; }
            loadAlertsPage();
            break;
        case 'mentor':
            loadMentorPage();
            break;
        case 'myLearning':
            if (!currentUser) { showAuthModal('login'); return; }
            loadMyLearning();
            break;
        case 'analytics':
            if (!currentUser) { showAuthModal('login'); return; }
            if (typeof loadAnalytics === 'function') loadAnalytics();
            break;
        case 'admin':
            if (!currentUser || currentUser.role !== 'admin') { showPage('home'); return; }
            loadAdminDashboard();
            break;
        case 'profile':
            if (!currentUser) { showAuthModal('login'); return; }
            loadProfile();
            break;
    }
}

// ─── Mobile Menu ───────────────────────────────────────────────────────────
function toggleMobileMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// ─── Toast Notifications ───────────────────────────────────────────────────
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);
    // Animate in
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 4500);
}

// ─── Initials Avatar Helpers (duplicated here for use outside auth.js) ─────
function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase();
}
function getAvatarColor(name) {
    const palette = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899','#14b8a6','#f97316','#84cc16'];
    let hash = 0;
    for (let i = 0; i < (name||'').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return palette[Math.abs(hash) % palette.length];
}
function createInitialsAvatarHTML(name, size, extraClass = '') {
    const initials = getInitials(name);
    const bg = getAvatarColor(name);
    const fontSize = Math.round(size * 0.38);
    return `<div class="initials-avatar ${extraClass}" style="width:${size}px;height:${size}px;background:${bg};border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:${fontSize}px;flex-shrink:0;letter-spacing:0.5px;">${initials}</div>`;
}

// ─── Format Category ───────────────────────────────────────────────────────
function formatCategory(category) {
    const map = {
        'finance': 'Finance',
        'marketing': 'Marketing',
        'hr-management': 'HR Management',
        'analytics': 'Business Analytics',
        'operations': 'Operations',
        'entrepreneurship': 'Entrepreneurship',
        'leadership': 'Leadership'
    };
    return map[category] || category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ─── Create Course Card ────────────────────────────────────────────────────
function createCourseCard(course) {
    const isFree = course.price === 0;
    const priceDisplay = isFree ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`;
    const origDisplay = course.originalPrice ? `₹${course.originalPrice.toLocaleString('en-IN')}` : '';
    const discount = (course.originalPrice && course.price > 0)
        ? Math.round((1 - course.price / course.originalPrice) * 100)
        : 0;

    const stars = renderStars(course.rating);
    const instructorAvatar = createInitialsAvatarHTML(course.instructor.name, 32);

    return `
        <div class="course-card" data-id="${course.id}">
            <div class="course-thumbnail">
                <img src="${course.thumbnail}" alt="${course.title}" loading="lazy">
                <span class="course-badge level-${course.level.toLowerCase()}">${course.level}</span>
                ${discount > 0 ? `<span class="discount-badge">-${discount}% OFF</span>` : ''}
            </div>
            <div class="course-body">
                <span class="course-category">${formatCategory(course.category)}</span>
                <h3 class="course-title">${course.title}</h3>
                <div class="course-rating-row">
                    <span class="rating-stars">${stars}</span>
                    <span class="rating-value">${course.rating}</span>
                    <span class="rating-count">(${course.students.toLocaleString('en-IN')})</span>
                </div>
                <div class="course-meta">
                    <span><i class="fas fa-clock"></i> ${course.duration}h</span>
                    <span><i class="fas fa-play-circle"></i> ${course.lessons} lessons</span>
                </div>
                <div class="course-footer">
                    <div class="course-instructor">
                        ${instructorAvatar}
                        <span>${course.instructor.name.split(' ').slice(-1)[0]}</span>
                    </div>
                    <div class="price-block">
                        <span class="course-price ${isFree ? 'free' : ''}">${priceDisplay}</span>
                        ${origDisplay ? `<span class="course-price-orig">${origDisplay}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render star icons
function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let html = '';
    for (let i = 0; i < full; i++) html += '<i class="fas fa-star"></i>';
    if (half) html += '<i class="fas fa-star-half-alt"></i>';
    return html;
}

// ─── Load Popular Courses ──────────────────────────────────────────────────
function loadPopularCourses() {
    const grid = document.getElementById('popularCoursesGrid');
    if (!grid) return;
    const popular = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 4);
    grid.innerHTML = popular.map(c => createCourseCard(c)).join('');
    attachCourseCardListeners(grid);
    // Stagger animation
    grid.querySelectorAll('.course-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 80}ms`;
        card.classList.add('animate-in');
    });
}

function attachCourseCardListeners(container) {
    container.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => showCourseDetail(parseInt(card.dataset.id)));
    });
}

// ─── Show Course Detail ────────────────────────────────────────────────────
function showCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    showPage('courseDetail');

    const isFree = course.price === 0;
    const priceDisplay = isFree ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`;
    const origDisplay = course.originalPrice ? `₹${course.originalPrice.toLocaleString('en-IN')}` : '';
    const discount = (course.originalPrice && course.price > 0)
        ? Math.round((1 - course.price / course.originalPrice) * 100)
        : 0;
    const isEnrolled = currentUser?.enrolledCourses?.includes(course.id);
    const instructorAvatar = createInitialsAvatarHTML(course.instructor.name, 64);

    const detail = document.getElementById('courseDetail');
    detail.innerHTML = `
        <div class="course-detail-header">
            <div class="course-detail-info">
                <span class="course-category">${formatCategory(course.category)}</span>
                <h1>${course.title}</h1>
                <p class="course-detail-desc">${course.description}</p>
                <div class="course-detail-meta">
                    <span><i class="fas fa-star" style="color:#fbbf24"></i> ${course.rating}</span>
                    <span><i class="fas fa-users"></i> ${course.students.toLocaleString('en-IN')} students</span>
                    <span><i class="fas fa-clock"></i> ${course.duration} hours</span>
                    <span><i class="fas fa-play-circle"></i> ${course.lessons} lessons</span>
                    <span><i class="fas fa-signal"></i> ${course.level}</span>
                </div>
                <div class="instructor-detail-row">
                    ${instructorAvatar}
                    <div>
                        <p class="instructor-label">Instructor</p>
                        <p class="instructor-name">${course.instructor.name}</p>
                        <p class="instructor-title">${course.instructor.title || ''}</p>
                    </div>
                </div>
            </div>
            <div class="course-enroll-card">
                <div class="course-enroll-img">
                    <img src="${course.thumbnail}" alt="${course.title}">
                </div>
                <div class="enroll-price-block">
                    <span class="enroll-price ${isFree ? 'free' : ''}">${priceDisplay}</span>
                    ${origDisplay ? `<span class="enroll-price-orig">${origDisplay}</span>` : ''}
                    ${discount > 0 ? `<span class="enroll-discount-badge">${discount}% OFF</span>` : ''}
                </div>
                ${isEnrolled ? `
                    <button class="btn btn-primary btn-block" onclick="continueCourse(${course.id})">
                        <i class="fas fa-play"></i> Continue Learning
                    </button>
                ` : `
                    <button class="btn btn-primary btn-block enroll-cta" onclick="enrollCourse(${course.id})">
                        <i class="fas fa-graduation-cap"></i> Enrol Now
                    </button>
                `}
                <button class="btn btn-outline btn-block mt-2" onclick="addToWishlist(${course.id})">
                    <i class="fas fa-heart"></i> Add to Wishlist
                </button>
                <div class="course-includes">
                    <h4>This course includes:</h4>
                    <ul>
                        ${(course.features || [
                            `${course.duration} hours on-demand video`,
                            'Case studies & assignments',
                            'Certificate of completion',
                            'Lifetime access'
                        ]).map(f => `<li><i class="fas fa-check-circle"></i> ${f}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        <div class="course-curriculum">
            <h2>Course Curriculum</h2>
            ${course.curriculum ? course.curriculum.map((section, i) => `
                <div class="curriculum-section">
                    <div class="curriculum-header" onclick="toggleCurriculum(${i})">
                        <h3><i class="fas fa-folder"></i> ${section.title}</h3>
                        <span>${section.lessons.length} lessons <i class="fas fa-chevron-down"></i></span>
                    </div>
                    <div class="curriculum-lessons" id="curriculum-${i}">
                        ${section.lessons.map(lesson => `
                            <div class="curriculum-lesson" onclick="playLesson(${course.id}, ${lesson.id})">
                                <i class="fas ${lesson.completed ? 'fa-check-circle text-success' : 'fa-play-circle'}"></i>
                                <span>${lesson.title}</span>
                                <span class="lesson-duration">${lesson.duration}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('') : '<p style="color:var(--gray-color)">Curriculum coming soon.</p>'}
        </div>
    `;
}

// Toggle Curriculum Section
function toggleCurriculum(index) {
    const section = document.getElementById(`curriculum-${index}`);
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

// ─── Enrol Course ──────────────────────────────────────────────────────────
function enrollCourse(courseId) {
    if (!currentUser) { showAuthModal('login'); return; }
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    if (!currentUser.enrolledCourses) currentUser.enrolledCourses = [];
    currentUser.enrolledCourses.push(courseId);
    course.enrolled = true;
    course.progress = 0;
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx !== -1) users[idx] = currentUser;
    saveData();
    showCourseDetail(courseId);
    showToast(`Enrolled in "${course.title}"! 🎓`, 'success');
}

// ─── Continue Course ───────────────────────────────────────────────────────
function continueCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course?.curriculum) return;
    let lessonToPlay = null;
    for (const section of course.curriculum) {
        for (const lesson of section.lessons) {
            if (!lesson.completed) { lessonToPlay = lesson; break; }
        }
        if (lessonToPlay) break;
    }
    if (!lessonToPlay) lessonToPlay = course.curriculum[0].lessons[0];
    playLesson(courseId, lessonToPlay.id);
}

// ─── Play Lesson ───────────────────────────────────────────────────────────
function playLesson(courseId, lessonId) {
    const course = courses.find(c => c.id === courseId);
    if (!course?.curriculum) return;

    let lesson = null;
    for (const section of course.curriculum) {
        lesson = section.lessons.find(l => l.id === lessonId);
        if (lesson) break;
    }
    if (!lesson) return;

    showPage('videoPlayer');

    const titleEl = document.getElementById('videoTitle');
    if (titleEl) titleEl.textContent = lesson.title;
    const descEl = document.getElementById('videoDescription');
    if (descEl) descEl.textContent = `From: ${course.title}`;

    window.currentCourseId = courseId;
    window.currentLessonId = lessonId;

    const lessonList = document.getElementById('lessonList');
    if (!lessonList) return;
    lessonList.innerHTML = '';

    course.curriculum.forEach(section => {
        section.lessons.forEach(l => {
            lessonList.innerHTML += `
                <div class="lesson-item ${l.id === lessonId ? 'active' : ''} ${l.completed ? 'completed' : ''}"
                     onclick="playLesson(${courseId}, ${l.id})">
                    <div class="lesson-item-icon">
                        <i class="fas ${l.completed ? 'fa-check' : 'fa-play'}"></i>
                    </div>
                    <div class="lesson-item-info">
                        <span class="lesson-item-title">${l.title}</span>
                        <span class="lesson-item-duration">${l.duration}</span>
                    </div>
                </div>`;
        });
    });

    loadLessonNotes(courseId, lessonId);
}

// ─── Mark Lesson Complete ──────────────────────────────────────────────────
function markComplete() {
    const courseId = window.currentCourseId;
    const lessonId = window.currentLessonId;
    if (!courseId || !lessonId) return;
    const course = courses.find(c => c.id === courseId);
    if (!course?.curriculum) return;

    for (const section of course.curriculum) {
        const lesson = section.lessons.find(l => l.id === lessonId);
        if (lesson) { lesson.completed = true; break; }
    }

    const total = course.curriculum.reduce((sum, s) => sum + s.lessons.length, 0);
    const done = course.curriculum.reduce((sum, s) => sum + s.lessons.filter(l => l.completed).length, 0);
    course.progress = Math.round((done / total) * 100);
    saveData();
    playLesson(courseId, lessonId);

    if (course.progress === 100) {
        showToast('🎉 Congratulations! You completed the course!', 'success');
    } else {
        showToast('Lesson marked complete! Keep going!', 'success');
    }
}

// ─── Notes ────────────────────────────────────────────────────────────────
function toggleNotes() {
    const panel = document.getElementById('notesPanel');
    if (panel) panel.classList.toggle('active');
}
function loadLessonNotes(courseId, lessonId) {
    const el = document.getElementById('lessonNotes');
    if (el) el.value = localStorage.getItem(`notes_${courseId}_${lessonId}`) || '';
}
function saveNotes() {
    const courseId = window.currentCourseId;
    const lessonId = window.currentLessonId;
    if (!courseId || !lessonId) return;
    const el = document.getElementById('lessonNotes');
    if (el) localStorage.setItem(`notes_${courseId}_${lessonId}`, el.value);
    showToast('Notes saved!', 'success');
}

// ─── Wishlist ─────────────────────────────────────────────────────────────
function addToWishlist(courseId) {
    if (!currentUser) { showAuthModal('login'); return; }
    showToast('Added to wishlist!', 'success');
}

// ─── My Learning page ─────────────────────────────────────────────────────
let _learningTab = 'in-progress';

function getLessonStats(course) {
    if (!course.curriculum) return { total: 0, completed: 0, nextLesson: null, nextSection: null };
    let total = 0, completed = 0, nextLesson = null, nextSection = null;
    for (const section of course.curriculum) {
        for (const lesson of section.lessons) {
            total++;
            if (lesson.completed) completed++;
            else if (!nextLesson) { nextLesson = lesson; nextSection = section; }
        }
    }
    return { total, completed, nextLesson, nextSection };
}

function loadMyLearning(tab) {
    if (tab) _learningTab = tab;
    const content = document.getElementById('learningContent');
    if (!content || !currentUser) return;

    const enrolled = courses.filter(c => currentUser.enrolledCourses?.includes(c.id));

    if (enrolled.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open" style="font-size:3rem;color:var(--primary-color);margin-bottom:1rem;"></i>
                <h3>No courses enrolled yet</h3>
                <p>Browse our MBA courses and start your journey today.</p>
                <button class="btn btn-primary" onclick="showPage('courses')">
                    <i class="fas fa-compass"></i> Explore Courses
                </button>
            </div>`;
        return;
    }

    // Compute per-course stats
    const enriched = enrolled.map(c => ({ ...c, _stats: getLessonStats(c) }));
    const inProgress = enriched.filter(c => c._stats.total === 0 || c._stats.completed < c._stats.total);
    const completedList = enriched.filter(c => c._stats.total > 0 && c._stats.completed === c._stats.total);

    // Overall learning stats
    const totalHours = enriched.reduce((sum, c) => {
        const pct = c._stats.total ? c._stats.completed / c._stats.total : 0;
        return sum + Math.round(pct * (c.duration || 0));
    }, 0);
    const progress = userProgress.find(p => p.userId === currentUser.id);
    const streak = progress?.streak || 0;

    const statsHtml = `
        <div class="ml-stats-bar">
            <div class="ml-stat">
                <i class="fas fa-layer-group"></i>
                <div>
                    <strong>${enrolled.length}</strong>
                    <span>Courses Enrolled</span>
                </div>
            </div>
            <div class="ml-stat">
                <i class="fas fa-clock"></i>
                <div>
                    <strong>${totalHours}h</strong>
                    <span>Hours Learned</span>
                </div>
            </div>
            <div class="ml-stat">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>${completedList.length}</strong>
                    <span>Completed</span>
                </div>
            </div>
            <div class="ml-stat">
                <i class="fas fa-fire"></i>
                <div>
                    <strong>${streak} days</strong>
                    <span>Current Streak</span>
                </div>
            </div>
        </div>`;

    const toShow = _learningTab === 'completed' ? completedList : inProgress;

    if (toShow.length === 0) {
        const emptyMsg = _learningTab === 'completed'
            ? 'No completed courses yet — keep going!'
            : 'All caught up! All enrolled courses are complete.';
        content.innerHTML = statsHtml + `
            <div class="empty-state" style="margin-top:2rem;">
                <i class="fas fa-${_learningTab === 'completed' ? 'trophy' : 'check-circle'}" style="font-size:2.5rem;color:var(--primary-color);margin-bottom:1rem;"></i>
                <p>${emptyMsg}</p>
            </div>`;
        return;
    }

    const cardsHtml = toShow.map(course => {
        const { total, completed, nextLesson, nextSection } = course._stats;
        const pct = total ? Math.round((completed / total) * 100) : 0;
        const isComplete = pct === 100;
        const levelColors = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#ef4444' };
        const levelColor = levelColors[course.level] || '#6366f1';
        const instructorInitials = createInitialsAvatarHTML(course.instructor.name, 36);

        return `
            <div class="ml-course-card">
                <div class="ml-course-thumb">
                    <img src="${course.thumbnail}" alt="${course.title}" loading="lazy">
                    ${isComplete ? '<div class="ml-complete-ribbon"><i class="fas fa-check"></i> Complete</div>' : ''}
                </div>
                <div class="ml-course-body">
                    <div class="ml-course-meta">
                        <span class="ml-level-badge" style="background:${levelColor}20;color:${levelColor}">${course.level}</span>
                        <span class="ml-category">${formatCategory(course.category)}</span>
                    </div>
                    <h3 class="ml-course-title">${course.title}</h3>
                    <div class="ml-instructor-row">
                        ${instructorInitials}
                        <span>${course.instructor.name}</span>
                        <span class="ml-rating"><i class="fas fa-star"></i> ${course.rating}</span>
                    </div>
                    <div class="ml-progress-section">
                        <div class="ml-progress-labels">
                            <span>${completed} of ${total} lessons</span>
                            <strong>${pct}%</strong>
                        </div>
                        <div class="progress-bar ml-progress-bar">
                            <div class="progress-fill" style="width:${pct}%"></div>
                        </div>
                    </div>
                    ${nextLesson && !isComplete ? `
                    <div class="ml-next-lesson">
                        <i class="fas fa-play-circle"></i>
                        <span>Next: <em>${nextLesson.title}</em></span>
                    </div>` : ''}
                    <div class="ml-course-actions">
                        ${isComplete
                            ? `<button class="btn btn-success" onclick="showCourseDetail(${course.id})"><i class="fas fa-trophy"></i> View Certificate</button>
                               <button class="btn btn-outline" onclick="showCourseDetail(${course.id})">Review Course</button>`
                            : `<button class="btn btn-primary" onclick="continueCourse(${course.id})"><i class="fas fa-play"></i> Continue Learning</button>
                               <button class="btn btn-outline" onclick="showCourseDetail(${course.id})">Details</button>`
                        }
                    </div>
                </div>
            </div>`;
    }).join('');

    content.innerHTML = statsHtml + `<div class="ml-course-grid">${cardsHtml}</div>`;
}

function switchLearningTab(tab) {
    document.querySelectorAll('.learning-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    loadMyLearning(tab);
}

// ─── Load Courses Page ─────────────────────────────────────────────────────
function loadCourses() {
    const grid = document.getElementById('coursesGrid');
    if (!grid) return;
    grid.innerHTML = courses.map(c => createCourseCard(c)).join('');
    attachCourseCardListeners(grid);
    grid.querySelectorAll('.course-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 60}ms`;
        card.classList.add('animate-in');
    });
}

// ─── Counter Animation for Hero Stats ─────────────────────────────────────
function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
            current = Math.min(current + increment, target);
            el.textContent = current.toLocaleString('en-IN') + suffix;
            if (current >= target) clearInterval(timer);
        }, 25);
    });
}

// ─── Scroll Reveal Animations ──────────────────────────────────────────────
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .course-card, .section-title').forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// ─── slideOut animation style ─────────────────────────────────────────────
const _style = document.createElement('style');
_style.textContent = `
    .toast { transition: transform 0.3s ease, opacity 0.3s ease; transform: translateX(100%); opacity: 0; }
    .toast.show { transform: translateX(0); opacity: 1; }
    .toast.hide { transform: translateX(110%); opacity: 0; }
    .toast-close { background:none; border:none; color:inherit; cursor:pointer; margin-left:auto; padding:0 4px; opacity:0.7; }
    .toast-close:hover { opacity:1; }
    .animate-in { animation: cardSlideUp 0.4s ease both; }
    @keyframes cardSlideUp {
        from { opacity:0; transform: translateY(20px); }
        to   { opacity:1; transform: translateY(0); }
    }
    .scroll-reveal { opacity:0; transform:translateY(24px); transition: opacity 0.5s ease, transform 0.5s ease; }
    .scroll-reveal.revealed { opacity:1; transform:translateY(0); }
    .text-success { color: var(--secondary-color); }
`;
document.head.appendChild(_style);

// ─── Initialize App ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    checkAuthState();
    loadPopularCourses();
    setTimeout(initScrollAnimations, 300);

    // Animate hero stat counters if present
    const statNums = document.querySelectorAll('.stat-number');
    statNums.forEach(el => {
        el.dataset.finalText = el.textContent;
    });
});
