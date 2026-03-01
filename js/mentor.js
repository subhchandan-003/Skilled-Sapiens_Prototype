// Skilled Sapiens - Mentor Dashboard Module

// Check if user is mentor
function isMentor() {
    return currentUser && (currentUser.role === 'mentor' || currentUser.role === 'admin' || currentUser.role === 'master_admin');
}

// Load Mentor Page
function loadMentorPage() {
    if (!currentUser) {
        showAuthModal('login');
        return;
    }

    if (!isMentor()) {
        showPage('home');
        showToast('Access denied. Mentor access required.', 'error');
        return;
    }

    loadFollowupQueue();
    loadReviewQueue();
    loadCohortStats();
}

// Load Follow-up Queue (students at risk)
function loadFollowupQueue() {
    const followupQueue = document.getElementById('followupQueue');
    if (!followupQueue) return;

    // Find students who need follow-up
    const atRiskStudents = userProgress.filter(p => {
        const user = usersData.find(u => u.id === p.userId);
        return user && user.role === 'student' && p.status === 'at_risk';
    });

    if (atRiskStudents.length === 0) {
        followupQueue.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-check-circle"></i>
                <p>No students at risk. Great job!</p>
            </div>
        `;
        return;
    }

    followupQueue.innerHTML = atRiskStudents.map(progress => {
        const user = usersData.find(u => u.id === progress.userId);
        const lastActivity = new Date(progress.lastActive);
        const daysInactive = Math.floor((new Date() - lastActivity) / 86400000);

        return `
            <div class="followup-card">
                <div class="student-info">
                    <img src="${user?.avatar || 'https://via.placeholder.com/50'}" alt="${user?.name}">
                    <div>
                        <h4>${user?.name}</h4>
                        <p>${user?.email}</p>
                    </div>
                </div>
                <div class="risk-info">
                    <span class="risk-badge high">At Risk</span>
                    <p><i class="fas fa-clock"></i> ${daysInactive} days inactive</p>
                    <p><i class="fas fa-percentage"></i> ${progress.completionRate}% complete</p>
                </div>
                <div class="followup-actions">
                    <button class="btn btn-primary" onclick="sendMessage(${user?.id})">
                        <i class="fas fa-envelope"></i> Message
                    </button>
                    <button class="btn btn-outline" onclick="viewStudent(${user?.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Load Review Queue (pending submissions)
function loadReviewQueue() {
    const reviewQueue = document.getElementById('reviewQueue');
    if (!reviewQueue) return;

    // Find pending submissions for mentor's cohort
    const pendingSubmissions = submissionsData.filter(s => s.status === 'submitted');

    if (pendingSubmissions.length === 0) {
        reviewQueue.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No submissions to review</p>
            </div>
        `;
        return;
    }

    reviewQueue.innerHTML = pendingSubmissions.map(submission => {
        const task = tasksData.find(t => t.id === submission.taskId);
        const user = usersData.find(u => u.id === submission.userId);

        return `
            <div class="review-card">
                <div class="submission-info">
                    <img src="${user?.avatar || 'https://via.placeholder.com/40'}" alt="${user?.name}">
                    <div>
                        <h4>${user?.name}</h4>
                        <p>${task?.title}</p>
                        <span class="submitted-time">${formatTimeAgo(submission.submittedAt)}</span>
                    </div>
                </div>
                <div class="submission-content">
                    <p>${submission.content?.substring(0, 100)}${submission.content?.length > 100 ? '...' : ''}</p>
                </div>
                <div class="review-actions">
                    <button class="btn btn-success" onclick="approveSubmission(${submission.id})">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn btn-warning" onclick="requestChanges(${submission.id})">
                        <i class="fas fa-edit"></i> Request Changes
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Format Time Ago
function formatTimeAgo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
}

// Load Cohort Stats
function loadCohortStats() {
    // This can be expanded to show more detailed statistics
    const students = usersData.filter(u => u.role === 'student');
    const totalStudents = students.length;

    // Calculate average progress
    let totalProgress = 0;
    let activeStudents = 0;
    let atRiskStudents = 0;

    userProgress.forEach(p => {
        totalProgress += p.completionRate || 0;
        if (p.status === 'active') activeStudents++;
        if (p.status === 'at_risk') atRiskStudents++;
    });

    const avgProgress = totalStudents > 0 ? Math.round(totalProgress / totalStudents) : 0;

    // Update UI if elements exist
    const elements = {
        'mentorTotalStudents': totalStudents,
        'mentorActiveStudents': activeStudents,
        'mentorAtRisk': atRiskStudents,
        'mentorAvgProgress': avgProgress
    };

    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
}

// Send Message to Student
function sendMessage(studentId) {
    const student = usersData.find(u => u.id === studentId);
    if (!student) return;

    const message = prompt(`Send message to ${student.name}:`);
    if (message) {
        // Create an alert for the student
        createAlert(
            studentId,
            'mentor_message',
            'Message from Mentor',
            message,
            'high',
            '/dashboard'
        );

        showToast(`Message sent to ${student.name}`, 'success');
    }
}

// View Student Profile
function viewStudent(studentId) {
    // Show student details modal or navigate to their profile
    const student = usersData.find(u => u.id === studentId);
    const progress = userProgress.find(p => p.userId === studentId);

    if (!student) return;

    const modalHtml = `
        <div class="modal" id="studentModal" style="display: flex;">
            <div class="modal-content student-modal-content">
                <button class="modal-close" onclick="closeStudentModal()">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="student-profile">
                    <img src="${student.avatar || 'https://via.placeholder.com/100'}" alt="${student.name}" class="profile-avatar-lg">
                    <h2>${student.name}</h2>
                    <p>${student.email}</p>
                    <span class="badge badge-primary">${student.role}</span>
                </div>

                <div class="student-stats">
                    <div class="stat">
                        <span class="stat-value">${progress?.completionRate || 0}%</span>
                        <span class="stat-label">Complete</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${progress?.currentWeek || 1}</span>
                        <span class="stat-label">Current Week</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">${progress?.skillScore || 0}</span>
                        <span class="stat-label">Skill Score</span>
                    </div>
                </div>

                <div class="student-actions">
                    <button class="btn btn-primary" onclick="sendMessage(${student.id}); closeStudentModal();">
                        <i class="fas fa-envelope"></i> Send Message
                    </button>
                    <button class="btn btn-outline" onclick="closeStudentModal()">Close</button>
                </div>
            </div>
        </div>
    `;

    const existingModal = document.getElementById('studentModal');
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Close Student Modal
function closeStudentModal() {
    const modal = document.getElementById('studentModal');
    if (modal) modal.remove();
}

// Approve Submission
function approveSubmission(submissionId) {
    const submission = submissionsData.find(s => s.id === submissionId);
    if (!submission) return;

    submission.status = 'approved';
    submission.reviewedBy = currentUser.id;
    submission.reviewedAt = new Date().toISOString();
    submission.feedback = 'Great work! Approved.';

    // Update user progress
    const progress = userProgress.find(p => p.userId === submission.userId);
    if (progress) {
        progress.completedTasks = (progress.completedTasks || 0) + 1;
    }

    saveData();

    // Notify student
    createAlert(
        submission.userId,
        'feedback_received',
        'Submission Approved!',
        `Your submission has been approved. Great work!`,
        'low',
        '/tasks'
    );

    loadReviewQueue();
    showToast('Submission approved!', 'success');
}

// Request Changes
function requestChanges(submissionId) {
    const submission = submissionsData.find(s => s.id === submissionId);
    if (!submission) return;

    const feedback = prompt('Provide feedback for the student:');
    if (!feedback) return;

    submission.status = 'needs_changes';
    submission.reviewedBy = currentUser.id;
    submission.reviewedAt = new Date().toISOString();
    submission.feedback = feedback;

    saveData();

    // Notify student
    createAlert(
        submission.userId,
        'feedback_received',
        'Changes Requested',
        `Your mentor has requested changes. Check your task for feedback.`,
        'medium',
        '/tasks'
    );

    loadReviewQueue();
    showToast('Feedback sent to student', 'success');
}

// Bulk Message Functions
function sendBulkMessage() {
    const segment = document.getElementById('messageSegment')?.value;
    const template = document.getElementById('messageTemplate')?.value;

    if (!segment || !template) {
        showToast('Please select a segment and template', 'error');
        return;
    }

    // Determine which users to message based on segment
    let targetUsers = [];

    switch (segment) {
        case 'All Students':
            targetUsers = usersData.filter(u => u.role === 'student');
            break;
        case 'At Risk':
            targetUsers = usersData.filter(u => {
                const progress = userProgress.find(p => p.userId === u.id);
                return progress && progress.status === 'at_risk';
            });
            break;
        case 'Inactive (3+ days)':
            targetUsers = usersData.filter(u => {
                const progress = userProgress.find(p => p.userId === u.id);
                if (!progress) return false;
                const lastActivity = new Date(progress.lastActive);
                const daysInactive = Math.floor((new Date() - lastActivity) / 86400000);
                return daysInactive >= 3;
            });
            break;
        case 'Pending Milestone':
            // Find users who have pending tasks
            targetUsers = usersData.filter(u => {
                const userSubs = submissionsData.filter(s => s.userId === u.id && s.status === 'submitted');
                return userSubs.length > 0;
            });
            break;
        default:
            targetUsers = usersData.filter(u => u.role === 'student');
    }

    // Send messages to all target users
    targetUsers.forEach(user => {
        createAlert(
            user.id,
            'mentor_message',
            getTemplateTitle(template),
            getTemplateMessage(template),
            'medium',
            '/dashboard'
        );
    });

    showToast(`Message sent to ${targetUsers.length} students`, 'success');
}

function getTemplateTitle(template) {
    const titles = {
        'Session Reminder': 'Session Reminder',
        'Milestone Due Soon': 'Milestone Due Soon',
        'Inactivity Check': 'We Miss You!',
        'Custom Message': 'Message from Mentor'
    };
    return titles[template] || 'Notification';
}

function getTemplateMessage(template) {
    const messages = {
        'Session Reminder': 'Don\'t forget about your upcoming session. Please make sure to attend!',
        'Milestone Due Soon': 'Your milestone deadline is approaching. Please complete your tasks to stay on track.',
        'Inactivity Check': 'We noticed you haven\'t been active recently. Let us know if you need any help!',
        'Custom Message': 'You have a new message from your mentor. Please check your dashboard.'
    };
    return messages[template] || 'Please check your dashboard for more information.';
}

// Initialize mentor page
document.addEventListener('DOMContentLoaded', function () {
    // Mentor page is loaded when user navigates to it
});
