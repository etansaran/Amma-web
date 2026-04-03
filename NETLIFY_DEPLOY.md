# Netlify Deploy Guide

This project is ready to deploy on Netlify as a Next.js app.

## What Netlify should use

- Base directory: leave empty
- Build command: `npm run build`
- Publish directory: leave empty so Netlify can detect Next.js automatically
- Node version: `20`

If Netlify asks whether this is a Next.js project, choose **Next.js**.

## Environment variables to add in Netlify

Add these in **Site configuration -> Environment variables**.

### Required for the app

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRY=7d
NEXT_PUBLIC_APP_URL=https://your-site-name.netlify.app
NEXT_PUBLIC_SITE_NAME=Siva Sri Thiyaneswar Amma Ashram
NEXT_PUBLIC_YOUTUBE_LIVE_ID=your_youtube_video_or_stream_id
```

### Required for admin login seed

```env
ADMIN_EMAIL=admin@ammaashram.org
ADMIN_PASSWORD=YourSecurePassword123!
```

### Required for donations

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

### Required for image upload

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Optional

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
```

## Before first login

This app needs an admin user in MongoDB.

Run this locally once after you create `.env.local`:

```bash
npx tsx scripts/seed.ts
```

Use the same `ADMIN_EMAIL` and `ADMIN_PASSWORD` values in Netlify.

## Deploy steps

1. Push this project to GitHub.
2. In Netlify, choose **Add new site** -> **Import an existing project**.
3. Connect your GitHub repository.
4. Confirm the detected framework is **Next.js**.
5. Add all environment variables listed above.
6. Deploy the site.

## Important notes

- The public pages can load without MongoDB, but admin and form APIs need `MONGODB_URI`.
- Donations need valid Razorpay keys or the payment order API will fail.
- Admin image uploads need valid Cloudinary keys.
- The build uses Google Fonts through `next/font`. Netlify normally handles this fine during build.
