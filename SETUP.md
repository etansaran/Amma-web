# Siva Sri Thiyaneswar Amma Ashram — Setup Guide

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (free tier works)
- Razorpay account (for payments)
- Cloudinary account (for images)

---

## 1. Install Dependencies

```bash
cd "Amma Website"
npm install
```

---

## 2. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/amma-ashram
JWT_SECRET=your-very-long-random-secret-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin credentials (used by seed script)
ADMIN_EMAIL=admin@ammaashram.org
ADMIN_PASSWORD=YourSecurePassword123!

# Razorpay (get from razorpay.com dashboard)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx

# Cloudinary (get from cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# YouTube Live Stream ID (the video/stream ID from YouTube URL)
NEXT_PUBLIC_YOUTUBE_LIVE_ID=your_youtube_stream_id
```

---

## 3. Seed Database (Create Admin User)

```bash
npx tsx scripts/seed.ts
```

This creates the admin user with the email/password from your `.env.local`.

---

## 4. Run Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

Admin Panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 5. Project Structure

```
amma-ashram/
├── app/
│   ├── (main)/           # Public website pages
│   │   ├── page.tsx      # Home page
│   │   ├── about/
│   │   ├── services/
│   │   ├── annadhanam/
│   │   ├── events/
│   │   ├── blog/
│   │   ├── appointment/
│   │   ├── donate/
│   │   ├── live-darshan/
│   │   ├── virtual-seva/
│   │   └── contact/
│   ├── admin/            # Admin dashboard
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── blogs/
│   │   ├── donations/
│   │   ├── appointments/
│   │   └── messages/
│   └── api/              # API routes
│       ├── auth/
│       ├── events/
│       ├── blogs/
│       ├── donations/
│       ├── appointments/
│       └── contact/
├── components/
│   ├── home/             # Home page sections
│   ├── layout/           # Navbar, Footer
│   ├── ui/               # Reusable components
│   └── forms/            # Form fields
├── lib/                  # Utilities (DB, auth, cloudinary)
├── models/               # MongoDB schemas
├── utils/                # Helper functions
└── scripts/              # Seed scripts
```

---

## 6. Deploy to Vercel

### a. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Amma Ashram website"
git remote add origin https://github.com/yourusername/amma-ashram.git
git push -u origin main
```

### b. Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **New Project** → Import from GitHub
3. Select your repository
4. Set all environment variables from `.env.local`
5. Click **Deploy**

### c. Production Razorpay
- Switch from test keys (`rzp_test_`) to live keys (`rzp_live_`)
- Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in Vercel env vars

### d. Custom Domain
- In Vercel dashboard → Settings → Domains
- Add your domain (e.g., `ammaashram.org`)
- Update DNS records at your domain registrar

---

## 7. Adding Real Content

### Replace Placeholder Images
- Upload Amma's photo to Cloudinary
- Update image URLs in component files
- The admin panel supports image upload via Cloudinary

### Live YouTube Stream
- Create a YouTube live stream
- Copy the video/stream ID from the URL
- Set `NEXT_PUBLIC_YOUTUBE_LIVE_ID` in your env vars

### Payment Testing
- Use Razorpay test card: `4111 1111 1111 1111`
- CVV: Any 3 digits, expiry: any future date
- OTP: `1234`

---

## 8. Key Features

| Feature | Status | Notes |
|---------|--------|-------|
| Home page | ✅ | All sections |
| About Amma | ✅ | Timeline, mission |
| Services | ✅ | Thiyanam, Yogam, Annadhanam, Satsang |
| Annadhanam page | ✅ | Donation categories |
| Events | ✅ | List, detail, registration |
| Blog/Teachings | ✅ | List, detail pages |
| Appointment booking | ✅ | Form → DB |
| Donation system | ✅ | Razorpay + multi-currency UI |
| Live Darshan | ✅ | YouTube embed |
| Virtual Seva | ✅ | Seva booking |
| Contact page | ✅ | Form + maps |
| Admin login | ✅ | JWT auth |
| Admin events | ✅ | CRUD |
| Admin blogs | ✅ | CRUD |
| Admin donations | ✅ | View only |
| Admin appointments | ✅ | Status management |
| Admin messages | ✅ | View contact messages |

---

## 9. Customization

### Colors
Edit `tailwind.config.ts` — all brand colors are defined there.

### Content
Most content is inline in component files — simply update the text/arrays to match real content.

### Fonts
Currently using Google Fonts: Cinzel, Raleway, Noto Sans Devanagari.
Change in `app/layout.tsx`.

---

## Support

For issues or questions, contact the development team.

*Jai Arunachala 🙏*
