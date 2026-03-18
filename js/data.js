// Skilled Sapiens - Data Layer (India MBA Edition)

// Force fresh data on version change
const DATA_VERSION = '3.0';
if (localStorage.getItem('dataVersion') !== DATA_VERSION) {
    localStorage.clear();
    localStorage.setItem('dataVersion', DATA_VERSION);
}

// ============================================
// COHORTS - MBA Batches
// ============================================
const cohortsData = [
    {
        id: 1,
        name: "MBA Finance & Strategy Batch 2026",
        startDate: "2026-01-10",
        endDate: "2026-03-10",
        durationWeeks: 8,
        currentWeek: 6,
        status: "active",
        totalStudents: 28,
        mentorId: 3
    },
    {
        id: 2,
        name: "MBA Marketing & HR Batch 2026",
        startDate: "2026-02-01",
        endDate: "2026-04-01",
        durationWeeks: 8,
        currentWeek: 4,
        status: "active",
        totalStudents: 22,
        mentorId: 3
    }
];

// ============================================
// SESSIONS - Live MBA Sessions
// ============================================
const sessionsData = [
    {
        id: 1,
        cohortId: 1,
        title: "Financial Statement Analysis & Ratio Interpretation",
        description: "Deep-dive into P&L, Balance Sheet, and Cash Flow statements",
        scheduledDate: "2026-03-20",
        scheduledTime: "19:00",
        duration: 90,
        zoomLink: "https://zoom.us/j/123456789",
        calendarLink: "https://calendar.google.com/calendar/event?eid=abc123",
        status: "upcoming",
        recordingUrl: null
    },
    {
        id: 2,
        cohortId: 1,
        title: "Consumer Behavior & Market Segmentation",
        description: "Understanding Indian consumer psychology and STP framework",
        scheduledDate: "2026-03-22",
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
        title: "HR Analytics & Talent Management Workshop",
        description: "Data-driven HR decisions and workforce planning",
        scheduledDate: "2026-03-25",
        scheduledTime: "19:00",
        duration: 75,
        zoomLink: "https://zoom.us/j/456789123",
        calendarLink: "https://calendar.google.com/calendar/event?eid=ghi789",
        status: "upcoming",
        recordingUrl: null
    }
];

// ============================================
// MILESTONES - MBA Course Milestones
// ============================================
const milestonesData = [
    {
        id: 1,
        cohortId: 1,
        title: "Business Fundamentals (Week 1–2)",
        description: "Economics, Accounting Basics & Business Environment",
        weekNumber: 2,
        dueDate: "2026-01-24",
        tasks: [1, 2, 3],
        badge: "📊 Business Basics",
        points: 100
    },
    {
        id: 2,
        cohortId: 1,
        title: "Functional Management (Week 3–4)",
        description: "Marketing, HR & Operations Essentials",
        weekNumber: 4,
        dueDate: "2026-02-07",
        tasks: [4, 5, 6],
        badge: "⚙️ Functional Manager",
        points: 150
    },
    {
        id: 3,
        cohortId: 1,
        title: "Strategic Decision Making (Week 5–6)",
        description: "Corporate Strategy, Finance & Leadership",
        weekNumber: 6,
        dueDate: "2026-02-21",
        tasks: [7, 8],
        badge: "♟️ Strategy Expert",
        points: 200
    },
    {
        id: 4,
        cohortId: 1,
        title: "Capstone Business Project (Week 7–8)",
        description: "End-to-end Business Plan Presentation",
        weekNumber: 8,
        dueDate: "2026-03-07",
        tasks: [9, 10],
        badge: "🏆 MBA Graduate",
        points: 500
    }
];

// ============================================
// TASKS - MBA Micro-tasks
// ============================================
const tasksData = [
    {
        id: 1,
        milestoneId: 1,
        title: "Case Study: Tata Group's Diversification Strategy",
        description: "Analyse Tata Group's business segments, revenue mix, and strategic rationale for diversification across industries",
        expectedOutput: "2-page PDF case analysis with SWOT and strategic recommendations",
        timeEstimate: 30,
        submissionType: "file",
        order: 1,
        points: 25
    },
    {
        id: 2,
        milestoneId: 1,
        title: "Basic Financial Ratios Worksheet",
        description: "Calculate liquidity, profitability, and leverage ratios from a sample balance sheet of an Indian FMCG company",
        expectedOutput: "Excel sheet with calculated ratios and 100-word interpretation",
        timeEstimate: 40,
        submissionType: "link",
        order: 2,
        points: 35
    },
    {
        id: 3,
        milestoneId: 1,
        title: "Business Environment Quiz",
        description: "MCQ quiz covering PESTLE analysis, Porter's Five Forces, and Indian business regulations",
        expectedOutput: "In-platform quiz completion with minimum 60% score",
        timeEstimate: 20,
        submissionType: "quiz",
        order: 3,
        points: 40
    },
    {
        id: 4,
        milestoneId: 2,
        title: "Market Research Report: Indian FMCG Sector",
        description: "Conduct secondary research on the Indian FMCG market—size, growth drivers, key players, and consumer trends",
        expectedOutput: "4-page market research report with charts and citations",
        timeEstimate: 50,
        submissionType: "file",
        order: 1,
        points: 60
    },
    {
        id: 5,
        milestoneId: 2,
        title: "Design an HR Onboarding Policy",
        description: "Create a structured 30-60-90 day onboarding plan for a new Sales Manager joining an Indian mid-size firm",
        expectedOutput: "Google Doc link with the onboarding plan template",
        timeEstimate: 35,
        submissionType: "link",
        order: 2,
        points: 50
    },
    {
        id: 6,
        milestoneId: 2,
        title: "Operations Flowchart: E-commerce Fulfilment",
        description: "Map the order-to-delivery process for an Indian e-commerce company and identify bottlenecks",
        expectedOutput: "Flowchart (Lucidchart or draw.io) link",
        timeEstimate: 30,
        submissionType: "link",
        order: 3,
        points: 55
    },
    {
        id: 7,
        milestoneId: 3,
        title: "Strategic Analysis: Reliance Jio's Market Disruption",
        description: "Apply Porter's Five Forces and Blue Ocean Strategy frameworks to analyse Jio's entry and its impact",
        expectedOutput: "3-page strategic analysis report",
        timeEstimate: 45,
        submissionType: "file",
        order: 1,
        points: 90
    },
    {
        id: 8,
        milestoneId: 3,
        title: "Financial Modelling: 3-Statement Model",
        description: "Build a simple 3-statement financial model (P&L, Balance Sheet, Cash Flow) for a hypothetical Indian startup",
        expectedOutput: "Google Sheets link with the financial model",
        timeEstimate: 60,
        submissionType: "link",
        order: 2,
        points: 130
    },
    {
        id: 9,
        milestoneId: 4,
        title: "Business Plan Draft",
        description: "Prepare a comprehensive business plan for an original venture idea targeting the Indian market",
        expectedOutput: "Slide deck (Google Slides or Canva link) — 15–20 slides",
        timeEstimate: 90,
        submissionType: "link",
        order: 1,
        points: 150
    },
    {
        id: 10,
        milestoneId: 4,
        title: "Final Business Plan Presentation",
        description: "Deliver a 10-minute pitch of your business plan covering problem, solution, market size, financials, and go-to-market strategy",
        expectedOutput: "Video recording link (Loom/YouTube) of the pitch",
        timeEstimate: 120,
        submissionType: "link",
        order: 2,
        points: 350
    }
];

// ============================================
// TASK SUBMISSIONS
// ============================================
const submissionsData = [
    {
        id: 1,
        taskId: 1,
        userId: 1,
        submissionUrl: "https://drive.google.com/file/d/tata-case-study",
        submittedAt: "2026-01-20T14:30:00Z",
        status: "approved",
        reviewedBy: 3,
        reviewedAt: "2026-01-20T16:00:00Z",
        feedback: "Excellent SWOT analysis! Very well structured and insightful."
    },
    {
        id: 2,
        taskId: 2,
        userId: 1,
        submissionUrl: "https://docs.google.com/spreadsheets/d/financial-ratios",
        submittedAt: "2026-01-22T10:00:00Z",
        status: "approved",
        reviewedBy: 3,
        reviewedAt: "2026-01-22T12:00:00Z",
        feedback: "Ratios calculated correctly with good interpretation. Keep it up!"
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
        submissionUrl: "https://drive.google.com/file/d/jio-strategy-analysis",
        submittedAt: "2026-02-15T09:00:00Z",
        status: "needs_changes",
        reviewedBy: 3,
        reviewedAt: "2026-02-15T11:00:00Z",
        feedback: "Good start! Please add the Blue Ocean Strategy canvas and deepen your competitive analysis."
    }
];

// ============================================
// ALERTS
// ============================================
const alertsData = [
    {
        id: 1,
        userId: 1,
        type: "milestone_due",
        title: "Milestone 3 due in 2 days",
        message: "You have 2 tasks pending in 'Strategic Decision Making' milestone. Due: 21 Feb. Complete now to earn your ♟️ Strategy Expert badge!",
        priority: "high",
        actionUrl: "/tasks",
        actionLabel: "Resume Milestone",
        createdAt: "2026-02-19T08:00:00Z",
        read: false,
        dismissed: false
    },
    {
        id: 2,
        userId: 1,
        type: "session_reminder",
        title: "Live Session at 7 PM Tonight",
        message: "Financial Statement Analysis session with Prof. Rajesh Kumar starts in 3 hours. Don't miss it!",
        priority: "high",
        actionUrl: "/dashboard",
        actionLabel: "Join Session",
        createdAt: "2026-03-20T16:00:00Z",
        read: false,
        dismissed: false
    },
    {
        id: 3,
        userId: 1,
        type: "inactivity",
        title: "We Missed You, Arjun! 👋",
        message: "You haven't logged in for 3 days. Resume your Financial Modelling task—you're just one submission away from your badge!",
        priority: "medium",
        actionUrl: "/tasks",
        actionLabel: "Resume Learning",
        createdAt: "2026-02-22T08:00:00Z",
        read: true,
        dismissed: false
    },
    {
        id: 4,
        userId: 1,
        type: "feedback_received",
        title: "Mentor Feedback on Your Case Study",
        message: "Prof. Rajesh Kumar reviewed your Jio Strategy Analysis. Revisions requested—please add the Blue Ocean Canvas.",
        priority: "medium",
        actionUrl: "/tasks",
        actionLabel: "View Feedback",
        createdAt: "2026-02-15T11:00:00Z",
        read: true,
        dismissed: false
    },
    {
        id: 5,
        userId: 1,
        type: "milestone_completed",
        title: "🎉 Milestone 1 Completed!",
        message: "Congratulations Arjun! You've earned the '📊 Business Basics' badge and 100 points!",
        priority: "low",
        actionUrl: "/dashboard",
        actionLabel: "View Badge",
        createdAt: "2026-01-24T15:00:00Z",
        read: true,
        dismissed: false
    }
];

// ============================================
// USER PROGRESS
// ============================================
const userProgressData = [
    {
        userId: 1,
        cohortId: 1,
        currentWeek: 6,
        totalPoints: 250,
        skillScore: 74,
        completedTasks: 2,
        totalTasks: 10,
        completedMilestones: 1,
        totalMilestones: 4,
        attendancePercentage: 88,
        lastActivityAt: "2026-03-18T14:00:00Z",
        streak: 5,
        rank: 3,
        status: "active"
    }
];

// ============================================
// STUDY BUDDIES
// ============================================
const studyBuddiesData = [
    {
        id: 1,
        userId: 1,
        buddyId: 5,
        status: "pending",
        matchedAt: "2026-01-20T10:00:00Z"
    },
    {
        id: 2,
        userId: 1,
        buddyId: 8,
        status: "accepted",
        connectedAt: "2026-01-22T14:00:00Z"
    }
];

// ============================================
// WEEKLY CHALLENGES
// ============================================
const challengesData = [
    {
        id: 1,
        cohortId: 1,
        title: "Case Analysis Speed Challenge",
        description: "Analyse the given mini-case on Zomato's business model in under 30 minutes",
        weekNumber: 2,
        duration: 30,
        points: 50,
        submissions: [
            { userId: 1, url: "https://drive.google.com/case-zomato", submittedAt: "2026-01-25T10:00:00Z" }
        ]
    },
    {
        id: 2,
        cohortId: 1,
        title: "Marketing Campaign Design",
        description: "Design a 360° marketing campaign for a new D2C brand launching in India",
        weekNumber: 4,
        duration: 45,
        points: 60,
        submissions: []
    }
];

// ============================================
// LEADERBOARD
// ============================================
const leaderboardData = [
    { rank: 1, userId: 7, name: "Rohit Gupta", points: 520, badge: "🏆 Top Performer" },
    { rank: 2, userId: 12, name: "Sneha Patel", points: 485, badge: "⭐ Star Student" },
    { rank: 3, userId: 1, name: "Arjun Sharma", points: 250, badge: "🔥 On Fire" },
    { rank: 4, userId: 5, name: "Divya Krishnan", points: 195, badge: "💪 Rising Star" },
    { rank: 5, userId: 8, name: "Manish Agarwal", points: 175, badge: "🌟 Consistent Learner" }
];

// ============================================
// BADGES
// ============================================
const badgesData = [
    { id: 1, name: "Business Basics", icon: "📊", description: "Completed Business Fundamentals", points: 100, earnedBy: [1, 5, 7, 12] },
    { id: 2, name: "Finance Expert", icon: "💰", description: "Mastered Financial Management", points: 150, earnedBy: [7, 12] },
    { id: 3, name: "Marketing Guru", icon: "📈", description: "Completed Marketing Module", points: 150, earnedBy: [7] },
    { id: 4, name: "Strategy Master", icon: "♟️", description: "Completed Strategic Decision Making", points: 200, earnedBy: [] },
    { id: 5, name: "MBA Graduate", icon: "🎓", description: "Completed the full MBA program", points: 500, earnedBy: [] }
];

// ============================================
// USERS (Indian Names)
// ============================================
const usersData = [
    {
        id: 1,
        name: "Arjun Sharma",
        email: "arjun.sharma@example.com",
        password: "password123",
        role: "student",
        avatar: null,
        bio: "Aspiring finance professional from Mumbai, passionate about investment banking and corporate strategy.",
        phone: "+91 98765 43210",
        location: "Mumbai, Maharashtra",
        cohortId: 1,
        enrolledCourses: [1, 4],
        completedCourses: [],
        certificates: [],
        joinDate: "2026-01-10",
        lastActive: "2026-03-18",
        notificationPrefs: { email: true, whatsapp: true, inApp: true }
    },
    {
        id: 2,
        name: "Priya Menon",
        email: "admin@skilledsapiens.com",
        password: "admin123",
        role: "admin",
        avatar: null,
        bio: "Platform Administrator with 8 years in EdTech",
        phone: "+91 80123 45678",
        location: "Bengaluru, Karnataka",
        cohortId: null,
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        joinDate: "2023-06-01",
        lastActive: "2026-03-18",
        notificationPrefs: { email: true, whatsapp: false, inApp: true }
    },
    {
        id: 3,
        name: "Prof. Rajesh Kumar",
        email: "mentor@skilledsapiens.com",
        password: "mentor123",
        role: "mentor",
        avatar: null,
        bio: "IIM Ahmedabad alumnus with 15 years of industry experience in corporate finance and strategy consulting.",
        phone: "+91 91234 56789",
        location: "Pune, Maharashtra",
        cohortId: 1,
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        joinDate: "2023-08-15",
        lastActive: "2026-03-18",
        notificationPrefs: { email: true, whatsapp: true, inApp: true }
    },
    {
        id: 4,
        name: "Anjali Desai",
        email: "admin@test.org",
        password: "admin123",
        role: "admin",
        avatar: null,
        bio: "Senior Platform Administrator",
        phone: "+91 99999 88888",
        location: "New Delhi",
        cohortId: null,
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
        joinDate: "2024-01-01",
        lastActive: "2026-03-18",
        notificationPrefs: { email: true, whatsapp: false, inApp: true }
    },
    {
        id: 5,
        name: "Divya Krishnan",
        email: "divya.k@example.com",
        password: "student123",
        role: "student",
        avatar: null,
        bio: "Marketing enthusiast from Chennai",
        phone: "+91 94400 12345",
        location: "Chennai, Tamil Nadu",
        cohortId: 1,
        enrolledCourses: [2],
        completedCourses: [],
        certificates: [],
        joinDate: "2026-01-10",
        lastActive: "2026-03-15"
    },
    {
        id: 8,
        name: "Vikash Soni",
        email: "vikash.soni@example.com",
        password: "student123",
        role: "student",
        avatar: null,
        bio: "Operations and Supply Chain enthusiast",
        phone: "+91 97800 23456",
        location: "Jaipur, Rajasthan",
        cohortId: 1,
        enrolledCourses: [5],
        completedCourses: [],
        certificates: [],
        joinDate: "2026-01-10",
        lastActive: "2026-03-17"
    }
];

// ============================================
// COURSES — MBA Management Courses
// ============================================
const coursesData = [
    {
        id: 1,
        title: "Financial Management & Corporate Finance",
        description: "Master financial analysis, capital budgeting, valuation, and corporate finance principles used by India's top CFOs and investment bankers.",
        shortDescription: "Master corporate finance from fundamentals to advanced valuation",
        category: "finance",
        level: "Intermediate",
        price: 12999,
        originalPrice: 18000,
        duration: 36,
        thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&fit=crop",
        instructor: {
            name: "Prof. Ramesh Iyer",
            title: "IIM-A Alumni | Ex-CFO, Infosys BPO",
            initials: "RI"
        },
        rating: 4.8,
        students: 8420,
        lessons: 112,
        enrolled: true,
        progress: 65,
        lastLesson: 12,
        tags: ["Finance", "Valuation", "Capital Budgeting", "DCF", "Corporate Finance"],
        features: ["36 hours on-demand video", "Case studies & Excel templates", "Certificate of completion", "Lifetime access", "Q&A with expert"],
        curriculum: [
            {
                title: "Introduction to Financial Management",
                lessons: [
                    { id: 1, title: "Overview & Role of Finance Function", duration: "12:30", completed: true },
                    { id: 2, title: "Time Value of Money", duration: "18:00", completed: true },
                    { id: 3, title: "Risk & Return Concepts", duration: "20:00", completed: true }
                ]
            },
            {
                title: "Financial Statement Analysis",
                lessons: [
                    { id: 4, title: "Reading a Balance Sheet", duration: "22:00", completed: true },
                    { id: 5, title: "P&L and Cash Flow Statement", duration: "25:00", completed: false },
                    { id: 6, title: "Ratio Analysis — Liquidity & Profitability", duration: "28:00", completed: false }
                ]
            },
            {
                title: "Capital Budgeting & Valuation",
                lessons: [
                    { id: 7, title: "NPV & IRR Analysis", duration: "30:00", completed: false },
                    { id: 8, title: "DCF Valuation Model", duration: "35:00", completed: false },
                    { id: 9, title: "Comparable Company Analysis", duration: "28:00", completed: false }
                ]
            },
            {
                title: "Working Capital & Financing",
                lessons: [
                    { id: 10, title: "Working Capital Management", duration: "20:00", completed: false },
                    { id: 11, title: "Sources of Finance", duration: "18:00", completed: false }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Strategic Marketing Management",
        description: "Learn STP, brand strategy, digital marketing, and consumer behaviour with case studies from India's most successful FMCG, D2C and B2B brands.",
        shortDescription: "Build brand strategy with India's top marketing frameworks",
        category: "marketing",
        level: "Beginner",
        price: 9999,
        originalPrice: 14000,
        duration: 28,
        thumbnail: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=500&fit=crop",
        instructor: {
            name: "Dr. Priya Nair",
            title: "Ex-Brand Manager, HUL | Marketing Consultant",
            initials: "PN"
        },
        rating: 4.7,
        students: 6850,
        lessons: 88,
        enrolled: false,
        progress: 0,
        tags: ["Marketing", "STP", "Branding", "Digital Marketing", "Consumer Behaviour"],
        features: ["28 hours on-demand video", "Brand strategy templates", "Certificate of completion", "Lifetime access"],
        curriculum: [
            {
                title: "Marketing Fundamentals & Mix",
                lessons: [
                    { id: 101, title: "4Ps of Marketing", duration: "15:00", completed: false },
                    { id: 102, title: "STP Framework", duration: "20:00", completed: false }
                ]
            },
            {
                title: "Consumer Behaviour",
                lessons: [
                    { id: 103, title: "Indian Consumer Psychology", duration: "22:00", completed: false },
                    { id: 104, title: "Market Research Methods", duration: "25:00", completed: false }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Human Resource Management",
        description: "Master talent acquisition, performance management, compensation design, and HR analytics for modern Indian organisations.",
        shortDescription: "Modern HR management for India's growing workforce",
        category: "hr-management",
        level: "Beginner",
        price: 7999,
        originalPrice: 12000,
        duration: 24,
        thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&fit=crop",
        instructor: {
            name: "Ms. Kavitha Reddy",
            title: "CHRO, Wipro (Retd.) | HR Advisor",
            initials: "KR"
        },
        rating: 4.6,
        students: 5230,
        lessons: 76,
        enrolled: false,
        progress: 0,
        tags: ["HR", "Talent Management", "Performance", "Compensation", "HR Analytics"],
        features: ["24 hours on-demand video", "HR policy templates", "Certificate of completion", "Lifetime access"]
    },
    {
        id: 4,
        title: "Business Analytics & Data-Driven Decisions",
        description: "Learn to use Excel, Power BI, and statistical tools to drive business decisions—from sales forecasting to operational efficiency in Indian firms.",
        shortDescription: "Data-driven decisions using Power BI and Excel analytics",
        category: "analytics",
        level: "Intermediate",
        price: 14999,
        originalPrice: 20000,
        duration: 42,
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&fit=crop",
        instructor: {
            name: "Mr. Vikram Mehta",
            title: "Data Analytics Lead, McKinsey India | IIT-B",
            initials: "VM"
        },
        rating: 4.9,
        students: 9100,
        lessons: 130,
        enrolled: true,
        progress: 20,
        lastLesson: 5,
        tags: ["Analytics", "Power BI", "Excel", "Data Visualisation", "Decision Making"],
        features: ["42 hours on-demand video", "Power BI & Excel projects", "Certificate of completion", "Lifetime access", "Industry datasets"],
        curriculum: [
            {
                title: "Excel for Business Analytics",
                lessons: [
                    { id: 201, title: "Advanced Excel — Pivot Tables & VLOOKUP", duration: "18:00", completed: true },
                    { id: 202, title: "Dashboard Design in Excel", duration: "22:00", completed: false }
                ]
            },
            {
                title: "Power BI Fundamentals",
                lessons: [
                    { id: 203, title: "Introduction to Power BI", duration: "20:00", completed: false },
                    { id: 204, title: "Building Interactive Reports", duration: "25:00", completed: false }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Operations & Supply Chain Management",
        description: "Master lean operations, logistics, inventory management, and supply chain design using real-world Indian manufacturing and e-commerce case studies.",
        shortDescription: "Lean operations and supply chain for Indian businesses",
        category: "operations",
        level: "Intermediate",
        price: 11499,
        originalPrice: 16000,
        duration: 32,
        thumbnail: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&fit=crop",
        instructor: {
            name: "Dr. Suresh Patel",
            title: "VP Operations, Flipkart | IIM-K Alumni",
            initials: "SP"
        },
        rating: 4.7,
        students: 4780,
        lessons: 98,
        enrolled: false,
        progress: 0,
        tags: ["Operations", "Supply Chain", "Logistics", "Lean", "Inventory"],
        features: ["32 hours on-demand video", "Process mapping templates", "Certificate of completion", "Lifetime access"]
    },
    {
        id: 6,
        title: "Entrepreneurship & New Venture Creation",
        description: "From idea validation to fundraising—learn to build and scale a startup in India. Covers business modelling, pitching to VCs, and growth hacking.",
        shortDescription: "Build and scale your startup in the Indian ecosystem",
        category: "entrepreneurship",
        level: "Beginner",
        price: 8499,
        originalPrice: 13000,
        duration: 26,
        thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500&fit=crop",
        instructor: {
            name: "Mr. Aditya Kapoor",
            title: "Founder, 2 Exits | Angel Investor | IIT-D",
            initials: "AK"
        },
        rating: 4.8,
        students: 7320,
        lessons: 82,
        enrolled: false,
        progress: 0,
        tags: ["Entrepreneurship", "Startup", "Fundraising", "Business Model", "VC Pitch"],
        features: ["26 hours on-demand video", "Pitch deck templates", "Certificate of completion", "Lifetime access", "VC connect sessions"]
    },
    {
        id: 7,
        title: "Corporate Finance & Investment Banking",
        description: "Deep-dive into M&A, equity research, IPO process, LBO modelling, and investment banking as practised at India's top bulge-bracket banks.",
        shortDescription: "Investment banking and M&A for finance professionals",
        category: "finance",
        level: "Advanced",
        price: 13999,
        originalPrice: 20000,
        duration: 48,
        thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&fit=crop",
        instructor: {
            name: "CA Neha Joshi",
            title: "Ex-Goldman Sachs | Chartered Accountant",
            initials: "NJ"
        },
        rating: 4.9,
        students: 3960,
        lessons: 148,
        enrolled: false,
        progress: 0,
        tags: ["Investment Banking", "M&A", "Equity Research", "LBO", "IPO"],
        features: ["48 hours on-demand video", "Financial models & templates", "Certificate of completion", "Lifetime access", "Mock interview sessions"]
    },
    {
        id: 8,
        title: "Leadership & Organisational Behaviour",
        description: "Develop executive leadership skills—emotional intelligence, team dynamics, conflict resolution, and organisational culture for Indian workplaces.",
        shortDescription: "Executive leadership and team management for Indian leaders",
        category: "leadership",
        level: "Beginner",
        price: 6999,
        originalPrice: 10000,
        duration: 20,
        thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&fit=crop",
        instructor: {
            name: "Dr. Anjali Singh",
            title: "Organisational Psychologist | Ex-HR Director, Deloitte",
            initials: "AS"
        },
        rating: 4.5,
        students: 5640,
        lessons: 64,
        enrolled: false,
        progress: 0,
        tags: ["Leadership", "EQ", "Team Management", "OB", "Conflict Resolution"],
        features: ["20 hours on-demand video", "Leadership self-assessment tools", "Certificate of completion", "Lifetime access"]
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

// Seed initial data
saveData();
