# KidSport Recruitment and Volunteering Management System (KRVMS)

KRVMS is a full-stack volunteer management system built with **Next.js 13**, **TypeScript**, **Prisma**, and **PostgreSQL**. It helps streamline the application, screening, and onboarding of volunteers for community events.

## 🔗 Live Demo

👉 [View KRVMS on Vercel](https://krvms-bfhwozjun-kngjms15s-projects.vercel.app)


---

## 🚀 Features

- 📝 Volunteer application form with validation
- 🔍 Filter and sort applicants dynamically
- 👥 Accept applicants into volunteer roles
- ✅ Confirmation modals and alerts
- 📊 Admin dashboard with live updates
- 🔐 Login view for future authentication
- 🌐 Deployed via Vercel

---

## 🛠 Tech Stack

| Category       | Technology                           |
|----------------|---------------------------------------|
| Framework      | Next.js 13 (App Router)               |
| Language       | TypeScript                            |
| Styling        | Tailwind CSS                          |
| Validation     | React Hook Form + Zod                 |
| Database       | PostgreSQL with Prisma ORM            |
| Testing        | Jest (basic setup included)           |
| Deployment     | Vercel                                |

---

## 📦 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/KRVMS.git
cd KRVMS

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Add your PostgreSQL database URL to the .env file

# 4. Generate Prisma client
npx prisma generate

# 5. Run database migrations
npx prisma migrate dev --name init

# 6. Start the development server
npm run dev

```
## 📁 Folder Structure
```
KRVMS/
├── app/
│   ├── api/                        # API routes
│   ├── assets/                     # Static images and resources
│   ├── components/                 # Reusable UI components
│   ├── createNewVolunteer/        # Volunteer creation workflow
│   ├── dashboard/                 # Admin dashboard views
│   ├── login/                     # Login page
│   ├── VolunteerApplicationForm/  # Application intake form
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Entry point
│   └── provinceChapters.json      # Static chapter data
├── prisma/                         # Prisma schema and migration logic
├── public/                         # Public/static assets
├── .env                            # Environment variables
├── tailwind.config.ts              # Tailwind CSS config
├── jest.config.js / jest.setup.js # Jest testing setup
├── next.config.mjs                 # Next.js config
├── package.json                    # Project metadata and scripts
├── README.md                       # Project documentation
└── .vercel/                        # Vercel deployment metadata
```
## 🧪 Testing

```bash

npm run test
```

## 🪪 License

This project was created for educational purposes. For reuse, modifications, or contributions please contact author.

## 🍾 Acknowledgements

Developed for a capstone project at SAIT
Built by: Savanna, Theo, James
Software Development Students at SAIT
