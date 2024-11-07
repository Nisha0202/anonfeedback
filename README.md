
# AnonFeedback

AnonFeedback is a web platform designed to facilitate honest and anonymous feedback, empowering users with actionable insights for growth.

## 🚀 Features

-  Create Anonymous Profile:  Set up a unique profile to receive anonymous feedback.
-  AI-Suggested Messages:  Get AI-generated feedback suggestions to help users give constructive input.
-  AI-Powered Auto Responses: Automatically generate AI-based replies by analyzing feedback messages, providing users with relevant and instant responses.
-  Dashboard:  View all feedback, pin important messages, or delete unwanted ones.
-  Connect & Share:  Share your URL for feedback.
-  Grow & Improve:  Use feedback insights for personal and professional development.

## 🔧 Tech Stack

-  Frontend:  Next.js, React, Tailwind CSS, Shadcn
-  Backend:  Next.js
-  Database:  MongoDB
-  Deployment:  Vercel
-  Additional Libraries:  Zod, Mongoose, React Email, Resend, Axios,  Date-fns, Nodemailer, usehooks-ts
-  AI Integration:  Meta AI

## 📈 Lighthouse Scores

-  Performance:  99
-  Accessibility:  100
-  Best Practices:  100
-  SEO:  100

## 📄 Environment Variables

Create a `.env` file in the root directory and add the following variables:
```bash
MONGO_URL=your_mongodb_url
RESEND_API_KEY=your_resend_api_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL="http://localhost:3000"
GMAIL_APP=your_gmail_app_password
GMAIL=your_gmail_address
GROQ_API_KEY=your_api_key
```

## 💻 How to Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/Nisha0202/anonfeedback.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Optimizations

-  Database Connection Efficiency:  Checks if the database connection is already established to avoid redundant reconnections.
-  Debouncing Technique:  Ensures unique usernames are checked without unnecessary API calls.
-  Performance Improvements:  Limits state updates for enhanced efficiency.
-  Dynamic Imports:  Optimizes loading of components and libraries as needed.
-  SEO Optimization and meta tags:  Utilizes descriptive links to improve search engine visibility and used meta tags for engaging social media sharing.
