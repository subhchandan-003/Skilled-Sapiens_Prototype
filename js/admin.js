// Skilled Sapiens - Admin Module

// Load Admin Dashboard
function loadAdminDashboard() {
    // Update stats
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalAdminCourses').textContent = courses.length;

    const totalEnrollments = courses.reduce((sum, c) => sum + (c.enrolled ? 1 : 0), 0);
    document.getElementById('totalEnrollments').textContent = totalEnrollments;

    const avgRating = courses.reduce((sum, c) => sum + c.rating, 0) / courses.length;
    document.getElementById('avgRating').textContent = avgRating.toFixed(1);

    // Load courses table
    loadCoursesTable();
    loadUsersTable();
    loadTopCourses();
}

// Switch Admin Tab
function switchAdminTab(tab, event) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // Fallback: find the tab element and activate it
        const tabElement = document.querySelector(`.admin-tab[data-tab="${tab}"]`);
        if (tabElement) {
            tabElement.classList.add('active');
        }
    }

    document.querySelectorAll('.admin-content').forEach(c => c.style.display = 'none');
    document.getElementById('admin' + tab.charAt(0).toUpperCase() + tab.slice(1)).style.display = 'block';
}

// Load Courses Table
function loadCoursesTable() {
    const tbody = document.getElementById('coursesTableBody');

    tbody.innerHTML = courses.map(course => `
        <tr>
            <td>
                <div class="course-cell">
                    <img src="${course.thumbnail}" alt="${course.title}" class="course-thumb">
                    <div class="course-info">
                        <h4>${course.title}</h4>
                        <p>${formatCategory(course.category)}</p>
                    </div>
                </div>
            </td>
            <td>${course.instructor.name}</td>
            <td>${course.students.toLocaleString()}</td>
            <td><i class="fas fa-star" style="color: #fbbf24;"></i> ${course.rating}</td>
            <td><span class="status-badge active">Active</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="editCourse(${course.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn view" onclick="showCourseDetail(${course.id})" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteCourse(${course.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load Users Table
function loadUsersTable() {
    const tbody = document.getElementById('usersTableBody');

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>
                <div class="user-cell">
                    <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                    <span>${user.name}</span>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="badge badge-${user.role === 'admin' ? 'primary' : user.role === 'instructor' ? 'warning' : 'success'}">${user.role}</span></td>
            <td>${user.enrolledCourses ? user.enrolledCourses.length : 0}</td>
            <td>${formatDate(user.joinDate)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="editUser(${user.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteUser(${user.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load Top Courses
function loadTopCourses() {
    const sorted = [...courses].sort((a, b) => b.students - a.students).slice(0, 5);
    const list = document.getElementById('topCoursesList');

    list.innerHTML = sorted.map((course, index) => `
        <div class="top-course-item">
            <div class="top-course-rank">${index + 1}</div>
            <div class="top-course-info">
                <h4>${course.title.substring(0, 30)}...</h4>
                <span>${course.students.toLocaleString()} students</span>
            </div>
            <div class="top-course-students">${course.students.toLocaleString()}</div>
        </div>
    `).join('');
}

// Show Course Modal
function showCourseModal(courseId = null) {
    const modal = document.getElementById('courseModal');
    const title = document.getElementById('courseModalTitle');
    const form = document.getElementById('courseForm');

    if (courseId) {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            title.textContent = 'Edit Course';
            document.getElementById('courseTitle').value = course.title;
            document.getElementById('courseDescription').value = course.description;
            document.getElementById('courseCategory').value = course.category;
            document.getElementById('courseLevel').value = course.level;
            document.getElementById('coursePrice').value = course.price;
            document.getElementById('courseDuration').value = course.duration;
            document.getElementById('courseThumbnail').value = course.thumbnail;
            document.getElementById('courseInstructor').value = course.instructor.name;
            form.dataset.courseId = courseId;
        }
    } else {
        title.textContent = 'Add New Course';
        form.reset();
        form.dataset.courseId = '';
    }

    modal.classList.add('active');
}

// Close Course Modal
function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    modal.classList.remove('active');
}

// Save Course
function saveCourse(event) {
    event.preventDefault();

    const form = document.getElementById('courseForm');
    const courseId = form.dataset.courseId;

    const courseData = {
        title: document.getElementById('courseTitle').value,
        description: document.getElementById('courseDescription').value,
        category: document.getElementById('courseCategory').value,
        level: document.getElementById('courseLevel').value,
        price: parseFloat(document.getElementById('coursePrice').value),
        duration: parseInt(document.getElementById('courseDuration').value),
        thumbnail: document.getElementById('courseThumbnail').value || 'https://via.placeholder.com/400',
        instructor: {
            name: document.getElementById('courseInstructor').value,
            avatar: 'https://via.placeholder.com/100',
            title: 'Instructor'
        },
        rating: 4.5,
        students: 0,
        lessons: 0,
        enrolled: false,
        progress: 0,
        tags: [],
        features: []
    };

    if (courseId) {
        // Update existing course
        const index = courses.findIndex(c => c.id === parseInt(courseId));
        if (index !== -1) {
            courses[index] = { ...courses[index], ...courseData };
            showToast('Course updated successfully', 'success');
        }
    } else {
        // Add new course
        courseData.id = courses.length + 1;
        courses.push(courseData);
        showToast('Course created successfully', 'success');
    }

    saveData();
    closeCourseModal();
    loadCoursesTable();
}

// Edit Course
function editCourse(courseId) {
    showCourseModal(courseId);
}

// Delete Course
function deleteCourse(courseId) {
    if (confirm('Are you sure you want to delete this course?')) {
        courses = courses.filter(c => c.id !== courseId);
        saveData();
        loadCoursesTable();
        showToast('Course deleted', 'success');
    }
}

// Edit User
function editUser(userId) {
    showToast('User editing coming soon', 'info');
}

// Delete User
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(u => u.id !== userId);
        saveData();
        loadUsersTable();
        showToast('User deleted', 'success');
    }
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
