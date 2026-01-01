# Pennywise

A money and budgeting app designed specifically for students to help them manage their finances, track spending, and build healthy savings habits.

## Project Overview

**Pennywise** is a web application built with Next.js that addresses the financial challenges faced by students. The app helps users track their income and expenses, categorize spending, set savings goals, and provides clear, student-friendly financial insights through AI-powered features.

### Target Users

This app is designed for **students** who struggle with:
- Managing money on a limited budget
- Saving consistently
- Understanding where their money goes
- Building healthy financial habits

## Problem Summary (CCC.1.1)

Students face significant challenges when it comes to managing money. Many enter college or start their careers with limited financial experience, often juggling part-time jobs, student loans, and living expenses. The problem manifests in several ways:

- **Lack of visibility**: Students often don't know where their money is going, leading to overspending
- **No budgeting habits**: Without tools to track expenses, students can't set realistic spending limits
- **Difficulty saving**: Without clear goals and progress tracking, saving money feels impossible
- **Overwhelming complexity**: Many existing financial tools are too complex or intimidating for beginners

**Why this problem is difficult to solve:**
- Financial literacy education is limited in most curricula
- Students have varying income sources (jobs, allowances, loans) that are hard to track
- Budgeting requires consistent habit-building, which is challenging for busy students
- Existing solutions often lack student-specific features or are too expensive

**What happens if not solved:**
- Students accumulate debt without realizing it
- Stress from financial uncertainty affects academic performance
- Poor financial habits established early can have long-term consequences
- Missed opportunities to build wealth through early saving

**Real-world example:**
A college student receives $500 from their part-time job each month but ends up with nothing saved at the end of the semester. Without tracking, they can't identify that $200/month goes to unplanned food delivery, $100 to subscriptions they forgot about, and the rest to miscellaneous expenses. By the time they realize their spending patterns, they're already behind on savings goals.

## Features

### Core Features (✅ Implemented)

- ✅ **Income & Expense Tracking**: Add and categorize all financial transactions
- ✅ **Spending Categories**: Organize expenses by category (Food, Transportation, Entertainment, etc.)
- ✅ **Savings Goals**: Set and monitor progress toward specific financial goals
- ✅ **Financial Insights**: View spending trends and patterns through visual dashboards (Recharts)
- ✅ **Transaction Management**: Add, view, filter, and delete transactions
- ✅ **User Authentication**: Login and registration with role-based access control
- ✅ **Protected Routes**: Coach/Instructor-only pages (Rubric Evidence, Reflection)

### AI Integration Features

**Current Implementation**: Enhanced AI service with multiple fallback options
- ✅ **Smart Expense Categorization**: 
  - OpenAI API integration (if OPENAI_API_KEY is set)
  - Google Gemini API integration (if GEMINI_API_KEY is set)
  - Keyword matching fallback (always available)
- ✅ **Spending Insights**: Analyzes spending patterns and provides personalized recommendations
- ✅ **Savings Analysis**: Calculates spending rates and identifies savings opportunities
- ✅ **API Route**: `/api/ai/categorize` for server-side AI categorization

**Future Enhancements**:
- 🔜 **Predictive Budgeting**: ML-based budget suggestions
- 🔜 **Anomaly Detection**: Flags unusual spending patterns
- 🔜 **Personalized Financial Advice**: Context-aware recommendations

## Tech Stack

### Current Implementation
- **Framework**: Next.js 14+ (Pages Router)
- **Language**: TypeScript/JavaScript
- **Authentication**: React Context API with localStorage (NextAuth.js in progress)
- **Role-Based Access Control (RBA)**: ✅ Implemented - Protected routes for coaches/instructors
- **Data Storage**: ✅ PostgreSQL with Prisma ORM (Database schema created and migrated)
- **API Routes**: ✅ RESTful API endpoints for transactions and goals
- **AI Integration**: ✅ Enhanced AI service with OpenAI/Gemini support + keyword fallback
- **UI/UX**: Tailwind CSS, shadcn/ui components
- **State Management**: React Context API
- **Data Visualization**: Recharts
- **Deployment**: Vercel-ready

### Recent Enhancements (✅ Completed)
- ✅ PostgreSQL database schema with Prisma ORM
- ✅ Database migrations applied (User, Transaction, Goal tables)
- ✅ RESTful API routes for transactions (GET, POST, PUT, DELETE)
- ✅ RESTful API routes for goals (GET, POST, PUT, DELETE)
- ✅ Enhanced AI categorization service (OpenAI/Gemini/keyword fallback)
- ✅ Input validation with Zod schemas
- ✅ User data isolation and security

### Future Enhancements (In Progress)
- 🔄 NextAuth.js integration with database-backed authentication
- 🔄 Frontend migration from localStorage to API routes
- 🔄 Password hashing with bcrypt
- 🔄 Advanced AI features (predictive budgeting, anomaly detection)

## How to Run the Project

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

**Required**:
- PostgreSQL database (Neon, Supabase, or local PostgreSQL)
  - Get free database at: https://neon.tech or https://supabase.com

**Optional**:
- API keys for AI services (OpenAI/Gemini) - for enhanced AI categorization
  - Without API keys, keyword matching is used (still works!)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Pennywise
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   # Database (Required for database features)
   DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
   
   # NextAuth (Required for authentication)
   NEXTAUTH_SECRET="generate-a-random-secret-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # AI Services (Optional - enhances categorization)
   # Choose ONE:
   OPENAI_API_KEY="sk-your_openai_key"
   # OR
   GEMINI_API_KEY="your_gemini_key"
   
   # Environment
   NODE_ENV=development
   ```

   **Getting a Database:**
   - **Neon** (Recommended, free tier): https://neon.tech
   - **Supabase** (Free tier): https://supabase.com
   - **Local PostgreSQL**: Install and create database locally

   **Generating NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Set up the database**
   
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # (Optional) Test database connection
   npx tsx scripts/test-db.ts
   ```
   
   This creates all necessary tables (User, Transaction, Goal) in your database.

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

   The app will work with database-backed storage and API routes!

### Coach/Instructor Login Credentials

For testing role-based access control:

- **rob@launchpadphilly.org** → Password: `lpuser1`
- **sanaa@launchpadphilly.org** → Password: `lpuser2`
- **taheera@launchpadphilly.org** → Password: `lpuser3`

These accounts have access to protected pages (Rubric Evidence and Reflection pages).

**Note**: Database authentication is set up. NextAuth.js integration is in progress to replace the current localStorage-based auth system.

## Deployment to Vercel

This project is configured and ready to deploy on Vercel. Follow these steps:

### Prerequisites

1. **Database**: Set up a PostgreSQL database (Neon, Supabase, or any PostgreSQL provider)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have an account

### Deployment Steps

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   
   In the Vercel project settings, add these environment variables:
   
   **Required:**
   - `DATABASE_URL` - Your PostgreSQL connection string
     ```
     postgresql://user:password@host:port/database?schema=public
     ```
   - `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
   - `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)
   
   **Optional (for AI features):**
   - `OPENAI_API_KEY` - Your OpenAI API key (or)
   - `GEMINI_API_KEY` - Your Google Gemini API key
   
   - `NODE_ENV` - Set to `production`

4. **Run Database Migrations**
   
   After deployment, you need to run Prisma migrations on your production database:
   ```bash
   # Connect to your production database and run:
   npx prisma migrate deploy
   ```
   
   Or use Vercel's CLI:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

5. **Deploy**
   - Click "Deploy" in Vercel
   - Vercel will automatically:
     - Run `npm install` (which triggers `postinstall` to generate Prisma client)
     - Run `npm run build` (which includes Prisma generation)
     - Deploy your application

### Build Configuration

The project includes a `vercel.json` file with optimal settings:
- Automatic Prisma client generation via `postinstall` script
- Build command includes Prisma generation
- Framework detection for Next.js

### Post-Deployment Checklist

- [ ] Verify environment variables are set correctly
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Test the application at your Vercel URL
- [ ] Verify database connections work
- [ ] Test authentication flows
- [ ] Check API routes are functioning

### Troubleshooting

**Build fails with Prisma errors:**
- Ensure `DATABASE_URL` is set in Vercel environment variables
- Check that Prisma migrations are in the repository (not ignored in `.gitignore`)

**Database connection errors:**
- Verify `DATABASE_URL` is correct
- Ensure your database allows connections from Vercel's IP addresses
- For Neon/Supabase, check connection pooling settings

**API routes not working:**
- Check serverless function logs in Vercel dashboard
- Verify environment variables are available at runtime

## Folder Structure

```
Pennywise/
├── pages/                  # Next.js Pages Router
│   ├── _app.jsx          # Root app component with providers
│   ├── index.jsx         # Home page (/)
│   ├── login.jsx         # Login page
│   ├── signup.jsx       # Registration page
│   ├── product.jsx      # Main dashboard (budgeting app)
│   ├── about.jsx         # About page
│   ├── features.jsx      # Features page
│   ├── why-pennywise.jsx # Why Pennywise page
│   ├── settings.jsx      # User settings
│   ├── rubric-evidence.jsx # Protected: Coach/Instructor only
│   ├── reflection.jsx    # Protected: Coach/Instructor only
│   ├── access-denied.jsx # Access denied page
│   └── api/              # API Routes
│       ├── ai/
│       │   └── categorize.ts # AI categorization endpoint
│       ├── transactions/
│       │   ├── index.ts    # GET, POST transactions
│       │   └── [id].ts     # GET, PUT, DELETE single transaction
│       └── goals/
│           ├── index.ts    # GET, POST goals
│           └── [id].ts     # GET, PUT, DELETE single goal
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components (buttons, cards, etc.)
│   ├── Navigation.jsx    # Main navigation component
│   ├── Footer.jsx        # Footer component
│   ├── AddTransactionModal.jsx
│   ├── AddGoalModal.jsx
│   ├── TransactionList.jsx
│   ├── SavingsGoals.jsx
│   ├── InsightsCharts.jsx
│   └── AIInsights.tsx
├── context/               # React Context providers
│   ├── AuthContext.jsx   # Authentication state (localStorage-based)
│   └── AccessibilityContext.jsx # Accessibility settings
├── lib/                   # Utility libraries
│   ├── prisma.ts         # Prisma client singleton
│   ├── ai-service.ts     # AI categorization service
│   └── api-helpers.ts    # API request helpers
├── prisma/                # Database schema and migrations
│   ├── schema.prisma     # Prisma schema definition
│   └── migrations/       # Database migration files
├── scripts/               # Utility scripts
│   └── test-db.ts        # Database connection test script
├── styles/                # Global styles
│   └── globals.css       # Tailwind CSS and global styles
├── .env.local            # Environment variables (DATABASE_URL, API keys, etc.)
└── README.md             # This file
```

**Note**: This project uses Next.js Pages Router (not App Router). All routes are defined in the `pages/` directory.

## API Documentation

### Transactions API

- `GET /api/transactions` - Get all transactions for authenticated user
- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions/[id]` - Get a single transaction
- `PUT /api/transactions/[id]` - Update a transaction
- `DELETE /api/transactions/[id]` - Delete a transaction

### Goals API

- `GET /api/goals` - Get all goals for authenticated user
- `POST /api/goals` - Create a new goal
- `GET /api/goals/[id]` - Get a single goal
- `PUT /api/goals/[id]` - Update a goal
- `DELETE /api/goals/[id]` - Delete a goal

### AI API

- `POST /api/ai/categorize` - Categorize a transaction using AI
  - Body: `{ "description": "...", "merchant": "..." }`
  - Returns: `{ "category": "...", "method": "openai" | "gemini" | "keyword" }`

All API routes require `x-user-id` header (temporary until NextAuth.js is implemented).

## Database Schema

- **User**: id, email (unique), password, name, role, timestamps
- **Transaction**: id, type, amount, category, description, merchant, date, userId, timestamps
- **Goal**: id, name, targetAmount, currentAmount, deadline, userId, timestamps

All tables include proper indexes and foreign key relationships.

## Reflection

### What Went Well

_To be completed after project implementation_

### What Didn't Go Well

_To be completed after project implementation_

### What Changed During the Project and Why

_To be completed after project implementation_

### What Would Be Built Next

_To be completed after project implementation_

## Contribution Guidelines

This is a student project for educational purposes. Contributions and feedback are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure code follows existing style conventions and includes appropriate documentation.

## License

This project is created for educational purposes as part of the LaunchPad curriculum.

## Acknowledgments

- Built as part of LaunchPad Philadelphia's web development program
- Special thanks to coaches and instructors for guidance and feedback
