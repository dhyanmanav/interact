# DEBUG THE BUG - INTERACT 2026

A competitive coding event platform with authentication, timed testing, and admin monitoring.

## Features

### Authentication System
- **Login Page**: Email and password authentication for participants and admin
- **Signup Page**: Registration with access code validation (code: `interact2026`)
- **Admin Access**: Pre-configured admin login (dhyan@gmail.com / 12345678)

### Participant Experience
- **Dashboard**: Instructions and test start interface with important warnings
- **Test Interface**: 
  - Fullscreen coding challenge with 5 bug-finding questions
  - Live timer display
  - Question navigation (Previous/Next)
  - Progress tracking
  - Tab-switch detection with auto-submit warning
  - Multiple choice answers with syntax-highlighted code
  - Auto-save progress

### Admin Dashboard
- **Statistics Overview**: Total registered, submissions, active tests, average score
- **Participants Tab**: View all registered users and their status
- **Submissions Tab**: Detailed submission data with timestamps
- **Rankings Tab**: Leaderboard sorted by score and time

### Questions
- 5 Hard-level coding questions covering:
  - Off-by-One errors
  - Mutable default arguments
  - Integer division issues
  - Infinite loops
  - Falsy value bugs
- Multiple programming languages (Python, Java, C++, JavaScript)
- 10 points per question (50 total)

## How to Use

### For Participants
1. Visit the signup page and register with access code: `interact2026`
2. Login with your credentials
3. Read the instructions carefully on the dashboard
4. Click "START TEST" to begin (timer starts immediately)
5. Answer all 5 questions
6. Submit your test (cannot re-enter after submission)

### For Admin
1. Login with: dhyan@gmail.com / 12345678
2. View live statistics and participant status
3. Monitor submissions in real-time
4. Check rankings and detailed results

## Important Rules
- **DO NOT** switch tabs or minimize window during test
- **DO NOT** navigate away from test page
- Violations result in automatic submission
- Test can only be taken once per participant

## Tech Stack
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Radix UI components
- LocalStorage for data persistence
- Lucide React for icons

## Design
- Dark theme with neon accents (cyan, electric blue)
- Futuristic hacker aesthetic
- Terminal-inspired UI elements
- Clean and minimal with high-impact visuals
- Fully responsive design
