// Skilled Sapiens - Alerts & Notification System Module

// Load Alerts Page
function loadAlertsPage() {
    if (!currentUser) {
        showAuthModal('login');
        return;
    }

    const alertsContainer = document.getElementById('alertsContainer');
    if (!alertsContainer) return;

    // Get user's alerts
    let userAlerts = alertsData.filter(a => a.userId === currentUser.id);

    // Apply filters if any
    const filterType = document.getElementById('alertFilterType')?.value || 'all';
    const filterPriority = document.getElementById('alertFilterPriority')?.value || 'all';

    if (filterType !== 'all') {
        userAlerts = userAlerts.filter(a => a.type === filterType);
    }

    if (filterPriority !== 'all') {
        userAlerts = userAlerts.filter(a => a.priority === filterPriority);
    }

    // Sort by date (newest first)
    userAlerts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (userAlerts.length === 0) {
        alertsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bell-slash"></i>
                <h3>No Alerts</h3>
                <p>You're all caught up! No pending alerts.</p>
            </div>
        `;
        return;
    }

    // Group alerts by date
    const groupedAlerts = {};
    userAlerts.forEach(alert => {
        const date = new Date(alert.createdAt).toLocaleDateString();
        if (!groupedAlerts[date]) {
            groupedAlerts[date] = [];
        }
        groupedAlerts[date].push(alert);
    });

    let html = `
        <div class="alerts-filters">
            <select id="alertFilterType" onchange="loadAlertsPage()">
                <option value="all">All Types</option>
                <option value="session_reminder">Session Reminder</option>
                <option value="milestone_due">Milestone Due</option>
                <option value="inactivity">Inactivity</option>
                <option value="feedback_received">Feedback Received</option>
                <option value="milestone_completed">Milestone Completed</option>
            </select>
            <select id="alertFilterPriority" onchange="loadAlertsPage()">
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
        </div>
        <div class="alerts-list-full">
    `;

    for (const [date, alerts] of Object.entries(groupedAlerts)) {
        html += `
            <div class="alerts-group">
                <h3 class="group-date">${date}</h3>
                ${alerts.map(alert => renderAlertCard(alert)).join('')}
            </div>
        `;
    }

    html += '</div>';
    alertsContainer.innerHTML = html;
}

// Render Alert Card
function renderAlertCard(alert) {
    const icon = getAlertIcon(alert.type);
    const typeLabel = getAlertTypeLabel(alert.type);

    const priorityColors = {
        'high': '#ef4444',
        'medium': '#f59e0b',
        'low': '#10b981'
    };

    return `
        <div class="alert-card ${alert.read ? 'read' : 'unread'} priority-${alert.priority}" data-alert-id="${alert.id}">
            <div class="alert-card-icon" style="background-color: ${priorityColors[alert.priority]}20; color: ${priorityColors[alert.priority]}">
                <i class="fas ${icon}"></i>
            </div>
            <div class="alert-card-content">
                <div class="alert-card-header">
                    <span class="alert-type-badge">${typeLabel}</span>
                    <span class="alert-time">${formatAlertTime(alert.createdAt)}</span>
                </div>
                <h4>${alert.title}</h4>
                <p>${alert.message}</p>
                ${alert.actionUrl ? `
                    <a href="#" class="alert-action" onclick="handleAlertAction(${alert.id}, '${alert.actionUrl}')">
                        Take Action <i class="fas fa-arrow-right"></i>
                    </a>
                ` : ''}
            </div>
            <div class="alert-card-actions">
                ${!alert.read ? `
                    <button class="btn-icon" onclick="markAlertAsRead(${alert.id})" title="Mark as read">
                        <i class="fas fa-check"></i>
                    </button>
                ` : ''}
                <button class="btn-icon" onclick="dismissAlert(${alert.id})" title="Dismiss">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
}

// Get Alert Icon
function getAlertIcon(type) {
    const icons = {
        'session_reminder': 'fa-video',
        'milestone_due': 'fa-bullseye',
        'inactivity': 'fa-user-clock',
        'feedback_received': 'fa-comment-dots',
        'milestone_completed': 'fa-trophy'
    };
    return icons[type] || 'fa-bell';
}

// Get Alert Type Label
function getAlertTypeLabel(type) {
    const labels = {
        'session_reminder': 'Session Reminder',
        'milestone_due': 'Milestone Due',
        'inactivity': 'Inactivity Alert',
        'feedback_received': 'Feedback',
        'milestone_completed': 'Achievement'
    };
    return labels[type] || 'Notification';
}

// Format Alert Time
function formatAlertTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

// Mark Alert as Read
function markAlertAsRead(alertId) {
    const alert = alertsData.find(a => a.id === alertId);
    if (alert) {
        alert.read = true;
        saveData();
        loadAlertsPage();
        updateAlertBadge();
        showToast('Alert marked as read', 'success');
    }
}

// Dismiss Alert
function dismissAlert(alertId) {
    const alert = alertsData.find(a => a.id === alertId);
    if (alert) {
        alert.dismissed = true;
        saveData();
        loadAlertsPage();
        updateAlertBadge();
        showToast('Alert dismissed', 'success');
    }
}

// Handle Alert Action
function handleAlertAction(alertId, actionUrl) {
    const alert = alertsData.find(a => a.id === alertId);
    if (alert) {
        alert.read = true;
        saveData();
    }

    // Navigate to the action URL
    if (actionUrl.startsWith('/')) {
        const page = actionUrl.replace('/', '');
        showPage(page);
    } else {
        window.open(actionUrl, '_blank');
    }
}

// Update Alert Badge
function updateAlertBadge() {
    if (!currentUser) return;

    const unreadAlerts = alertsData.filter(a => a.userId === currentUser.id && !a.read && !a.dismissed);
    const badge = document.getElementById('alertCount');

    if (badge) {
        badge.textContent = unreadAlerts.length;
    }

    // Update navbar notification icon if exists
    const navAlertIcon = document.querySelector('.nav-alerts');
    if (navAlertIcon) {
        navAlertIcon.textContent = unreadAlerts.length > 0 ? unreadAlerts.length : '';
    }
}

// Create New Alert (for system use)
function createAlert(userId, type, title, message, priority, actionUrl = null) {
    const alert = {
        id: alertsData.length + 1,
        userId: userId,
        type: type,
        title: title,
        message: message,
        priority: priority,
        actionUrl: actionUrl,
        read: false,
        dismissed: false,
        createdAt: new Date().toISOString()
    };

    alertsData.push(alert);
    saveData();

    // Show notification
    if (currentUser && currentUser.id === userId) {
        showToast(`${title}: ${message}`, priority === 'high' ? 'error' : 'info');
        updateAlertBadge();
    }

    return alert;
}

// Check and Create System Alerts
function checkSystemAlerts() {
    if (!currentUser || currentUser.role !== 'student') return;

    const progress = userProgress.find(p => p.userId === currentUser.id);
    if (!progress) return;

    // Check for milestone due alerts
    const currentMilestone = milestonesData.find(m => {
        const milestoneTasks = tasksData.filter(t => t.milestoneId === m.id);
        const completedTasks = milestoneTasks.filter(t => {
            const sub = submissionsData.find(s => s.taskId === t.id && s.userId === currentUser.id);
            return sub && sub.status === 'approved';
        });
        return m.weekNumber <= progress.currentWeek && completedTasks.length < milestoneTasks.length;
    });

    if (currentMilestone) {
        const hasAlert = alertsData.some(a =>
            a.userId === currentUser.id &&
            a.type === 'milestone_due' &&
            !a.dismissed
        );

        if (!hasAlert) {
            createAlert(
                currentUser.id,
                'milestone_due',
                'Milestone Due Soon',
                `Complete your current milestone "${currentMilestone.title}" to stay on track!`,
                'medium',
                '/tasks'
            );
        }
    }

    // Check for session reminders
    const upcomingSessions = sessionsData.filter(s => {
        const sessionDate = new Date(s.scheduledDate);
        const now = new Date();
        const hoursUntil = (sessionDate - now) / 3600000;
        return hoursUntil > 0 && hoursUntil <= 24;
    });

    upcomingSessions.forEach(session => {
        const hasAlert = alertsData.some(a =>
            a.userId === currentUser.id &&
            a.type === 'session_reminder' &&
            a.sessionId === session.id &&
            !a.dismissed
        );

        if (!hasAlert) {
            createAlert(
                currentUser.id,
                'session_reminder',
                'Upcoming Session',
                `Your session "${session.title}" starts soon at ${session.scheduledTime}`,
                'high',
                '/dashboard'
            );
        }
    });
}

// Initialize alerts
document.addEventListener('DOMContentLoaded', function () {
    // Check for system alerts periodically
    setInterval(checkSystemAlerts, 60000); // Every minute
});
