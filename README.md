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

**Current Implementation**: Basic rule-based AI using keyword matching
- ✅ **Smart Expense Categorization**: Suggests categories based on transaction description and merchant keywords
- ✅ **Spending Insights**: Analyzes spending patterns and provides personalized recommendations
- ✅ **Savings Analysis**: Calculates spending rates and identifies savings opportunities

**Future Enhancements** (OpenAI/Gemini API ready):
- 🔜 **Advanced AI Categorization**: Natural language processing for better accuracy
- 🔜 **Predictive Budgeting**: ML-based budget suggestions
- 🔜 **Anomaly Detection**: Flags unusual spending patterns
- 🔜 **Personalized Financial Advice**: Context-aware recommendations

## Tech Stack

### Current Implementation
- **Framework**: Next.js 14+ (Pages Router)
- **Language**: TypeScript
- **Authentication**: React Context API with localStorage (NextAuth.js planned for future)
- **Role-Based Access Control (RBA)**: ✅ Implemented - Protected routes for coaches/instructors
- **Data Storage**: localStorage (PostgreSQL/Prisma planned for future)
- **AI Integration**: OpenAI API / Google Gemini API (configured, ready for use)
- **UI/UX**: Tailwind CSS, shadcn/ui components
- **State Management**: React Context API
- **Data Visualization**: Recharts
- **Deployment**: Vercel-ready

### Future Enhancements (Planned)
- NextAuth.js integration with database-backed authentication
- PostgreSQL database with Prisma ORM
- Server-side data persistence
- Enhanced security with password hashing

## How to Run the Project

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

**Optional (for future enhancements)**:
- PostgreSQL database (for future database integration)
- API keys for AI services (OpenAI/Gemini) - for AI-powered features

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

3. **Set up environment variables (Optional for MVP)**
   
   Currently, the app uses localStorage for data storage and authentication. For future database integration, create a `.env.local` file:
   ```env
   # AI Services (Optional - for AI features)
   OPENAI_API_KEY=your_openai_key
   # OR
   GEMINI_API_KEY=your_gemini_key
   
   # Database (Future - not currently required)
   # DATABASE_URL=your_postgresql_connection_string
   
   # NextAuth (Future - not currently required)
   # NEXTAUTH_SECRET=your_secret_key
   # NEXTAUTH_URL=http://localhost:3000
   
   # Environment
   NODE_ENV=development
   ```

   **Note**: The MVP version works without environment variables. All data is stored in browser localStorage.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

   The app will work immediately with localStorage-based authentication. No database setup required for MVP!

### Coach/Instructor Login Credentials

For testing role-based access control:

- **rob@launchpadphilly.org** → Password: `lpuser1`
- **sanaa@launchpadphilly.org** → Password: `lpuser2`
- **taheera@launchpadphilly.org** → Password: `lpuser3`

These accounts have access to protected pages (Rubric Evidence and Reflection pages).

**Note**: Currently using localStorage-based authentication for MVP. Passwords are stored in plain text in the browser (not secure for production). NextAuth.js with database authentication is planned for future implementation.

## Folder Structure

```
Pennywise/
├── pages/                  # Next.js Pages Router
│   ├── _app.tsx          # Root app component with providers
│   ├── index.tsx         # Home page (/)
│   ├── login.tsx         # Login page
│   ├── signup.tsx        # Registration page
│   ├── product.tsx       # Main dashboard (budgeting app)
│   ├── about.tsx         # About page
│   ├── features.tsx      # Features page
│   ├── why-pennywise.tsx # Why Pennywise page
│   ├── settings.tsx      # User settings
│   ├── rubric-evidence.tsx # Protected: Coach/Instructor only
│   ├── reflection.tsx    # Protected: Coach/Instructor only
│   └── access-denied.tsx # Access denied page
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components (buttons, cards, etc.)
│   ├── Navigation.tsx    # Main navigation component
│   ├── Footer.tsx        # Footer component
│   ├── AddTransactionModal.tsx
│   ├── AddGoalModal.tsx
│   ├── TransactionList.tsx
│   ├── SavingsGoals.tsx
│   ├── InsightsCharts.tsx
│   └── AIInsights.tsx
├── context/               # React Context providers
│   ├── AuthContext.tsx   # Authentication state (localStorage-based)
│   └── AccessibilityContext.tsx # Accessibility settings
├── styles/                # Global styles
│   └── globals.css       # Tailwind CSS and global styles
├── .env.local            # Environment variables (optional for MVP)
└── README.md             # This file
```

**Note**: This project uses Next.js Pages Router (not App Router). All routes are defined in the `pages/` directory.

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
