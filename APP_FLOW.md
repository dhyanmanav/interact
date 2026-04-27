# Application Flow Diagram

## 🔄 Complete User Journey

```
┌─────────────────────────────────────────────────────────────┐
│                      START HERE                              │
│                    Landing Page (/)                          │
│                    ┌─────────────┐                          │
│                    │ Login Form  │                          │
│                    └──────┬──────┘                          │
└───────────────────────────┼──────────────────────────────────┘
                            │
                ┌───────────┴──────────┐
                │                      │
         Not Registered           Registered?
                │                      │
                v                      v
         ┌─────────────┐      ┌───────────────┐
         │   Signup    │      │ Enter Email & │
         │   Page      │      │   Password    │
         │ (/signup)   │      │               │
         └──────┬──────┘      └───────┬───────┘
                │                     │
                v                     v
    ┌──────────────────┐      ┌──────────────┐
    │ Enter Details:   │      │  Validate    │
    │ - Email          │      │ Credentials  │
    │ - Password       │      │              │
    │ - Access Code    │      └──────┬───────┘
    │   (interact2026) │             │
    └────────┬─────────┘      ┌──────┴───────┐
             │                │              │
             v          Admin User?    Regular User?
    ┌─────────────┐          │              │
    │   Validate  │          v              v
    │ Access Code │   ┌─────────────┐  ┌──────────────┐
    └──────┬──────┘   │    Admin    │  │  Participant │
           │          │  Dashboard  │  │   Dashboard  │
    ┌──────┴──────┐   │  (/admin)   │  │ (/dashboard) │
    │             │   └─────────────┘  └──────┬───────┘
    Valid?   Invalid?                          │
    │             │                            │
    v             v                            v
Registration  Show Error              ┌───────────────┐
Success       Message                 │ Instructions  │
    │                                  │  & Warnings   │
    │                                  └───────┬───────┘
    v                                          │
Redirect to Login                              v
                                      ┌────────────────┐
                                      │  Start Test    │
                                      │    Button      │
                                      └────────┬───────┘
                                               │
                                               v
                                      ┌────────────────┐
                                      │ Test Interface │
                                      │    (/test)     │
                                      └────────┬───────┘
                                               │
                          ┌────────────────────┼────────────────────┐
                          │                    │                    │
                          v                    v                    v
                   ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
                   │  Question   │    │    Timer     │    │  Progress    │
                   │   Display   │    │   Running    │    │   Tracker    │
                   └─────────────┘    └──────────────┘    └──────────────┘
                          │                    │                    │
                          └────────────────────┼────────────────────┘
                                               │
                                               v
                                    ┌──────────────────┐
                                    │  Answer 5 Coding │
                                    │   Bug Questions  │
                                    └─────────┬────────┘
                                              │
                          ┌───────────────────┼───────────────────┐
                          │                   │                   │
                    Tab Switch?         Navigate Q's         All Done?
                          │                   │                   │
                          v                   v                   v
                   ┌─────────────┐    ┌──────────────┐    ┌─────────────┐
                   │  Warning    │    │ Previous/    │    │   Submit    │
                   │  Dialog     │    │ Next Buttons │    │   Button    │
                   └──────┬──────┘    └──────────────┘    └──────┬──────┘
                          │                                       │
                          v                                       v
                   ┌─────────────┐                        ┌──────────────┐
                   │ Auto-Submit │                        │ Confirmation │
                   │  & Penalty  │                        │   Dialog     │
                   └──────┬──────┘                        └──────┬───────┘
                          │                                      │
                          └──────────────────┬───────────────────┘
                                             │
                                             v
                                    ┌────────────────┐
                                    │ Calculate Score│
                                    │  & Time Taken  │
                                    └────────┬───────┘
                                             │
                                             v
                                    ┌────────────────┐
                                    │  Save to       │
                                    │  LocalStorage  │
                                    └────────┬───────┘
                                             │
                                             v
                                    ┌────────────────┐
                                    │   Submission   │
                                    │  Success Page  │
                                    │  (/success)    │
                                    └────────┬───────┘
                                             │
                                             v
                                    ┌────────────────┐
                                    │  Show Score &  │
                                    │   Time Taken   │
                                    └────────┬───────┘
                                             │
                                             v
                                    ┌────────────────┐
                                    │  Exit Platform │
                                    │    (Logout)    │
                                    └────────────────┘
```

## 🔐 Admin Flow

```
┌──────────────────────────────────────┐
│      Admin Login (/admin)            │
│   Email: dhyan@gmail.com             │
│   Password: 12345678                 │
└────────────┬─────────────────────────┘
             │
             v
┌──────────────────────────────────────┐
│        Admin Dashboard                │
│                                       │
│  ┌────────────────────────────────┐  │
│  │     Statistics Overview         │  │
│  │  • Total Registered: X          │  │
│  │  • Submissions: Y               │  │
│  │  • Active Tests: Z              │  │
│  │  • Average Score: A             │  │
│  └────────────────────────────────┘  │
│                                       │
│  ┌──────┬──────────┬───────────┐    │
│  │ Tab 1│  Tab 2   │   Tab 3   │    │
│  └──┬───┴──────────┴───────────┘    │
│     │                                │
│  ┌──┴──────────────────────────┐    │
│  │    Tab 1: Participants       │    │
│  │  • List all users            │    │
│  │  • Show status (Active/Done) │    │
│  │  • Monitor progress          │    │
│  └──────────────────────────────┘    │
│                                       │
│  ┌────────────────────────────────┐  │
│  │    Tab 2: Submissions          │  │
│  │  • View all submissions        │  │
│  │  • See scores & times          │  │
│  │  • Check timestamps            │  │
│  └────────────────────────────────┘  │
│                                       │
│  ┌────────────────────────────────┐  │
│  │    Tab 3: Rankings             │  │
│  │  • Leaderboard by score        │  │
│  │  • Trophy for top 3            │  │
│  │  • Accuracy percentages        │  │
│  └────────────────────────────────┘  │
│                                       │
│  🔄 Auto-refresh every 5 seconds     │
└──────────────────────────────────────┘
```

## 🎯 Data Flow

```
┌────────────────────────────────────────────────┐
│            Browser LocalStorage                 │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Key: "users"                            │  │
│  │  Value: [{ email, password }, ...]      │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Key: "currentUser"                      │  │
│  │  Value: { email, isAdmin }              │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Key: "test_{email}"                     │  │
│  │  Value: {                                │  │
│  │    status: string,                       │  │
│  │    startTime: number,                    │  │
│  │    currentQuestion: number,              │  │
│  │    answers: array,                       │  │
│  │    score?: number,                       │  │
│  │    time_taken?: number                   │  │
│  │  }                                       │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Key: "submissions"                      │  │
│  │  Value: [{                               │  │
│  │    user: string,                         │  │
│  │    answers: array,                       │  │
│  │    score: number,                        │  │
│  │    time_taken: number,                   │  │
│  │    status: string,                       │  │
│  │    submittedAt: number                   │  │
│  │  }, ...]                                 │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

## 🎨 Component Hierarchy

```
App
├── ErrorBoundary
│   └── AuthProvider
│       └── RouterProvider
│           ├── Root
│           │   ├── Login
│           │   ├── Signup
│           │   ├── Dashboard
│           │   ├── TestInterface
│           │   ├── SubmissionSuccess
│           │   ├── AdminDashboard
│           │   └── NotFound
│           └── Toaster
```

## 📋 Question Structure

```
Question Object
├── id: number
├── title: string
├── difficulty: string
├── language: string
├── code: string (multi-line)
├── input: string
├── output: string
├── bug_type: string
├── options: string[] (4 options)
├── correct_answer: number (0-3)
└── points: number (10)

Total Questions: 5
Total Points: 50
Languages: Python, Java, C++, JavaScript
Difficulty: All Hard
```

## 🔒 Security Flow

```
Test Page Active
       │
       ├─→ User Action Detected
       │   ├── Tab Switch
       │   ├── Window Minimize
       │   ├── Browser Blur
       │   └── Page Leave Attempt
       │
       ├─→ Trigger Warning Dialog
       │   └─→ "Test Violation Detected"
       │
       ├─→ User Acknowledges
       │
       └─→ Auto-Submit Test
           ├── Calculate Score
           ├── Record Time
           ├── Save Submission
           └── Redirect to Success Page
```

## 🎭 State Management

```
AuthContext
├── user: { email, isAdmin } | null
├── login(email, password) → boolean
├── signup(email, password, code) → { success, message }
└── logout() → void

Local State (TestInterface)
├── currentQuestionIndex: number
├── answers: (number | null)[]
├── timeElapsed: number
├── startTime: number
├── showSubmitDialog: boolean
└── showWarningDialog: boolean

LocalStorage Persistence
├── Automatic save on state change
├── Load on component mount
└── Clear on logout
```

## 🚦 Route Guards

```
Navigation
    │
    ├─→ Check: Is user logged in?
    │   │
    │   ├─→ NO: Redirect to Login (/)
    │   └─→ YES: Continue
    │
    ├─→ Check: Is admin route?
    │   │
    │   ├─→ YES: Check if user.isAdmin
    │   │   ├─→ NO: Redirect to Login
    │   │   └─→ YES: Allow access
    │   │
    │   └─→ NO: Check if regular user
    │       ├─→ Admin user: Redirect to /admin
    │       └─→ Regular user: Allow access
    │
    └─→ Check: Test completed?
        │
        ├─→ YES: Redirect to Success
        └─→ NO: Allow test access
```

## 📱 Responsive Breakpoints

```
Mobile (< 768px)
├── Stacked layout
├── Full-width elements
├── Larger touch targets
└── Simplified navigation

Tablet (768px - 1024px)
├── Adaptive grid
├── Side-by-side where space allows
├── Medium-sized elements
└── Balanced spacing

Desktop (> 1024px)
├── Full split-screen
├── Multi-column tables
├── Hover interactions
└── Maximum content density
```

## ⏱️ Timer Behavior

```
Test Start
    │
    └─→ Record startTime = Date.now()
        │
        └─→ setInterval (1 second)
            │
            ├─→ Calculate elapsed = (now - start) / 1000
            ├─→ Format as MM:SS
            ├─→ Display in UI
            └─→ Loop until test ends
                │
                └─→ On Submit/Auto-submit
                    └─→ Record final time_taken
```

This visual guide shows the complete flow of the DEBUG THE BUG application! 🎯
