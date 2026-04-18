# Backend API Integration Guide

## Environment Configuration

Create a `.env` file in the root directory with the following:

```env
VITE_API_URL=http://localhost:5000/api
# or for production
VITE_API_URL=https://your-backend-domain.com/api
```

## Updated API Service

The `src/services/api.js` file now provides:
- `authAPI.getUserProfileByMobileNo(mobileno)` - Authenticates user by phone number

## Updated Login Flow

1. User enters 10-digit phone number
2. Clicks "Next"
3. Backend API is called with the phone number
4. Response contains:
   - `token` - JWT token for authentication
   - `data` - User profile information
   - `isNewUser` - Boolean indicating if user is new
5. Token and user data are stored in localStorage
6. User is redirected based on whether they're new or existing

## Next Steps

1. **Update vite.config.js** to load environment variables from .env file
2. **Complete ProfilePage** for new user onboarding
3. **Update API_BASE_URL** - Modify the `.env` file with your backend URL
4. **Add Redux integration** - Optionally dispatch user data to Redux store
5. **Add error handling** - Customize error messages and UI feedback
6. **Implement Protected Routes** - Check for authToken in route guards

## Key Changes Made

- ✅ Removed Firebase authentication from Login component
- ✅ Replaced with backend API call
- ✅ Added error state and display
- ✅ Token stored in localStorage
- ✅ Created reusable API service with axios
- ✅ Proper request/response handling
