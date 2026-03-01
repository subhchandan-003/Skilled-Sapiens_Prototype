// Skilled Sapiens - Student Dashboard Module

// Load Student Dashboard
function loadDashboard() {
    if (!currentUser) {
        showAuthModal('login');
        return;
    }

    // Get user's progress
    const progress = userProgress.find(p => p.userId === currentUser.id);
    if (!progress) {
        // Show empty state
        return;
    }

    // Load dashboard components
    loadNextTask();
    loadMilestone();
    loadAlertsPreview();
    loadSessions();
    loadStudyBuddies();
    loadLeaderboard();
    loadWeeklyChallenge();
    loadBadges();
}

// Load Next Task
function loadNextTask() {
    // Find the next incomplete task
    const userTasks = tasksData.filter(t => {
        const submission = submissionsData.find(s => s.taskId === t.id && s.userId === currentUser.id);
        return !submission || submission.status !== 'approved';
    });

    if (userTasks.length > 0) {
        const nextTask = userTasks[0];
        const content = document.getElementById('nextTaskContent');
        content.innerHTML = `
            <h4>${nextTask.title}</h4>
            <p>${nextTask.description}</p>
            <div class="task-meta">
                <span><i class="fas fa-clock"></i> ${nextTask.timeEstimate} min</span>
                <span><i class="fas fa-star"></i> ${nextTask.points} pts</span>
            </div>
            <button class="btn btn-primary" onclick="startTask(${nextTask.id})">
                Start Task
            </button>
        `;
    }
}

// Load Current Milestone
function loadMilestone() {
    const progress = userProgress.find(p => p.userId === currentUser.id);
    if (!progress) return;

    // Find current milestone based on week
    const currentMilestone = milestonesData.find(m => m.weekNumber <= progress.currentWeek && m.weekNumber > progress.completedMilestones);

    if (currentMilestone) {
        const milestoneTasks = tasksData.filter(t => t.milestoneId === currentMilestone.id);
        const completedTasks = milestoneTasks.filter(t => {
            const sub = submissionsData.find(s => s.taskId === t.id && s.userId === currentUser.id);
            return sub && sub.status === 'approved';
        });

        const content = document.getElementById('milestoneContent');
        content.innerHTML = `
            <h4>${currentMilestone.title}</h4>
            <p>${currentMilestone.description}</p>
            <div class="milestone-progress">
                <span>${completedTasks.length}/${milestoneTasks.length} tasks</span>
                <span class="badge">${currentMilestone.badge}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${(completedTasks.length / milestoneTasks.length) * 100}%"></div>
            </div>
        `;

        // Show tasks
        const tasksContent = document.getElementById('milestoneTasks');
        tasksContent.innerHTML = `
            <div class="milestone-tasks-list">
                ${milestoneTasks.map(task => {
            const sub = submissionsData.find(s => s.taskId === task.id && s.userId === currentUser.id);
            const status = sub ? sub.status : 'not_started';
            return `
                        <div class="milestone-task-item ${status}">
                            <span class="task-status">
                                <i class="fas ${status === 'approved' ? 'fa-check-circle' : status === 'submitted' ? 'fa-clock' : 'fa-circle'}"></i>
                            </span>
                            <span class="task-title">${task.title}</span>
                            <span class="task-points">${task.points} pts</span>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    }
}

// Load Alerts Preview
function loadAlertsPreview() {
    const userAlerts = alertsData.filter(a => a.userId === currentUser.id && !a.dismissed);
    const unreadCount = userAlerts.filter(a => !a.read).length;

    document.getElementById('alertCount').textContent = unreadCount;

    const alertsList = document.getElementById('alertsList');
    const topAlerts = userAlerts.slice(0, 3);

    alertsList.innerHTML = topAlerts.map(alert => `
        <div class="alert-item ${alert.read ? '' : 'unread'} priority-${alert.priority}">
            <div class="alert-icon">
                <i class="fas ${getAlertIcon(alert.type)}"></i>
            </div>
            <div class="alert-content">
                <h4>${alert.title}</h4>
                <p>${alert.message}</p>
            </div>
        </div>
    `).join('');
}

// Get Alert Icon
function getAlertIcon(type) {
    const icons = {
        'milestone_due': 'fa-bullseye',
        'session_reminder': 'fa-video',
        'inactivity': 'fa-user-clock',
        'feedback_received': 'fa-comment',
        'milestone_completed': 'fa-trophy'
    };
    return icons[type] || 'fa-bell';
}

// Load Sessions
function loadSessions() {
    const upcomingSessions = sessionsData.filter(s => s.status === 'upcoming').slice(0, 3);

    const sessionsList = document.getElementById('sessionsList');
    sessionsList.innerHTML = upcomingSessions.map(session => `
        <div class="session-item">
            <div class="session-date">
                <span class="day">${new Date(session.scheduledDate).getDate()}</span>
                <span class="month">${new Date(session.scheduledDate).toLocaleString('default', { month: 'short' })}</span>
            </div>
            <div class="session-info">
                <h4>${session.title}</h4>
                <p><i class="fas fa-clock"></i> ${session.scheduledTime} (${session.duration} min)</p>
            </div>
            <a href="${session.zoomLink}" target="_blank" class="btn btn-sm btn-primary">Join</a>
        </div>
    `).join('');
}

// Load Study Buddies
function loadStudyBuddies() {
    const buddies = studyBuddiesData.filter(b => b.userId === currentUser.id);

    const buddiesList = document.getElementById('buddiesList');

    if (buddies.length > 0) {
        buddiesList.innerHTML = buddies.map(buddy => {
            const buddyUser = usersData.find(u => u.id === buddy.buddyId);
            return `
                <div class="buddy-item ${buddy.status}">
                    <img src="${buddyUser?.avatar || 'https://via.placeholder.com/40'}" alt="Buddy">
                    <div class="buddy-info">
                        <h4>${buddyUser?.name || 'Study Buddy'}</h4>
                        <span class="badge">${buddy.status === 'accepted' ? 'Connected' : 'Pending'}</span>
                    </div>
                    ${buddy.status === 'pending' ? `
                        <button class="btn btn-sm btn-outline" onclick="acceptBuddy(${buddy.id})">Accept</button>
                    ` : `
                        <button class="btn btn-sm btn-primary">Message</button>
                    `}
                </div>
            `;
        }).join('');
    } else {
        buddiesList.innerHTML = `
            <div class="empty-state">
                <p>No study buddies yet</p>
                <button class="btn btn-sm btn-primary">Find Buddies</button>
            </div>
        `;
    }
}

// Accept Buddy
function acceptBuddy(buddyId) {
    const buddy = studyBuddiesData.find(b => b.id === buddyId);
    if (buddy) {
        buddy.status = 'accepted';
        buddy.connectedAt = new Date().toISOString();
        saveData();
        loadStudyBuddies();
        showToast('Study buddy connected!', 'success');
    }
}

// Load Leaderboard
function loadLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');

    leaderboardList.innerHTML = leaderboardData.slice(0, 5).map(entry => `
        <div class="leaderboard-item ${entry.userId === currentUser.id ? 'current-user' : ''}">
            <span class="rank">#${entry.rank}</span>
            <span class="name">${entry.name}</span>
            <span class="points">${entry.points} pts</span>
        </div>
    `).join('');
}

// Load Weekly Challenge
function loadWeeklyChallenge() {
    const progress = userProgress.find(p => p.userId === currentUser.id);
    const currentChallenge = challengesData.find(c => c.cohortId === currentUser.cohortId);

    const content = document.getElementById('challengeContent');

    if (currentChallenge) {
        const hasSubmitted = currentChallenge.submissions?.some(s => s.userId === currentUser.id);
        content.innerHTML = `
            <h4>${currentChallenge.title}</h4>
            <p>${currentChallenge.description}</p>
            <div class="challenge-meta">
                <span><i class="fas fa-clock"></i> ${currentChallenge.duration} min</span>
                <span><i class="fas fa-star"></i> ${currentChallenge.points} pts</span>
            </div>
            ${hasSubmitted ? `
                <button class="btn btn-success" disabled>Submitted ✓</button>
            ` : `
                <button class="btn btn-primary" onclick="showChallenge(${currentChallenge.id})">Join Challenge</button>
            `}
        `;
    } else {
        content.innerHTML = `
            <div class="empty-state">
                <p>No active challenge this week</p>
            </div>
        `;
    }
}

// Load Badges
function loadBadges() {
    const userBadges = badgesData.filter(b => b.earnedBy.includes(currentUser.id));

    const badgesList = document.getElementById('badgesList');

    if (userBadges.length > 0) {
        badgesList.innerHTML = userBadges.map(badge => `
            <div class="badge-item">
                <span class="badge-icon">${badge.icon}</span>
                <span class="badge-name">${badge.name}</span>
            </div>
        `).join('');
    } else {
        badgesList.innerHTML = `
            <div class="empty-state">
                <p>No badges earned yet</p>
                <p class="text-muted">Complete milestones to earn badges!</p>
            </div>
        `;
    }
}

// Start Task
function startTask(taskId) {
    const task = tasksData.find(t => t.id === taskId);
    if (!task) return;

    // Show task details modal or navigate to task page
    showToast(`Starting: ${task.title}`, 'info');
}

// Show Challenge
function showChallenge(challengeId) {
    const challenge = challengesData.find(c => c.id === challengeId);
    if (!challenge) return;

    showToast(`Challenge: ${challenge.title}`, 'info');
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function () {
    // Dashboard is loaded when user navigates to it
});
