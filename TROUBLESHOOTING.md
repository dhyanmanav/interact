# Troubleshooting Guide

## Common Issues & Solutions

### Cannot Login

**Problem**: Login fails even with correct credentials

**Solutions**:
1. Check if you registered with the access code `interact2026`
2. Verify email and password match exactly (case-sensitive)
3. For admin access, use: `dhyan@gmail.com` / `12345678`
4. Clear localStorage and try again: `localStorage.clear()`

### Test Progress Lost

**Problem**: Test progress disappears after refresh

**Solutions**:
1. Check if you're logged in with the same email
2. Don't clear browser cache during test
3. Stay in the same browser/device
4. Check localStorage: `localStorage.getItem('test_yourmail@example.com')`

### Cannot Submit Test

**Problem**: Submit button not working

**Solutions**:
1. Ensure you've answered at least one question
2. Check if test is already submitted
3. Try refreshing and continuing test
4. Check browser console for errors

### Admin Dashboard Empty

**Problem**: Admin sees no data

**Solutions**:
1. Verify you're logged in as admin (`dhyan@gmail.com`)
2. Check if any users have registered
3. Check if any tests have been submitted
4. Verify localStorage data: `localStorage.getItem('submissions')`
5. Wait for auto-refresh (5 seconds)

### Tab Switch Warning Appears Unexpectedly

**Problem**: Warning shows without switching tabs

**Solutions**:
1. This is intentional for security
2. Don't switch windows or apps during test
3. Keep test window focused
4. Disable desktop notifications during test

### Page Not Found (404)

**Problem**: Getting 404 error

**Solutions**:
1. Check URL is correct
2. Routes available:
   - `/` - Login
   - `/signup` - Signup
   - `/dashboard` - Participant dashboard
   - `/test` - Test interface
   - `/success` - Submission success
   - `/admin` - Admin dashboard

### Cannot Register

**Problem**: Signup fails

**Solutions**:
1. Verify access code is exactly: `interact2026`
2. Check if email is already registered
3. Use a different email
4. Clear localStorage and try again

### Timer Not Working

**Problem**: Timer doesn't update

**Solutions**:
1. Refresh the page
2. Check browser console for errors
3. Ensure JavaScript is enabled
4. Try a different browser

### Questions Not Displaying

**Problem**: Test interface shows no questions

**Solutions**:
1. Check if you've started the test from dashboard
2. Verify you're logged in
3. Check browser console for errors
4. Clear cache and reload

### Logout Doesn't Work

**Problem**: Cannot logout

**Solutions**:
1. Clear localStorage manually: `localStorage.removeItem('currentUser')`
2. Close browser and reopen
3. Navigate directly to login: `/`

## Data Reset

### Reset All Data
```javascript
localStorage.clear();
location.reload();
```

### Reset Only Your Test
```javascript
localStorage.removeItem('test_yourmail@example.com');
location.reload();
```

### Reset Only Submissions
```javascript
localStorage.removeItem('submissions');
location.reload();
```

### View All Data
```javascript
console.log('Users:', localStorage.getItem('users'));
console.log('Current User:', localStorage.getItem('currentUser'));
console.log('Submissions:', localStorage.getItem('submissions'));
```

## Browser Compatibility

### Recommended Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Not Recommended
- ❌ Internet Explorer (any version)
- ❌ Very old mobile browsers

## Performance Issues

### Slow Loading

**Solutions**:
1. Clear browser cache
2. Close unnecessary tabs
3. Check internet connection
4. Disable browser extensions
5. Use incognito/private mode

### UI Not Responsive

**Solutions**:
1. Check browser zoom level (should be 100%)
2. Refresh the page
3. Try different screen orientation (mobile)
4. Check for browser console errors

## Security Warnings

### "Test Violation Detected"

This is **intentional behavior** when:
- You switch to another tab
- You minimize the window
- You switch to another app
- You open dev tools
- Browser loses focus

**Action**: The test will auto-submit. This is by design to prevent cheating.

## Development Issues

### Build Errors

**Solutions**:
1. Run `pnpm install` or `npm install`
2. Check Node.js version (should be 16+)
3. Clear node_modules and reinstall
4. Check for TypeScript errors

### Import Errors

**Solutions**:
1. Verify all files exist in correct locations
2. Check import paths are correct
3. Ensure file extensions are .tsx for React files
4. Check case sensitivity in imports

## Still Having Issues?

### Debug Steps:
1. Open browser console (F12)
2. Check for error messages
3. Look at Network tab for failed requests
4. Check Application tab → Local Storage
5. Copy error message for debugging

### Quick Diagnostic:
```javascript
// Run in browser console
console.log('=== DEBUG INFO ===');
console.log('Current User:', JSON.parse(localStorage.getItem('currentUser') || 'null'));
console.log('Users Count:', JSON.parse(localStorage.getItem('users') || '[]').length);
console.log('Submissions Count:', JSON.parse(localStorage.getItem('submissions') || '[]').length);
console.log('==================');
```

## Known Limitations

1. **Data is browser-specific**: Switching browsers loses data
2. **No backend**: All data stored locally
3. **No recovery**: Clearing localStorage loses all data
4. **Single device**: Cannot continue test on different device
5. **No analytics**: Historical data not preserved

## Best Practices

### For Participants:
- ✅ Use stable internet connection
- ✅ Use latest browser version
- ✅ Close unnecessary tabs
- ✅ Disable notifications
- ✅ Have sufficient screen space
- ✅ Test browser beforehand

### For Admins:
- ✅ Keep admin tab open for live updates
- ✅ Refresh periodically if needed
- ✅ Export data if needed (manual screenshot)
- ✅ Monitor during event hours
- ✅ Have backup admin account

## Contact Information

For critical issues during the event:
- Check the Quick Start guide
- Review the Features documentation
- Consult this troubleshooting guide
- Contact event organizers (INTERACT 2026)
