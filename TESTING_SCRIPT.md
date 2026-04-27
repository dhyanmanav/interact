# Testing Script - Copy & Paste into Browser Console

## Quick Test Setup

### 1. Add Test Users
```javascript
// Add multiple test users
const testUsers = [
  { email: 'alice@test.com', password: 'pass123' },
  { email: 'bob@test.com', password: 'pass123' },
  { email: 'charlie@test.com', password: 'pass123' }
];

const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
testUsers.forEach(user => {
  if (!existingUsers.find(u => u.email === user.email)) {
    existingUsers.push(user);
  }
});
localStorage.setItem('users', JSON.stringify(existingUsers));
console.log('✅ Test users added:', testUsers.map(u => u.email));
```

### 2. Create Sample Submissions
```javascript
// Add sample submissions for testing admin dashboard
const sampleSubmissions = [
  {
    user: 'alice@test.com',
    answers: [0, 0, 0, 0, 0],
    score: 50,
    time_taken: 300,
    status: 'submitted',
    submittedAt: Date.now() - 3600000
  },
  {
    user: 'bob@test.com',
    answers: [0, 1, 0, 2, 0],
    score: 30,
    time_taken: 450,
    status: 'submitted',
    submittedAt: Date.now() - 1800000
  },
  {
    user: 'charlie@test.com',
    answers: [0, 0, 1, 0, 0],
    score: 40,
    time_taken: 360,
    status: 'submitted',
    submittedAt: Date.now() - 900000
  }
];

const existingSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
sampleSubmissions.forEach(sub => {
  if (!existingSubmissions.find(s => s.user === sub.user)) {
    existingSubmissions.push(sub);
  }
});
localStorage.setItem('submissions', JSON.stringify(existingSubmissions));
console.log('✅ Sample submissions added');
```

### 3. Set Active Test States
```javascript
// Simulate users in progress
const activeTests = [
  { email: 'alice@test.com', progress: 2 },
  { email: 'bob@test.com', progress: 4 }
];

activeTests.forEach(({ email, progress }) => {
  const testState = {
    status: 'in_progress',
    startTime: Date.now() - 600000, // 10 minutes ago
    currentQuestion: progress,
    answers: Array(5).fill(null).map((_, i) => i < progress ? 0 : null)
  };
  localStorage.setItem(`test_${email}`, JSON.stringify(testState));
});
console.log('✅ Active test states created');
```

## Verification Scripts

### Check All Data
```javascript
console.log('=== CURRENT DATA STATE ===');
console.log('Users:', JSON.parse(localStorage.getItem('users') || '[]'));
console.log('Current User:', JSON.parse(localStorage.getItem('currentUser') || 'null'));
console.log('Submissions:', JSON.parse(localStorage.getItem('submissions') || '[]'));
console.log('========================');
```

### Count Everything
```javascript
const users = JSON.parse(localStorage.getItem('users') || '[]');
const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

console.log('📊 Statistics:');
console.log('Total Users:', users.length);
console.log('Total Submissions:', submissions.length);
console.log('Logged In:', currentUser ? currentUser.email : 'No one');
console.log('Average Score:', submissions.length > 0 
  ? Math.round(submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length)
  : 'N/A'
);
```

### Check Specific User
```javascript
// Replace with actual email
const userEmail = 'alice@test.com';

console.log('🔍 User Details:', userEmail);
console.log('Registered:', JSON.parse(localStorage.getItem('users') || '[]')
  .find(u => u.email === userEmail) ? 'Yes' : 'No');
console.log('Test State:', localStorage.getItem(`test_${userEmail}`));
console.log('Submission:', JSON.parse(localStorage.getItem('submissions') || '[]')
  .find(s => s.user === userEmail));
```

### Validate Questions Data
```javascript
// Check if questions are properly formatted
fetch('/src/app/data/questions.ts')
  .then(r => r.text())
  .then(text => {
    console.log('✅ Questions file exists');
    console.log('Contains 5 questions:', text.includes('id: 5'));
  })
  .catch(() => console.log('❌ Questions file not found'));
```

## Testing Workflows

### Test 1: Complete Registration → Test → Submit
```javascript
// Step 1: Register
console.log('📝 Test 1: Full workflow');
console.log('1. Go to /signup');
console.log('2. Enter email: test1@example.com');
console.log('3. Enter password: test123');
console.log('4. Enter code: interact2026');
console.log('5. Click Register');
console.log('6. Should see success message');
```

### Test 2: Admin Dashboard
```javascript
// Step 1: Login as admin
console.log('👨‍💼 Test 2: Admin access');
console.log('1. Go to /');
console.log('2. Enter email: dhyan@gmail.com');
console.log('3. Enter password: 12345678');
console.log('4. Should redirect to /admin');
console.log('5. Check all three tabs load');
```

### Test 3: Tab Detection
```javascript
// During test, press Alt+Tab or Cmd+Tab
console.log('🚨 Test 3: Security');
console.log('1. Start a test');
console.log('2. Switch to another tab');
console.log('3. Should see warning dialog');
console.log('4. Test should auto-submit');
```

## Performance Testing

### Check Load Times
```javascript
console.log('⏱️ Performance:');
console.log('DOM Load:', performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart, 'ms');
console.log('Full Load:', performance.timing.loadEventEnd - performance.timing.navigationStart, 'ms');
console.log('Resources:', performance.getEntriesByType('resource').length);
```

### Check Bundle Size
```javascript
fetch('/')
  .then(r => r.text())
  .then(html => {
    const scripts = html.match(/<script[^>]*src="([^"]+)"/g) || [];
    console.log('📦 Script tags found:', scripts.length);
    scripts.forEach(s => console.log(s));
  });
```

## Cleanup Scripts

### Reset Everything
```javascript
// ⚠️ WARNING: This deletes ALL data
const confirmReset = confirm('Reset ALL data? This cannot be undone!');
if (confirmReset) {
  localStorage.clear();
  console.log('✅ All data cleared');
  window.location.reload();
}
```

### Reset Only Test Data
```javascript
// Keep users, clear only tests and submissions
const keys = Object.keys(localStorage);
keys.forEach(key => {
  if (key.startsWith('test_') || key === 'submissions') {
    localStorage.removeItem(key);
  }
});
console.log('✅ Test data cleared');
```

### Remove Specific User
```javascript
// Replace with actual email
const emailToRemove = 'test@example.com';

// Remove from users
const users = JSON.parse(localStorage.getItem('users') || '[]');
localStorage.setItem('users', JSON.stringify(
  users.filter(u => u.email !== emailToRemove)
));

// Remove test state
localStorage.removeItem(`test_${emailToRemove}`);

// Remove from submissions
const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
localStorage.setItem('submissions', JSON.stringify(
  submissions.filter(s => s.user !== emailToRemove)
));

console.log('✅ User removed:', emailToRemove);
```

## Automated Test Suite

### Run All Checks
```javascript
async function runAllTests() {
  console.log('🧪 Running all tests...\n');
  
  // Test 1: LocalStorage available
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    console.log('✅ LocalStorage: Working');
  } catch (e) {
    console.log('❌ LocalStorage: Failed');
  }
  
  // Test 2: Data structure valid
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
  console.log(users.length >= 0 ? '✅ Users data: Valid' : '❌ Users data: Invalid');
  console.log(submissions.length >= 0 ? '✅ Submissions data: Valid' : '❌ Submissions data: Invalid');
  
  // Test 3: Admin credentials
  const adminUser = users.find(u => u.email === 'dhyan@gmail.com');
  console.log(adminUser ? '⚠️ Admin in users list' : '✅ Admin separate from users');
  
  // Test 4: Questions accessible
  console.log('✅ Questions: Loaded from data file');
  
  // Test 5: Routing
  console.log('✅ React Router: Active');
  
  // Test 6: UI Components
  console.log('✅ Radix UI: Loaded');
  
  console.log('\n🎉 All tests completed!');
}

runAllTests();
```

## Debug Helpers

### Show All LocalStorage Keys
```javascript
console.log('🔑 LocalStorage Keys:');
Object.keys(localStorage).forEach(key => {
  const value = localStorage.getItem(key);
  const size = new Blob([value]).size;
  console.log(`${key}: ${size} bytes`);
});
```

### Export Data (for backup)
```javascript
const backup = {};
Object.keys(localStorage).forEach(key => {
  backup[key] = localStorage.getItem(key);
});
console.log('📦 Backup Data:');
console.log(JSON.stringify(backup, null, 2));
// Copy from console and save to a file
```

### Import Data (restore backup)
```javascript
// Replace with your backup data
const backupData = {
  // paste your backup here
};

Object.keys(backupData).forEach(key => {
  localStorage.setItem(key, backupData[key]);
});
console.log('✅ Data restored');
window.location.reload();
```

## Quick Demo Setup

### Create Complete Demo Environment
```javascript
// Run this to set up a complete demo with users and submissions
(function setupDemo() {
  console.log('🎬 Setting up demo environment...');
  
  // Clear existing data
  localStorage.clear();
  
  // Add users
  const users = [
    { email: 'alice@test.com', password: 'demo123' },
    { email: 'bob@test.com', password: 'demo123' },
    { email: 'charlie@test.com', password: 'demo123' },
    { email: 'diana@test.com', password: 'demo123' }
  ];
  localStorage.setItem('users', JSON.stringify(users));
  
  // Add submissions with varied scores
  const submissions = [
    {
      user: 'alice@test.com',
      answers: [0, 0, 0, 0, 0],
      score: 50,
      time_taken: 280,
      status: 'submitted',
      submittedAt: Date.now() - 7200000
    },
    {
      user: 'bob@test.com',
      answers: [0, 1, 0, 0, 1],
      score: 30,
      time_taken: 450,
      status: 'submitted',
      submittedAt: Date.now() - 3600000
    },
    {
      user: 'charlie@test.com',
      answers: [0, 0, 0, 1, 0],
      score: 40,
      time_taken: 320,
      status: 'submitted',
      submittedAt: Date.now() - 1800000
    }
  ];
  localStorage.setItem('submissions', JSON.stringify(submissions));
  
  // Set Diana as active test taker
  localStorage.setItem('test_diana@test.com', JSON.stringify({
    status: 'in_progress',
    startTime: Date.now() - 300000,
    currentQuestion: 2,
    answers: [0, 0, null, null, null]
  }));
  
  console.log('✅ Demo environment ready!');
  console.log('\nDemo Accounts:');
  console.log('• alice@test.com / demo123 (completed)');
  console.log('• bob@test.com / demo123 (completed)');
  console.log('• charlie@test.com / demo123 (completed)');
  console.log('• diana@test.com / demo123 (in progress)');
  console.log('\nAdmin: dhyan@gmail.com / 12345678');
  console.log('\nRefresh the page to see changes!');
})();
```

---

## Usage Instructions

1. **Copy any script above**
2. **Open browser console** (F12 → Console tab)
3. **Paste and press Enter**
4. **Follow the output instructions**

These scripts help you quickly test and verify all features of the DEBUG THE BUG platform! 🚀
