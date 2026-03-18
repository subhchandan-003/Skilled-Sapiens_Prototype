// Skilled Sapiens - Tasks & Milestones Module

// Load Tasks Page
function loadTasksPage() {
    if (!currentUser) {
        showAuthModal('login');
        return;
    }

    const tasksContainer = document.getElementById('tasksContainer');
    if (!tasksContainer) return;

    // Get all milestones with their tasks
    const progress = userProgress.find(p => p.userId === currentUser.id);
    const currentWeek = progress?.currentWeek || 1;

    let html = '<div class="milestones-grid">';

    milestonesData.forEach((milestone, index) => {
        const milestoneTasks = tasksData.filter(t => t.milestoneId === milestone.id);

        // Calculate completion status
        const completedTasks = milestoneTasks.filter(task => {
            const sub = submissionsData.find(s => s.taskId === task.id && s.userId === currentUser.id);
            return sub && sub.status === 'approved';
        });

        const isLocked = milestone.weekNumber > currentWeek;
        const isCompleted = completedTasks.length === milestoneTasks.length;
        const isCurrent = milestone.weekNumber <= currentWeek && !isCompleted;

        html += `
            <div class="milestone-card ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}">
                <div class="milestone-header">
                    <div class="milestone-badge">
                        ${isCompleted ? '<i class="fas fa-check-circle"></i>' : isLocked ? '<i class="fas fa-lock"></i>' : milestone.badge.split(' ')[0]}
                    </div>
                    <div class="milestone-info">
                        <h3>${milestone.title}</h3>
                        <p>${milestone.description}</p>
                        <span class="badge-label">${milestone.badge}</span>
                    </div>
                </div>
                
                <div class="milestone-progress">
                    <div class="progress-info">
                        <span>${completedTasks.length}/${milestoneTasks.length} tasks</span>
                        <span>${Math.round((completedTasks.length / milestoneTasks.length) * 100)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(completedTasks.length / milestoneTasks.length) * 100}%"></div>
                    </div>
                </div>

                <div class="tasks-list">
                    ${milestoneTasks.map(task => renderTaskItem(task)).join('')}
                </div>

                ${isCompleted ? `
                    <div class="milestone-completed">
                        <i class="fas fa-trophy"></i> Milestone Complete!
                        <span class="badge">+${milestone.badgePoints} pts</span>
                    </div>
                ` : ''}
            </div>
        `;
    });

    html += '</div>';
    tasksContainer.innerHTML = html;
}

// Render Task Item
function renderTaskItem(task) {
    const submission = submissionsData.find(s => s.taskId === task.id && s.userId === currentUser.id);
    const status = submission ? submission.status : 'not_started';

    const statusClasses = {
        'not_started': '',
        'in_progress': 'in-progress',
        'submitted': 'submitted',
        'needs_changes': 'needs-changes',
        'approved': 'approved'
    };

    const statusIcons = {
        'not_started': 'fa-circle',
        'in_progress': 'fa-spinner',
        'submitted': 'fa-clock',
        'needs_changes': 'fa-exclamation-circle',
        'approved': 'fa-check-circle'
    };

    const statusLabels = {
        'not_started': 'Not Started',
        'in_progress': 'In Progress',
        'submitted': 'Submitted',
        'needs_changes': 'Needs Changes',
        'approved': 'Approved'
    };

    return `
        <div class="task-item ${statusClasses[status]}" onclick="openTaskModal(${task.id})">
            <div class="task-status">
                <i class="fas ${statusIcons[status]}"></i>
            </div>
            <div class="task-info">
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <div class="task-meta">
                    <span><i class="fas fa-clock"></i> ${task.timeEstimate} min</span>
                    <span><i class="fas fa-star"></i> ${task.points} pts</span>
                    <span class="task-type-badge">${task.submissionType}</span>
                </div>
            </div>
            <div class="task-action">
                <span class="status-badge ${status}">${statusLabels[status]}</span>
                ${status === 'needs_changes' ? '<i class="fas fa-comment feedback-indicator"></i>' : ''}
            </div>
        </div>
    `;
}

// Open Task Modal
function openTaskModal(taskId) {
    const task = tasksData.find(t => t.id === taskId);
    if (!task) return;

    const submission = submissionsData.find(s => s.taskId === task.id && s.userId === currentUser.id);
    const status = submission ? submission.status : 'not_started';

    const modalHtml = `
        <div class="modal" id="taskModal" style="display: flex;">
            <div class="modal-content task-modal-content">
                <button class="modal-close" onclick="closeTaskModal()">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="task-modal-header">
                    <span class="task-type">${task.submissionType}</span>
                    <h2>${task.title}</h2>
                    <p>${task.description}</p>
                </div>

                <div class="task-modal-body">
                    <div class="task-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <strong>Time Estimate</strong>
                                <span>${task.timeEstimate} minutes</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-star"></i>
                            <div>
                                <strong>Points</strong>
                                <span>${task.points} pts</span>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <div>
                                <strong>Due Date</strong>
                                <span>${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No deadline'}</span>
                            </div>
                        </div>
                    </div>

                    ${task.resources && task.resources.length > 0 ? `
                        <div class="task-resources">
                            <h4>Resources</h4>
                            <div class="resources-list">
                                ${task.resources.map(r => `
                                    <a href="${r.url}" target="_blank" class="resource-item">
                                        <i class="fas fa-link"></i> ${r.title}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="task-submission">
                        <h4>Your Submission</h4>
                        ${status === 'approved' ? `
                            <div class="submission-approved">
                                <i class="fas fa-check-circle"></i>
                                <p>Approved! Great work!</p>
                            </div>
                        ` : status === 'needs_changes' ? `
                            <div class="submission-feedback">
                                <h5><i class="fas fa-comment"></i> Feedback</h5>
                                <p>${submission.feedback || 'Please review your submission and make the necessary changes.'}</p>
                            </div>
                            <div class="submission-form">
                                <textarea id="submissionContent" placeholder="Enter your ${task.submissionType}...">${submission?.content || ''}</textarea>
                                <button class="btn btn-primary" onclick="submitTask(${task.id})">Resubmit</button>
                            </div>
                        ` : status === 'submitted' ? `
                            <div class="submission-pending">
                                <i class="fas fa-clock"></i>
                                <p>Submitted and waiting for review</p>
                                <div class="submission-preview">
                                    <strong>Your submission:</strong>
                                    <p>${submission?.content || ''}</p>
                                </div>
                            </div>
                        ` : `
                            <div class="submission-form">
                                <textarea id="submissionContent" placeholder="Enter your ${task.submissionType}..."></textarea>
                                ${task.submissionType === 'link' ? `
                                    <input type="url" id="submissionLink" placeholder="Paste your link here...">
                                ` : ''}
                                <button class="btn btn-primary" onclick="submitTask(${task.id})">Submit</button>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('taskModal');
    if (existingModal) existingModal.remove();

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Close Task Modal
function closeTaskModal() {
    const modal = document.getElementById('taskModal');
    if (modal) modal.remove();
}

// Submit Task
function submitTask(taskId) {
    const task = tasksData.find(t => t.id === taskId);
    if (!task) return;

    const content = document.getElementById('submissionContent')?.value;
    const link = document.getElementById('submissionLink')?.value;

    if (!content && !link) {
        showToast('Please provide your submission', 'error');
        return;
    }

    // Check if submission exists
    let submission = submissionsData.find(s => s.taskId === taskId && s.userId === currentUser.id);

    if (submission) {
        // Update existing submission
        submission.content = content || link;
        submission.submittedAt = new Date().toISOString();
        submission.status = 'submitted';
    } else {
        // Create new submission
        submission = {
            id: submissionsData.length + 1,
            taskId: taskId,
            userId: currentUser.id,
            content: content || link,
            submittedAt: new Date().toISOString(),
            status: 'submitted',
            feedback: null,
            reviewedBy: null,
            reviewedAt: null
        };
        submissionsData.push(submission);
    }

    // Save to localStorage
    saveData();

    closeTaskModal();
    loadTasksPage();
    showToast('Task submitted successfully!', 'success');
}

// Start Task (mark as in progress)
function startTaskById(taskId) {
    let submission = submissionsData.find(s => s.taskId === taskId && s.userId === currentUser.id);

    if (!submission) {
        submission = {
            id: submissionsData.length + 1,
            taskId: taskId,
            userId: currentUser.id,
            content: '',
            submittedAt: null,
            status: 'in_progress',
            feedback: null,
            reviewedBy: null,
            reviewedAt: null
        };
        submissionsData.push(submission);
    } else {
        submission.status = 'in_progress';
    }

    saveData();
    showToast('Task started!', 'info');
}

// Initialize tasks page
document.addEventListener('DOMContentLoaded', function () {
    // Tasks page is loaded when user navigates to it
});
