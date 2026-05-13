# Firebase Storage CORS Configuration

This document explains how to fix CORS (Cross-Origin Resource Sharing) issues with Firebase Storage.

## The Problem

CORS errors occur when your web application tries to access resources from a different domain than the one serving your application. In this case, your application is trying to access files from Firebase Storage, but the browser is blocking these requests due to security restrictions.

Error message example:
```
Access to XMLHttpRequest at 'https://firebasestorage.googleapis.com/...' from origin 'http://localhost:5173' has been blocked by CORS policy
```

## The Solution

1. **Update CORS Configuration**: The `firebase-cors.json` file in this project contains the CORS configuration for your Firebase Storage bucket. It specifies which domains are allowed to access your storage.

2. **Apply the Configuration**: Run the `apply-firebase-cors.bat` script (Windows) to apply the CORS settings to your Firebase Storage bucket.

3. **Prerequisites**:
   - Firebase CLI installed: `npm install -g firebase-tools`
   - Logged in to Firebase: `firebase login`
   - Proper permissions to modify your Firebase project

## Manual Application

If you prefer to apply the settings manually:

```bash
# Install Firebase CLI and Google Cloud SDK if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Login to Google Cloud (may be required)
gcloud auth login

# Apply CORS configuration
gcloud storage buckets update gs://marocadszone-2298a.appspot.com --cors-file=firebase-cors.json
```

## Troubleshooting

- **Changes not taking effect**: CORS changes may take a few minutes to propagate. Try clearing your browser cache or using incognito mode.
- **Still seeing errors**: Make sure all domains your application runs on are included in the `origin` array in `firebase-cors.json`.
- **Permission issues**: Ensure you're logged in with an account that has proper permissions to modify the Firebase project.

## Current Configuration

The current configuration allows access from:
- http://localhost:5173
- http://127.0.0.1:5173
- http://127.0.0.1:8000
- https://marocadszone.com
- https://www.marocadszone.com
- https://app.marocadszone.com
- https://app.doctoma.com

If you need to add more domains, update the `firebase-cors.json` file and reapply the configuration.