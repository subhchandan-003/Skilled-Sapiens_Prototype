// Skilled Sapiens - Data Layer
// Complete data for the Learning Management System with all features

// ============================================
// COHORTS - Group of students in a program
// ============================================
const cohortsData = [
    {
        id: 1,
        name: "Web Development Batch 2024",
        startDate: "2024-01-15",
        endDate: "2024-03-15",
        durationWeeks: 8,
        currentWeek: 6,
        status: "active",
        totalStudents: 25,
        mentorId: 3
    },
    {
        id: 2,
        name: "Data Science Batch 2024",
        startDate: "2024-02-01",
        endDate: "2024-04-01",
        durationWeeks: 8,
        currentWeek: 4,
        status: "active",
        totalStudents: 20,
        mentorId: 3
    }
];

// ============================================
// SESSIONS - Live sessions/schedule
// ============================================
const sessionsData = [
    {
        id: 1,
        cohortId: 1,
        title: "Introduction to HTML & CSS",
        description: "Building your first webpage",
        scheduledDate: "2024-03-05",
        scheduledTime: "19:00",
        duration: 60,
        zoomLink: "https://zoom.us/j/123456789",
        calendarLink: "https://calendar.google.com/calendar/event?eid=abc123",
        status: "upcoming",
        recordingUrl: null
    },
    {
        id: 2,
        cohortId: 1,
        title: "JavaScript Fundamentals",
        description: "Variables, functions, and DOM manipulation",
        scheduledDate: "2024-03-07",
        scheduledTime: "19:00",
        duration: 60,
        zoomLink: "https://zoom.us/j/987654321",
        calendarLink: "https://calendar.google.com/calendar/event?eid=def456",
        status: "upcoming",
        recordingUrl: null
    },
    {
        id: 3,
        cohortId: 1,
        title: "React Basics Workshop",
        description: "Building components with React",
        scheduledDate: "2024-03-10",
        scheduledTime: "19:00",
        duration: 90,
        zoomLink: "https://zoom.us/j/456789123",
        calendarLink: "https://calendar.google.com/calendar/event?eid=ghi789",
        status: "upcoming",
        recordingUrl: null
    }
];

// ============================================
// MILESTONES - Major goals in a course
// ============================================
const milestonesData = [
    {
        id: 1,
        cohortId: 1,
        title: "Foundation Week 1-2",
        description: "HTML & CSS Fundamentals",
        weekNumber: 2,
        dueDate: "2024-01-28",
        tasks: [1, 2, 3],
        badge: "🌐 HTML Explorer",
        points: 100
    },
    {
        id: 2,
        cohortId: 1,
        title: "JavaScript Basics",
        description: "Core JavaScript concepts",
        weekNumber: 4,
        dueDate: "2024-02-11",
        tasks: [4, 5, 6],
        badge: "⚡ JS Beginner",
        points: 150
    },
    {
        id: 3,
        cohortId: 1,
        title: "Building Interactive Apps",
        description: "DOM manipulation and events",
        weekNumber: 6,
        dueDate: "2024-02-25",
        tasks: [7, 8],
        badge: "🎯 DOM Master",
        points: 200
    },
    {
        id: 4,
        cohortId: 1,
        title: "Final Project",
        description: "Complete portfolio website",
        weekNumber: 8,
        dueDate: "2024-03-10",
        tasks: [9, 10],
        badge: "🏆 Graduate",
        points: 500
    }
];

// ============================================
// TASKS - Micro-tasks within milestones
// ============================================
const tasksData = [
    {
        id: 1,
        milestoneId: 1,
        title: "Create your first HTML page",
        description: "Build a simple HTML page with headings, paragraphs, and links",
        expectedOutput: "Upload Google Doc link with code or GitHub repository",
        timeEstimate: 20,
        submissionType: "link",
        order: 1,
        points: 25
    },
    {
        id: 2,
        milestoneId: 1,
        title: "Style your page with CSS",
        description: "Add CSS to style fonts, colors, and layout",
        expectedOutput: "Updated HTML page with embedded or external CSS",
        timeEstimate: 30,
        submissionType: "link",
        order: 2,
        points: 35
    },
    {
        id: 3,
        milestoneId: 1,
        title: "Build a responsive layout",
        description: "Use Flexbox or Grid to create a responsive layout",
        expectedOutput: "Live URL or GitHub link showing responsive design",
        timeEstimate: 45,
        submissionType: "link",
        order: 3,
        points: 40
    },
    {
        id: 4,
        milestoneId: 2,
        title: "JavaScript Variables Quiz",
        description: "Complete the quiz on variables, data types, and operators",
        expectedOutput: "Quiz submission with score",
        timeEstimate: 15,
        submissionType: "quiz",
        order: 1,
        points: 30
    },
    {
        id: 5,
        milestoneId: 2,
        title: "Write your first function",
        description: "Create functions to solve basic problems",
        expectedOutput: "CodePen or GitHub Gist link",
        timeEstimate: 25,
        submissionType: "link",
        order: 2,
        points: 50
    },
    {
        id: 6,
        milestoneId: 2,
        title: "DOM Manipulation Exercise",
        description: "Build an interactive to-do list",
        expectedOutput: "Live URL of working to-do app",
        timeEstimate: 40,
        submissionType: "link",
        order: 3,
        points: 70
    },
    {
        id: 7,
        milestoneId: 3,
        title: "Event Listeners Practice",
        description: "Handle click, hover, and form events",
        expectedOutput: "CodePen or GitHub link",
        timeEstimate: 30,
        submissionType: "link",
        order: 1,
        points: 80
    },
    {
        id: 8,
        milestoneId: 3,
        title: "Build a Calculator",
        description: "Create a functioning calculator with arithmetic operations",
        expectedOutput: "Live URL of calculator app",
        timeEstimate: 45,
        submissionType: "link",
        order: 2,
        points: 120
    },
    {
        id: 9,
        milestoneId: 4,
        title: "Portfolio Planning",
        description: "Plan and sketch your portfolio website",
        expectedOutput: "Figma link or uploaded image of design",
        timeEstimate: 20,
        submissionType: "file",
        order: 1,
        points: 100
    },
    {
        id: 10,
        milestoneId: 4,
        title: "Final Portfolio Submission",
        description: "Complete portfolio website with all learned skills",
        expectedOutput: "Live URL of portfolio website",
        timeEstimate: 120,
        submissionType: "link",
        order: 2,
        points: 400
    }
];

// ============================================
// TASK SUBMISSIONS - Student submissions
// ============================================
const submissionsData = [
    {
        id: 1,
        taskId: 1,
        userId: 1,
        submissionUrl: "https://github.com/johndoe/html-page",
        submittedAt: "2024-01-20T14:30:00Z",
        status: "approved",
        reviewedBy: 3,
        reviewedAt: "2024-01-20T16:00:00Z",
        feedback: "Great work! Clean code structure."
    },
    {
        id: 2,
        taskId: 2,
        userId: 1,
        submissionUrl: "https://github.com/johndoe/styled-page",
        submittedAt: "2024-01-22T10:00:00Z",
        status: "approved",
        reviewedBy: 3,
        reviewedAt: "2024-01-22T12:00:00Z",
        feedback: "Excellent styling!"
    },
    {
        id: 3,
        taskId: 4,
        userId: 1,
        submissionUrl: null,
        submittedAt: null,
        status: "in_progress",
        reviewedBy: null,
        reviewedAt: null,
        feedback: null
    },
    {
        id: 4,
        taskId: 7,
        userId: 1,
        submissionUrl: "https://codepen.io/johndoe/events",
        submittedAt: "2024-02-15T09:00:00Z",
        status: "needs_changes",
        reviewedBy: 3,
        reviewedAt: "2024-02-15T11:00:00Z",
        feedback: "Good start! Please add more event types and error handling."
    }
];

// ============================================
// ALERTS - Notifications for students
// ============================================
const alertsData = [
    {
        id: 1,
        userId: 1,
        type: "milestone_due",
        title: "Milestone 3 due in 2 days",
        message: "You have 2 tasks pending in 'Building Interactive Apps' milestone. Due: Feb 25",
        priority: "high",
        actionUrl: "/milestone/3",
        actionLabel: "Resume Milestone",
        createdAt: "2024-02-23T08:00:00Z",
        read: false,
        dismissed: false
    },
    {
        id: 2,
        userId: 1,
        type: "session_reminder",
        title: "Live session at 7 PM",
        message: "JavaScript Fundamentals session starts in 3 hours. Don't miss it!",
        priority: "high",
        actionUrl: "/session/2",
        actionLabel: "Join Session",
        createdAt: "2024-02-23T16:00:00Z",
        read: false,
        dismissed: false
    },
    {
        id: 3,
        userId: 1,
        type: "inactivity",
        title: "We missed you!",
        message: "You haven't logged in for 3 days. Start where you left off.",
        priority: "medium",
        actionUrl: "/milestone/3",
        actionLabel: "Start Task",
        createdAt: "2024-02-22T08:00:00Z",
        read: true,
        dismissed: false
    },
    {
        id: 4,
        userId: 1,
        type: "feedback_received",
        title: "Feedback on submission",
        message: "Your mentor reviewed your DOM exercise. Changes requested.",
        priority: "medium",
        actionUrl: "/submission/4",
        actionLabel: "View Feedback",
        createdAt: "2024-02-15T11:00:00Z",
        read: true,
        dismissed: false
    },
    {
        id: 5,
        userId: 1,
        type: "milestone_completed",
        title: "🎉 Milestone 1 Completed!",
        message: "Congratulations! You've earned the 'HTML Explorer' badge!",
        priority: "low",
        actionUrl: "/badges",
        actionLabel: "View Badge",
        createdAt: "2024-01-28T15:00:00Z",
        read: true,
        dismissed: false
    }
];

// ============================================
// USER PROGRESS - Per-user progress tracking
// ============================================
const userProgressData = [
    {
        userId: 1,
        cohortId: 1,
        currentWeek: 6,
        totalPoints: 180,
        skillScore: 72,
        completedTasks: 2,
        totalTasks: 10,
        completedMilestones: 1,
        totalMilestones: 4,
        attendancePercentage: 85,
        lastActivityAt: "2024-02-23T14:00:00Z",
        streak: 5,
        rank: 3,
        status: "active" // active, at_risk, inactive
    }
];

// ============================================
// STUDY BUDDIES - Social connections
// ============================================
const studyBuddiesData = [
    {
        id: 1,
        userId: 1,
        buddyId: 5,
        status: "pending",
        matchedAt: "2024-01-20T10:00:00Z"
    },
    {
        id: 2,
        userId: 1,
        buddyId: 8,
        status: "accepted",
        connectedAt: "2024-01-22T14:00:00Z"
    }
];

// ============================================
// WEEKLY CHALLENGES
// ============================================
const challengesData = [
    {
        id: 1,
        cohortId: 1,
        title: "CSS Art Challenge",
        description: "Create artwork using only CSS",
        weekNumber: 2,
        duration: 60,
        points: 50,
        submissions: [
            { userId: 1, url: "https://codepen.io/johndoe/css-art", submittedAt: "2024-01-25T10:00:00Z" }
        ]
    },
    {
        id: 2,
        cohortId: 1,
        title: "Code Golf Challenge",
        description: "Solve a problem in minimum lines of code",
        weekNumber: 4,
        duration: 30,
        points: 30,
        submissions: []
    }
];

// ============================================
// LEADERBOARD
// ============================================
const leaderboardData = [
    { rank: 1, userId: 7, name: "Alice Smith", points: 520, badge: "🏆 Top Learner" },
    { rank: 2, userId: 12, name: "Bob Johnson", points: 485, badge: "⭐ Star Student" },
    { rank: 3, userId: 1, name: "John Doe", points: 180, badge: "🔥 On Fire" },
    { rank: 4, userId: 5, name: "Charlie Brown", points: 165, badge: "💪 Hard Worker" },
    { rank: 5, userId: 8, name: "Diana Prince", points: 150, badge: "🌟 Rising Star" }
];

// ============================================
// BADGES
// ============================================
const badgesData = [
    { id: 1, name: "HTML Explorer", icon: "🌐", description: "Completed HTML basics", points: 100, earnedBy: [1, 5, 7, 12] },
    { id: 2, name: "CSS Master", icon: "🎨", description: "Mastered CSS styling", points: 150, earnedBy: [7, 12] },
    { id: 3, name: "JS Beginner", icon: "⚡", description: "Started JavaScript journey", points: 100, earnedBy: [7] },
    { id: 4, name: "DOM Master", icon: "🎯", description: "Completed DOM manipulation", points: 200, earnedBy: [] },
    { id: 5, name: "Graduate", icon: "🏆", description: "Completed full course", points: 500, earnedBy: [] }
];

// ============================================
// SAMPLE USERS
// ============================================
const usersData = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "student",
        avatar: "https://via.placeholder.com/150",
        bio: "Passionate learner looking to master web development",
        phone: "+1 234 567 8900",
        location: "New York, USA",
        cohortId: 1,
        enrolledCourses: [1, 4],
        completedCourses: [],
        certificates: [],
        joinDate: "2024-01-15",
        lastActive: "2024-03-05",
        notificationPrefs: {
            email: true,
            whatsapp: true,
            inApp: true
        }
    },
    {
        id: 2,
        name: "Admin User",
        email: "admin@skilledsapiens.com",
        password: "admin123",
        role: "admin",
        avatar: "https://via.placeholder.com/150",
        bio: "Platform administrator",
        phone: "+1 234 567 8901",
        location: "San Francisco, USA",
        cohortId: null,
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        joinDate: "2023-06-01",
        lastActive: "2024-03-05",
        notificationPrefs: { email: true, whatsapp: false, inApp: true }
    },
    {
        id: 3,
        name: "Mentor User",
        email: "mentor@skilledsapiens.com",
        password: "mentor123",
        role: "mentor",
        avatar: "https://via.placeholder.com/150",
        bio: "Professional mentor",
        phone: "+1 234 567 8902",
        location: "Los Angeles, USA",
        cohortId: 1,
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        joinDate: "2023-08-15",
        lastActive: "2024-03-05",
        notificationPrefs: { email: true, whatsapp: false, inApp: true }
    },
    {
        id: 4,
        name: "Master Admin",
        email: "admin@test.org",
        password: "admin123",
        role: "admin",
        avatar: "https://via.placeholder.com/150",
        bio: "Master administrator account",
        phone: "+1 999 999 9999",
        location: "System",
        cohortId: null,
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        joinDate: "2024-01-01",
        lastActive: "2024-03-05",
        notificationPrefs: { email: true, whatsapp: false, inApp: true }
    }
];

// ============================================
// SAMPLE COURSES
// ============================================
const coursesData = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp 2024",
        description: "Learn HTML, CSS, JavaScript, React, Node.js and more.",
        shortDescription: "Master web development from scratch",
        category: "web-development",
        level: "beginner",
        price: 746900,
        duration: 45,
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
        instructor: { name: "Sarah Johnson", avatar: "https://via.placeholder.com/100", title: "Senior Web Developer" },
        rating: 4.8,
        students: 15420,
        lessons: 156,
        enrolled: true,
        progress: 65,
        lastLesson: 12,
        tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
        features: ["45 hours on-demand video", "Coding exercises", "Certificate of completion", "Lifetime access"],
        curriculum: [
            { title: "Introduction", lessons: [{ id: 1, title: "Overview", duration: "5:30", completed: true }] },
            { title: "HTML", lessons: [{ id: 2, title: "Basics", duration: "15:00", completed: true }] },
            { title: "CSS", lessons: [{ id: 3, title: "Styling", duration: "20:00", completed: false }] },
            { title: "JavaScript", lessons: [{ id: 4, title: "Variables", duration: "18:00", completed: false }] }
        ]
    },
    {
        id: 2,
        title: "Python for Data Science",
        description: "Master Python for data science and ML.",
        category: "data-science",
        level: "intermediate",
        price: 1079900,
        duration: 65,
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400",
        instructor: { name: "Michael Chen", avatar: "https://via.placeholder.com/100", title: "Data Scientist" },
        rating: 4.9,
        students: 12350,
        lessons: 189,
        enrolled: false,
        progress: 0,
        tags: ["Python", "ML", "Data Science"]
    },
    {
        id: 3,
        title: "React Native - Mobile Apps",
        description: "Build cross-platform mobile apps.",
        category: "mobile-development",
        level: "intermediate",
        price: 829900,
        duration: 38,
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
        instructor: { name: "Emily Davis", avatar: "https://via.placeholder.com/100", title: "Mobile Developer" },
        rating: 4.7,
        students: 8920,
        lessons: 124,
        enrolled: false,
        progress: 0,
        tags: ["React Native", "Mobile", "iOS", "Android"]
    }
];

// ============================================
// Initialize all data
// ============================================
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || usersData;
let courses = JSON.parse(localStorage.getItem('courses')) || coursesData;
let cohorts = JSON.parse(localStorage.getItem('cohorts')) || cohortsData;
let sessions = JSON.parse(localStorage.getItem('sessions')) || sessionsData;
let milestones = JSON.parse(localStorage.getItem('milestones')) || milestonesData;
let tasks = JSON.parse(localStorage.getItem('tasks')) || tasksData;
let submissions = JSON.parse(localStorage.getItem('submissions')) || submissionsData;
let alerts = JSON.parse(localStorage.getItem('alerts')) || alertsData;
let userProgress = JSON.parse(localStorage.getItem('userProgress')) || userProgressData;
let studyBuddies = JSON.parse(localStorage.getItem('studyBuddies')) || studyBuddiesData;
let challenges = JSON.parse(localStorage.getItem('challenges')) || challengesData;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || leaderboardData;
let badges = JSON.parse(localStorage.getItem('badges')) || badgesData;

// Save data to localStorage
function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('cohorts', JSON.stringify(cohorts));
    localStorage.setItem('sessions', JSON.stringify(sessions));
    localStorage.setItem('milestones', JSON.stringify(milestones));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('submissions', JSON.stringify(submissions));
    localStorage.setItem('alerts', JSON.stringify(alerts));
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    localStorage.setItem('studyBuddies', JSON.stringify(studyBuddies));
    localStorage.setItem('challenges', JSON.stringify(challenges));
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    localStorage.setItem('badges', JSON.stringify(badges));
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// Initialize with default data if empty
if (!localStorage.getItem('courses')) {
    saveData();
}
