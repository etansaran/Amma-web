# Android Admin App

This repo now includes an Android-only admin app wrapper in:

`/android-admin`

## What it does

- Opens the live admin dashboard only
- Starts at `/admin/login`
- Keeps cookies/session for admin login
- Supports file picker uploads from the WebView
- Supports back navigation inside the dashboard
- Includes a branded admin header and connection status
- Handles external links in the device browser instead of trapping everything in WebView
- Shows a cleaner offline/retry state for mobile admins

## Current live URL used

The Android app points to:

`https://amma-9w736keuk-etansarans-projects.vercel.app`

Login screen inside the app:

`https://amma-9w736keuk-etansarans-projects.vercel.app/admin/login`

If your production URL changes, update this line in:

`android-admin/app/build.gradle.kts`

```kotlin
buildConfigField("String", "ADMIN_BASE_URL", "\"https://your-domain.com\"")
```

## How to build APK

1. Open Android Studio
2. Choose `Open`
3. Select the folder:

`/Users/karthick/Documents/Amma Website/android-admin`

4. Let Gradle sync
5. Click:
   `Build` -> `Build Bundle(s) / APK(s)` -> `Build APK(s)`

APK output is usually under:

`android-admin/app/build/outputs/apk/debug/app-debug.apk`

## Good fit for this version

This is best when you want:

- admin login
- dashboard management
- orders, products, appointments, donations, messages
- simple phone access without building a full native app

## Notes

- This is an admin-only wrapper, not the public site app
- It depends on your hosted admin dashboard being online
- For Play Store release later, we should still add:
  - splash screen
  - domain allowlist rules
  - notification support
  - biometric app lock
