@echo off
echo ===== Firebase Storage CORS Configuration =====
echo This script will apply CORS settings to your Firebase Storage bucket

echo.
echo Make sure you have:
echo 1. Firebase CLI installed (npm install -g firebase-tools)
echo 2. Logged in to Firebase (firebase login)
echo.

echo Applying CORS configuration from firebase-cors.json...
gcloud storage buckets update gs://marocadszone-2298a.appspot.com --cors-file=firebase-cors.json

echo.
echo If successful, your Firebase Storage bucket should now accept requests from the configured domains.
echo You may need to wait a few minutes for the changes to propagate.
echo.
echo Done!
pause