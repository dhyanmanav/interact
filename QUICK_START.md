# Quick Start Guide

## Test Credentials

### Participant Signup
- **Access Code**: `interact2026`
- Register at `/signup` with any email and password

### Admin Login
- **Email**: `dhyan@gmail.com`
- **Password**: `12345678`
- Login at `/` (main login page)

## Testing the Application

### 1. Register a Test User
1. Go to `/signup`
2. Enter email: `test@example.com`
3. Enter password: `password123`
4. Enter access code: `interact2026`
5. Click "REGISTER"
6. You'll see success message, then click "PROCEED TO LOGIN"

### 2. Take the Test
1. Login with your test credentials
2. Read the dashboard instructions
3. Click "START TEST"
4. Answer the 5 coding questions
5. Navigate using "Next" and "Previous" buttons
6. Click "Submit Test" when done
7. View your results

### 3. View Admin Dashboard
1. Logout from participant account
2. Login with admin credentials (dhyan@gmail.com / 12345678)
3. View statistics, participants, submissions, and rankings

## Features to Test

### Tab Detection
- While in the test, try switching tabs or minimizing the window
- A warning dialog should appear
- Clicking confirm will auto-submit the test

### Progress Saving
- Start the test
- Answer a few questions
- Close the browser
- Login again
- Your progress should be saved

### Submission Tracking
- Complete and submit a test
- Login as admin
- View the submission in the "Submissions" tab
- Check the rankings in the "Rankings" tab

## Data Storage

All data is stored in browser localStorage:
- `users`: Array of registered users
- `currentUser`: Currently logged-in user
- `test_{email}`: Individual test state per user
- `submissions`: Array of all test submissions

## Clearing Data

To reset everything, open browser console and run:
```javascript
localStorage.clear()
```

## Question Answers (For Testing)

All questions have the correct answer as **Option A (index 0)**:
1. Question 1: Use arr[-k:]
2. Question 2: Use lst=None and initialize inside function
3. Question 3: Cast one operand to double
4. Question 4: Replace i = i++ with i++
5. Question 5: Check val !== null && val !== undefined

Perfect score: 50 points
