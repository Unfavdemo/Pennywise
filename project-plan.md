# Pennywise Project Plan

This document outlines the project plan in a Trello-style format for managing the development of the Pennywise Money & Budgeting App.

## Project Board Structure

### Lists

1. **Backlog** - Features and tasks to be done later
2. **In Progress** - Currently active work items
3. **Blocked** - Tasks waiting on dependencies or issues
4. **Done** - Completed tasks

---

## Backlog

### Card: Advanced Analytics Features
**Description**: Implement advanced reporting and analytics features beyond MVP scope
**Start Date**: TBD
**End Date**: TBD
**Checklist**:
- [ ] Multi-month trend analysis
- [ ] Export functionality (CSV/PDF)
- [ ] Custom date range reports
- [ ] Category comparison charts

### Card: Mobile App Version
**Description**: Create native mobile app versions (iOS/Android) using React Native
**Start Date**: TBD
**End Date**: TBD
**Checklist**:
- [ ] Research React Native setup
- [ ] Design mobile-first UI components
- [ ] Implement push notifications
- [ ] App store submission preparation

### Card: Social Features
**Description**: Add ability to share goals and achievements (optional social features)
**Start Date**: TBD
**End Date**: TBD
**Checklist**:
- [ ] User profile pages
- [ ] Achievement badges system
- [ ] Goal sharing functionality
- [ ] Privacy controls

---

## In Progress

_Currently no items in progress. Check Backlog for next tasks to start._

---

## Blocked

_No blocked items currently._

---

## Done

### Card: Project Planning & Setup
**Description**: Initial project planning, repository setup, and documentation structure
**Start Date**: 2024-12-28
**End Date**: 2024-12-29
**Checklist**:
- [x] Create project repository
- [x] Set up README.md structure
- [x] Create project plan document
- [x] Design wireframes
- [x] Define tech stack

---

## Product Planning

### Card: Problem Research & User Stories
**Description**: Research student financial challenges and create user stories for core features
**Start Date**: 2024-12-28
**End Date**: 2024-12-30
**Checklist**:
- [ ] Interview 3-5 students about money management challenges
- [ ] Document user personas
- [ ] Write user stories for MVP features
- [ ] Define acceptance criteria for each story
- [ ] Prioritize features by importance

### Card: Competitive Analysis
**Description**: Research existing budgeting apps and identify differentiation opportunities
**Start Date**: 2024-12-29
**End Date**: 2024-12-31
**Checklist**:
- [ ] List 5-7 existing budgeting apps
- [ ] Document what works well in each
- [ ] Identify gaps for student users
- [ ] Define unique value proposition
- [ ] Document in About page (Page 2)

---

## UX/UI Design

### Card: Wireframe Creation
**Description**: Create low-fidelity wireframes for all 7 required pages
**Start Date**: 2024-12-28
**End Date**: 2024-12-30
**Checklist**:
- [ ] Page 1 - Home wireframe
- [ ] Page 2 - About wireframe
- [ ] Page 3 - Why Pennywise? wireframe
- [ ] Page 4 - Features wireframe
- [ ] Page 5 - Product (MVP) wireframe
- [ ] Page 6 - Rubric Evidence wireframe
- [ ] Page 7 - Reflection wireframe
- [ ] Upload wireframes to Figma/Canva
- [ ] Link wireframes in repository

### Card: Design System Setup
**Description**: Establish color palette, typography, and component library
**Start Date**: 2024-12-30
**End Date**: 2025-01-02
**Checklist**:
- [ ] Define color scheme (student-friendly, approachable)
- [ ] Select typography (fonts for web)
- [ ] Set up Tailwind CSS configuration
- [ ] Create component library documentation
- [ ] Design reusable UI components (buttons, cards, forms)

### Card: User Flow Documentation
**Description**: Document navigation flows and user journeys
**Start Date**: 2024-12-30
**End Date**: 2025-01-01
**Checklist**:
- [ ] Map user journey from landing to first transaction
- [ ] Document authentication flow
- [ ] Document RBA protection flow (Pages 6 & 7)
- [ ] Create navigation structure diagram
- [ ] Define error states and edge cases

---

## Authentication Setup

### Card: NextAuth.js Configuration
**Due Date**: Jan 2, 11:59 PM

**Description**

**Process & Design Notes:** Authentication is foundational to the app - users need secure access to their personal financial data. Initially, we considered simple session-based auth, but NextAuth.js provides industry-standard security features out of the box (password hashing, CSRF protection, secure cookies). The design evolved from a single login form to separate login and registration pages to improve UX clarity. We decided on email/password authentication (rather than social OAuth) because it's simpler for an MVP and gives us full control over user accounts, especially for the required coach/instructor accounts with role-based access. The database schema needed to store not just email and password hash, but also a role field to distinguish between regular users and coaches/instructors. The login form design prioritizes simplicity and clear error messaging - students shouldn't struggle with authentication. We also considered password reset functionality but deferred it to post-MVP to keep scope manageable.

**Acceptance Criteria:**
- User can register a new account with email and password
- User can log in with valid email and password credentials
- User cannot log in with incorrect credentials (error message shown)
- Password is securely hashed before storage (never stored in plain text)
- User session persists across page refreshes
- User can log out and session is properly terminated
- Protected routes redirect unauthenticated users to login page
- Authentication state is accessible throughout the application
- Login and registration forms validate input (email format, password strength)

**Checklist:**
- [ ] Research NextAuth.js setup for Next.js App Router
- [ ] Install NextAuth.js and required dependencies (`next-auth`, `@auth/prisma-adapter` or database adapter)
- [ ] Set up database schema for users table (id, email, password_hash, role, created_at, updated_at)
- [ ] Create database migration file for users table
- [ ] Run database migration to create users table
- [ ] Create NextAuth configuration file (lib/auth.ts or app/api/auth/[...nextauth]/route.ts)
- [ ] Configure CredentialsProvider for email/password authentication
- [ ] Set up password hashing (using bcrypt or Argon2)
- [ ] Create user registration function (hash password, save to database)
- [ ] Create user login verification function (check email, verify password hash)
- [ ] Configure NextAuth session strategy (JWT or database sessions)
- [ ] Set up NEXTAUTH_SECRET and NEXTAUTH_URL environment variables
- [ ] Create login page UI component (app/(auth)/login/page.tsx)
- [ ] Design login form with email and password input fields
- [ ] Add "Forgot password?" link (can be placeholder for now)
- [ ] Add "Don't have an account? Sign up" link to registration page
- [ ] Create registration page UI component (app/(auth)/register/page.tsx)
- [ ] Design registration form with email, password, and confirm password fields
- [ ] Add client-side form validation (email format, password match, password strength)
- [ ] Implement registration form submission handler
- [ ] Implement login form submission handler
- [ ] Add error message display for authentication failures
- [ ] Add success feedback after successful registration
- [ ] Create authentication middleware to protect routes
- [ ] Set up session provider wrapper for client components
- [ ] Test registration flow: fill form → submit → verify user created in database
- [ ] Test login flow: enter credentials → submit → verify session created
- [ ] Test logout functionality: click logout → verify session cleared
- [ ] Test protected route access: try accessing dashboard without login → verify redirect
- [ ] Test session persistence: login → refresh page → verify still logged in

### Card: Coach/Instructor Account Setup
**Description**: Create seed data for coach/instructor accounts with RBA
**Start Date**: 2025-01-02
**End Date**: 2025-01-02
**Checklist**:
- [ ] Add database seed script
- [ ] Create rob@launchpadphilly.org account (password: lpuser1)
- [ ] Create sanaa@launchpadphilly.org account (password: lpuser2)
- [ ] Create taheera@launchpadphilly.org account (password: lpuser3)
- [ ] Assign "coach" or "instructor" role to these accounts
- [ ] Test login with each account

### Card: Role-Based Access Control (RBA)
**Due Date**: Jan 3, 11:59 PM

**Description**

**Process & Design Notes:** RBA is a critical requirement for the assignment - Pages 6 (Rubric Evidence) and 7 (Reflection) must only be accessible to coaches and instructors. This requirement evolved from a simple authentication check to a full role-based system. We considered multiple approaches: checking roles in each page component, creating a reusable middleware function, or using Next.js middleware at the route level. The design settled on a combination: a utility function to check user roles that can be called in page components, plus Next.js middleware for route-level protection. This provides both developer convenience and security. The "Access Denied" page design needed to be clear but not intimidating - it should explain why access is restricted without revealing sensitive information. We also needed to ensure that the role check happens server-side to prevent client-side tampering. The user experience for unauthorized access should be graceful - redirect or show friendly error, not a blank page or server error.

**Acceptance Criteria:**
- Page 6 (Rubric Evidence) is only accessible to users with "coach" or "instructor" role
- Page 7 (Reflection) is only accessible to users with "coach" or "instructor" role
- Regular users (without coach/instructor role) are redirected to "Access Denied" page when attempting to access Pages 6 or 7
- Unauthenticated users are redirected to login page before role check
- Coach/instructor accounts (rob@, sanaa@, taheera@) can successfully access Pages 6 and 7
- Role checking happens server-side (cannot be bypassed by client-side manipulation)
- "Access Denied" page clearly explains why access is restricted
- Navigation menu conditionally shows/hides links to Pages 6 & 7 based on user role

**Checklist:**
- [ ] Review NextAuth session structure to understand how to access user role
- [ ] Create RBA utility function to check if user has coach/instructor role (lib/rbac.ts)
- [ ] Implement role check function that accepts session object and returns boolean
- [ ] Design and create "Access Denied" page component (app/access-denied/page.tsx)
- [ ] Add clear messaging explaining access restriction
- [ ] Add navigation back to dashboard or home page from Access Denied page
- [ ] Create server-side role check wrapper for page components
- [ ] Protect Page 6 route (app/rubric-evidence/page.tsx) with role check
- [ ] Add redirect logic: if user doesn't have role → redirect to Access Denied
- [ ] Protect Page 7 route (app/reflection/page.tsx) with role check
- [ ] Add redirect logic: if user doesn't have role → redirect to Access Denied
- [ ] Update navigation component to conditionally show Pages 6 & 7 links based on role
- [ ] Test RBA with regular user account: try accessing Page 6 → verify redirect to Access Denied
- [ ] Test RBA with regular user account: try accessing Page 7 → verify redirect to Access Denied
- [ ] Test RBA with rob@launchpadphilly.org account: verify can access Page 6
- [ ] Test RBA with rob@launchpadphilly.org account: verify can access Page 7
- [ ] Test RBA with sanaa@launchpadphilly.org account: verify can access both protected pages
- [ ] Test RBA with taheera@launchpadphilly.org account: verify can access both protected pages
- [ ] Test RBA with unauthenticated user: verify redirect to login page first
- [ ] Verify role check cannot be bypassed by manipulating client-side code

---

## Page Development

### Card: Page 1 - Home
**Due Date**: Jan 2, 11:59 PM

**Description**

**Process & Design Notes:** The home page is the first impression users have of Pennywise. The design evolved from a simple landing page to a conversion-focused entry point that clearly communicates value and guides users to the main application. Initial concepts were too cluttered - we simplified to focus on a strong hero message, clear value proposition, and prominent call-to-action. The "who will benefit" section helps users immediately identify if the app is for them (targeting students specifically). The navigation needed to be comprehensive but not overwhelming, balancing access to informational pages (About, Features) with the primary action (Start Budgeting → Page 5). Mobile responsiveness was considered from the start, with the hero section and CTA button sized appropriately for touch interactions.

**Acceptance Criteria:**
- Page clearly explains what Pennywise is and who it's for
- Hero section has compelling headline and tagline
- "Who will benefit" section identifies target users (students)
- Prominent CTA button links to Page 5 (Product/Main App)
- Navigation bar includes links to all pages (Home, About, Why Pennywise?, Features, Product)
- Navigation works correctly on all pages
- Page is fully responsive (mobile, tablet, desktop)
- Page loads quickly and navigation is smooth

**Checklist:**
- [ ] Design hero section wireframe with app name "Pennywise" and tagline
- [ ] Write compelling headline (e.g., "Take Control of Your Money, Student Style")
- [ ] Write tagline/subheadline that explains value proposition
- [ ] Create hero section component with text and visual elements
- [ ] Design "Who Will Benefit" section with bullet points or cards
- [ ] Write content for "who will benefit" (target: students with specific needs)
- [ ] Create "Who Will Benefit" section component
- [ ] Design large, prominent CTA button ("Start Budgeting" or "Try Pennywise")
- [ ] Implement CTA button with link to Page 5 (/product or /dashboard)
- [ ] Create navigation bar component with logo/brand name
- [ ] Add navigation links: Home, About, Why Pennywise?, Features, Product
- [ ] Add conditional "Login" button (if not authenticated) or user menu (if authenticated)
- [ ] Implement navigation routing using Next.js Link components
- [ ] Add active state styling to current page in navigation
- [ ] Create footer component with additional links (optional)
- [ ] Style page with appropriate colors, typography, and spacing
- [ ] Make hero section responsive (adjust text size, image placement on mobile)
- [ ] Make navigation responsive (hamburger menu on mobile or bottom nav)
- [ ] Test page load time and performance
- [ ] Test all navigation links work correctly
- [ ] Test responsive design on multiple screen sizes (320px, 768px, 1024px+)

### Card: Page 2 - About (Problem Page)
**Due Date**: Jan 3, 11:59 PM

**Description**

**Process & Design Notes:** This page is critical for demonstrating CCC.1.1 (Understanding the Problem) and requires deep reflection on the student financial management challenge. The content writing process started with research - talking to students, reading articles about student debt, and examining existing budgeting apps. The page design evolved from a simple problem statement to a comprehensive exploration that shows true understanding. We structured it to cover: what the problem is (in accessible language), how it manifests in real life (with concrete examples), why it's hard to solve (acknowledging constraints), and what happens if ignored (consequences). The personal example requirement pushed us to create a realistic, relatable scenario rather than generic statements. Researching existing solutions helped identify gaps and informed our solution approach. The page design balances text content with visual breaks (cards, sections) to maintain readability.

**Acceptance Criteria:**
- Page clearly explains the student money management problem in the student's own words
- Page demonstrates understanding of how the problem appears in real life with specific examples
- Page explains why solving this problem is challenging (constraints identified)
- Page describes consequences if the problem is not solved
- Page includes at least one detailed, realistic personal example or case study
- Page documents at least one existing solution with analysis of what worked and what didn't
- Page is well-organized with clear sections and readable formatting
- Page content aligns with what's written in README Problem Summary section

**Checklist:**
- [ ] Research student financial challenges (articles, surveys, interviews if possible)
- [ ] Write problem statement section explaining the core issue in own words
- [ ] Create "How This Shows Up in Real Life" section with 3-4 concrete examples
- [ ] Write "Why It's Difficult to Solve" section identifying constraints:
  - [ ] Time constraints (students are busy)
  - [ ] Technical constraints (limited financial education)
  - [ ] Skill constraints (habits are hard to build)
  - [ ] Resource constraints (existing tools may be expensive/complex)
- [ ] Write "Consequences" section explaining impact if problem isn't solved
- [ ] Create detailed personal/realistic example (student story or case study):
  - [ ] Specific scenario (e.g., "Sarah, a college freshman...")
  - [ ] Concrete numbers and details
  - [ ] Shows problem in action
  - [ ] Relatable to target audience
- [ ] Research at least one existing budgeting app (Mint, YNAB, PocketGuard, etc.)
- [ ] Document existing solution section:
  - [ ] Name the app/solution
  - [ ] List what works well (3-4 points)
  - [ ] List what doesn't work or gaps (3-4 points)
  - [ ] Explain why it doesn't fully solve the problem for students
- [ ] Create page component structure (app/about/page.tsx)
- [ ] Organize content into cards or sections for visual hierarchy
- [ ] Style page with appropriate typography and spacing
- [ ] Make page responsive for mobile devices
- [ ] Add navigation links (back to Home, forward to Page 3)
- [ ] Review content for clarity and grammar
- [ ] Verify content matches README Problem Summary section

### Card: Page 3 - Why Pennywise?
**Description**: Show solution planning (CCC.1.2 evidence)
**Start Date**: 2025-01-03
**End Date**: 2025-01-04
**Checklist**:
- [ ] Explain solution idea and why it works
- [ ] List all app features (core + AI)
- [ ] Document expected challenges
- [ ] Explain how challenges will be handled
- [ ] Add link to project plan (this document)
- [ ] Include summary of project plan/sprints

### Card: Page 4 - Features
**Description**: Showcase core features and AI integration
**Start Date**: 2025-01-03
**End Date**: 2025-01-04
**Checklist**:
- [ ] Demonstrate working core features (or show mockups)
- [ ] Explain differentiation from other apps
- [ ] Highlight AI integration features prominently
- [ ] Show how AI solves user problems
- [ ] Add interactive demos or screenshots
- [ ] Link to Page 5 for full product experience

### Card: Page 5 - Product (MVP)
**Due Date**: Jan 3, 11:59 PM

**Description**

**Process & Design Notes:** This card represents the core MVP functionality that demonstrates CCC.1.3 (Building a Working App). The initial concept was a simple transaction tracker, but it evolved into a comprehensive dashboard that provides real value to students. The design journey started with basic input/output - a form to add transactions and a list to view them. However, to truly help students, we needed to add context: categories for understanding spending patterns, visualizations for quick insights, and savings goals for motivation. The dashboard approach emerged from recognizing that students need to see their financial picture at a glance, not just raw transaction data. The form design evolved from a single input field to a structured form with transaction type (income/expense), amount, category, date, and description. We considered adding merchant name field specifically to enable AI-powered categorization, which became a key differentiator. The transaction list started as a simple table but needed filtering, sorting, and category color-coding for usability. The savings goals feature was added after realizing that tracking expenses alone isn't enough - students need forward-looking goals. This wireframe and implementation represents the transition from a basic CRUD app to a realistic, student-focused financial management tool.

**Acceptance Criteria:**
- User can successfully add a new transaction (income or expense) through the form
- Transaction data persists to database and appears immediately in the transaction list
- User can filter transactions by type (income/expense), category, and date range
- User can view spending breakdown by category (chart visualization)
- User can create, edit, and track progress toward savings goals
- Dashboard displays current balance, monthly income/expenses, and key metrics
- All form fields validate input before submission (amount must be positive, required fields)
- Success and error feedback is shown to user after form submission
- Page is responsive and usable on mobile devices (320px+ width)

**Checklist:**
- [ ] Design dashboard wireframe layout (header, stats cards, transaction list, goals section, charts)
- [ ] Create dashboard component structure (app/dashboard/page.tsx)
- [ ] Design "Add Transaction" form wireframe (transaction type, amount, category, date, description, merchant)
- [ ] Build Add Transaction form component with all input fields
- [ ] Implement transaction type toggle/radio buttons (Income/Expense)
- [ ] Add amount input field with number validation
- [ ] Create category dropdown/select component
- [ ] Add date picker component (defaults to today)
- [ ] Add description text input field
- [ ] Add merchant/store name input field (for AI categorization)
- [ ] Connect form to POST /api/transactions endpoint
- [ ] Add client-side form validation (required fields, amount > 0, date format)
- [ ] Implement form submission handler with error handling
- [ ] Create transaction list component to display all user transactions
- [ ] Build transaction list item component (date, description, category, amount, actions)
- [ ] Add category color coding to transaction list items
- [ ] Implement filter controls (All/Income/Expenses, by Category, by Date Range)
- [ ] Connect transaction list to GET /api/transactions endpoint
- [ ] Add loading states during data fetch
- [ ] Create empty state component for when no transactions exist
- [ ] Build savings goals section component
- [ ] Create goal card component with progress bar visualization
- [ ] Implement "Add New Goal" form/modal
- [ ] Connect goals to GET /api/goals and POST /api/goals endpoints
- [ ] Calculate and display goal progress percentages
- [ ] Install and configure charting library (Recharts or Chart.js)
- [ ] Create spending by category pie chart component
- [ ] Create monthly trend line chart component
- [ ] Connect charts to transaction data from API
- [ ] Build dashboard header with balance overview cards
- [ ] Calculate and display current balance (total income - total expenses)
- [ ] Calculate and display monthly income and expense totals
- [ ] Add quick stats cards (total saved, goals progress summary)
- [ ] Ensure all data persists correctly to database
- [ ] Test complete user flow: add transaction → view in list → see updated charts → create goal → track progress
- [ ] Make dashboard responsive for mobile devices
- [ ] Add error handling for API failures
- [ ] Test form validation edge cases (negative amounts, missing required fields, invalid dates)

### Card: Page 6 - Rubric Evidence (RBA Protected)
**Description**: Map CCC competencies to project artifacts
**Start Date**: 2025-01-04
**End Date**: 2025-01-04
**Checklist**:
- [ ] List CCC.1.1 clearly with description
- [ ] Add "Where to see it" for CCC.1.1 (About page + README)
- [ ] Add links/buttons to exact proof locations
- [ ] List CCC.1.2 clearly with description
- [ ] Add "Where to see it" for CCC.1.2 (wireframes, Why Pennywise page)
- [ ] Add links/buttons to exact proof locations
- [ ] List CCC.1.3 clearly with description
- [ ] Add "Where to see it" for CCC.1.3 (Page 5 - working product)
- [ ] Add links/buttons to exact proof locations
- [ ] Ensure page is RBA protected (coaches/instructors only)
- [ ] Test access control

### Card: Page 7 - Reflection (RBA Protected)
**Description**: Document project journey and learnings
**Start Date**: 2025-01-04
**End Date**: 2025-01-04
**Checklist**:
- [ ] Write "What went well" section
- [ ] Write "What didn't go well" section
- [ ] Document "What changed during project and why"
- [ ] Write "What you'd build next if had more time"
- [ ] Ensure page is RBA protected (coaches/instructors only)
- [ ] Test access control

---

## AI Integration

### Card: AI Expense Categorization
**Due Date**: Jan 3, 11:59 PM

**Description**

**Process & Design Notes:** This AI feature is a key differentiator that sets Pennywise apart from basic budgeting apps. The initial idea was simple - use AI to categorize transactions based on merchant names. However, the design evolved to handle more complex scenarios: transactions with vague descriptions, multiple possible categories, and user preferences for category names. We considered using OpenAI's GPT models or Google's Gemini API - both can understand natural language and context. The prompt engineering became crucial - we needed to give the AI context about common student spending categories and return structured, consistent results. The UX design needed to show AI "thinking" (loading state) but also allow users to override suggestions if the AI is wrong. We added a merchant name field specifically to improve AI accuracy, since "Starbucks" is easier to categorize than "POS Purchase". The integration into the Add Transaction form needed to be non-intrusive - an optional "AI Categorize" button that enhances the experience without being required.

**Acceptance Criteria:**
- User can click "AI Categorize" button in Add Transaction form to get category suggestion
- AI analyzes transaction description and/or merchant name to suggest appropriate category
- Category suggestion appears in the category dropdown/field (user can accept or change)
- AI categorization request shows loading indicator while processing
- User can manually override AI suggestion at any time
- If AI categorization fails (API error), user can still manually select category
- AI categorizations are reasonably accurate (matches user's intent 80%+ of the time)
- Common merchant names (Starbucks, Amazon, Target, etc.) are correctly categorized
- Vague descriptions still receive reasonable category suggestions

**Checklist:**
- [ ] Research OpenAI API vs Gemini API for categorization task (cost, speed, accuracy)
- [ ] Choose AI provider and obtain API key
- [ ] Add API key to environment variables (.env.local)
- [ ] Design prompt template for transaction categorization
- [ ] Define list of available categories for AI to choose from
- [ ] Create prompt that includes: transaction description, merchant name, available categories, example categorizations
- [ ] Test prompt with sample transactions in AI provider's playground/interface
- [ ] Refine prompt based on test results for better accuracy
- [ ] Create API route for AI categorization (app/api/ai/categorize/route.ts)
- [ ] Implement POST handler that accepts transaction description and merchant name
- [ ] Add API key authentication to route
- [ ] Call AI provider API with crafted prompt
- [ ] Parse AI response to extract category suggestion
- [ ] Handle API errors gracefully (network issues, rate limits, invalid responses)
- [ ] Return JSON response with suggested category or error message
- [ ] Add "AI Categorize" button to Add Transaction form component
- [ ] Implement button click handler that calls categorization API
- [ ] Add loading state/spinner while AI request is processing
- [ ] Update category dropdown/field with AI suggestion when received
- [ ] Allow user to change category after AI suggestion (manual override)
- [ ] Add error handling: if AI fails, show message but don't block form submission
- [ ] Test categorization with common merchant names (Starbucks → "Food & Dining", Amazon → "Shopping")
- [ ] Test categorization with vague descriptions ("POS Purchase" → reasonable category)
- [ ] Test categorization with clear descriptions ("Grocery store" → "Food & Groceries")
- [ ] Test error handling: invalid API key, network failure, API timeout
- [ ] Measure categorization accuracy with 20+ test transactions

### Card: Predictive Budgeting
**Description**: AI suggests realistic budgets based on spending history
**Start Date**: 2025-01-02
**End Date**: 2025-01-03
**Checklist**:
- [ ] Analyze user spending patterns
- [ ] Create AI prompt for budget suggestions
- [ ] Build budget recommendation feature
- [ ] Display suggestions in UI
- [ ] Allow users to accept/modify suggestions

### Card: Smart Spending Insights
**Due Date**: Jan 4, 11:59 PM

**Description**

**Process & Design Notes:** Smart insights transform raw transaction data into actionable advice. This feature started as simple statistics but evolved into AI-powered personalized recommendations. The challenge was making insights meaningful and not generic - AI needed context about the user's spending patterns, goals, and student lifestyle. The prompt engineering required careful consideration: include spending history, category breakdowns, trends over time, and goal progress. Insights should be encouraging (positive reinforcement) but also highlight opportunities for improvement. The UI design needed to make insights stand out on the dashboard without being overwhelming - using cards or highlighted sections. We considered different types of insights: spending trends, category comparisons, savings opportunities, and goal-related encouragement.

**Acceptance Criteria:**
- AI analyzes user's spending data and generates personalized insights
- Insights appear prominently on Page 5 (Product/Dashboard)
- Insights are relevant and actionable (not generic)
- Insights highlight both positive patterns and improvement opportunities
- Insights are written in friendly, student-appropriate language
- System collects sufficient data before generating insights (minimum transaction threshold)
- Insights update as new transaction data is added
- Insights component handles cases where insufficient data exists

**Checklist:**
- [ ] Design insights data structure (what data points to collect: total spending, category breakdown, trends, goal progress)
- [ ] Create function to aggregate spending data for analysis (lib/insights-analyzer.ts)
- [ ] Calculate key metrics: monthly spending, category percentages, spending trends, budget vs actual
- [ ] Design AI prompt template for insights generation
- [ ] Include context in prompt: spending history, categories, trends, goals, student context
- [ ] Define types of insights to generate (spending trends, savings opportunities, category alerts, goal encouragement)
- [ ] Test prompt with sample data in AI provider playground
- [ ] Refine prompt for more relevant and specific insights
- [ ] Create API route for insights generation (app/api/ai/insights/route.ts)
- [ ] Implement handler that collects user spending data, calls AI API, returns insights
- [ ] Handle edge cases: new users with no data, users with limited transaction history
- [ ] Create insights display component (components/insights/InsightsCard.tsx)
- [ ] Design insights card UI (heading, insight text, icon/visual indicator)
- [ ] Support multiple insights displayed in a list or grid
- [ ] Add visual styling to make insights stand out (color coding, icons)
- [ ] Integrate insights component into Page 5 dashboard
- [ ] Position insights prominently (top of dashboard or dedicated section)
- [ ] Add loading state while insights are being generated
- [ ] Add refresh button to regenerate insights with latest data
- [ ] Test insights generation with various spending patterns:
  - [ ] High food spending → suggest meal prep or budget adjustment
  - [ ] Consistent savings → positive reinforcement message
  - [ ] Spike in spending → anomaly alert
  - [ ] Goal progress → encouragement message
- [ ] Verify insights are student-friendly (avoid overly formal financial jargon)
- [ ] Test insights update when new transactions are added

### Card: Anomaly Detection
**Description**: Flag unusual transactions or spending patterns
**Start Date**: 2025-01-03
**End Date**: 2025-01-04
**Checklist**:
- [ ] Define "anomaly" criteria (spending spikes, unusual categories)
- [ ] Build detection algorithm/API call
- [ ] Create alert system for anomalies
- [ ] Display warnings in UI
- [ ] Test with sample data

---

## Backend / Data Modeling

### Card: Database Schema Design
**Due Date**: Jan 2, 11:59 PM

**Description**

**Process & Design Notes:** The database schema is the foundation of the entire application. The initial design started with just transactions and users, but evolved as we identified all the features needed. The schema design process involved mapping each feature (transactions, categories, goals, authentication) to database tables and relationships. We considered using an ORM (Prisma, Drizzle) versus raw SQL - Prisma was chosen for its type safety and excellent Next.js integration. The users table needed a role field from the start to support RBA. The transactions table design considered whether to store category as a string or foreign key - we chose foreign key for data integrity and to allow custom user categories. The categories table supports both default categories and user-created custom categories (via user_id being nullable). The savings_goals table tracks both target and current amounts to calculate progress. Indexes were planned for foreign keys and frequently queried fields (user_id, date) to ensure good performance as data grows.

**Acceptance Criteria:**
- All required tables are created with correct column types and constraints
- Foreign key relationships enforce data integrity (cannot delete user with transactions)
- Database supports multiple users with isolated data (transactions tied to user_id)
- Database supports role-based access (users table has role field)
- Database schema allows for future expansion (considering potential new features)
- All tables have proper indexes for query performance
- Database migrations can be run to set up schema from scratch
- Database schema matches application requirements (transactions, categories, goals, users)

**Checklist:**
- [ ] Choose database solution (PostgreSQL via Supabase, Neon, or local)
- [ ] Set up database connection string and add to environment variables
- [ ] Choose ORM or database client (Prisma recommended for Next.js)
- [ ] Install Prisma (or chosen ORM) and initialize schema file
- [ ] Design users table schema:
  - [ ] id (UUID or auto-increment integer, primary key)
  - [ ] email (string, unique, required, indexed)
  - [ ] password_hash (string, required)
  - [ ] role (enum: 'user' | 'coach' | 'instructor', default 'user')
  - [ ] created_at (timestamp, default now)
  - [ ] updated_at (timestamp, default now, auto-update)
- [ ] Design transactions table schema:
  - [ ] id (UUID or auto-increment integer, primary key)
  - [ ] user_id (foreign key to users.id, required, indexed)
  - [ ] amount (decimal/numeric, required, positive)
  - [ ] category_id (foreign key to categories.id, required)
  - [ ] type (enum: 'income' | 'expense', required)
  - [ ] date (date, required, indexed)
  - [ ] description (text, optional)
  - [ ] merchant (string, optional, for AI categorization)
  - [ ] created_at (timestamp, default now)
- [ ] Design categories table schema:
  - [ ] id (UUID or auto-increment integer, primary key)
  - [ ] name (string, required)
  - [ ] user_id (foreign key to users.id, nullable - null = default category)
  - [ ] color (string, hex color code, required)
  - [ ] icon (string, optional, icon name)
  - [ ] created_at (timestamp, default now)
  - [ ] Unique constraint on (name, user_id) to prevent duplicates
- [ ] Design savings_goals table schema:
  - [ ] id (UUID or auto-increment integer, primary key)
  - [ ] user_id (foreign key to users.id, required, indexed)
  - [ ] name (string, required)
  - [ ] target_amount (decimal/numeric, required, positive)
  - [ ] current_amount (decimal/numeric, default 0)
  - [ ] deadline (date, optional)
  - [ ] created_at (timestamp, default now)
  - [ ] updated_at (timestamp, default now, auto-update)
- [ ] Define foreign key relationships with CASCADE/SET NULL behavior:
  - [ ] transactions.user_id → users.id (CASCADE on delete)
  - [ ] transactions.category_id → categories.id (RESTRICT on delete)
  - [ ] categories.user_id → users.id (CASCADE on delete)
  - [ ] savings_goals.user_id → users.id (CASCADE on delete)
- [ ] Add indexes for performance:
  - [ ] Index on transactions.user_id
  - [ ] Index on transactions.date
  - [ ] Index on transactions.category_id
  - [ ] Index on categories.user_id
  - [ ] Index on savings_goals.user_id
  - [ ] Index on users.email (unique index)
- [ ] Create Prisma schema file (prisma/schema.prisma) with all models
- [ ] Generate Prisma client
- [ ] Create initial migration file
- [ ] Test migration: reset database and run migration
- [ ] Verify all tables created correctly
- [ ] Verify foreign key constraints work (test: try to create transaction with invalid user_id)
- [ ] Verify indexes exist in database
- [ ] Seed default categories (Food & Dining, Transportation, Entertainment, Shopping, Bills, etc.)

### Card: API Routes Development
**Due Date**: Jan 3, 11:59 PM

**Description**

**Process & Design Notes:** The API layer connects the frontend to the database, implementing all CRUD operations needed by the application. The initial design considered RESTful conventions - GET for reading, POST for creating, PUT/PATCH for updating, DELETE for removing. Each endpoint needed to be scoped to the authenticated user's data - a critical security requirement. We decided on Next.js API routes (app/api) rather than a separate backend server for simplicity and deployment ease. The design evolved to include proper error handling, input validation, and consistent response formats. Authentication middleware needed to be reusable across all protected routes. We also considered pagination for the transactions list (deferred to post-MVP) but designed the endpoints to support it later. Error responses follow a consistent format to make frontend error handling easier.

**Acceptance Criteria:**
- All API endpoints require authentication (except public routes)
- GET /api/transactions returns only transactions belonging to the authenticated user
- POST /api/transactions creates a new transaction for the authenticated user
- PUT /api/transactions/[id] updates a transaction only if it belongs to the authenticated user
- DELETE /api/transactions/[id] deletes a transaction only if it belongs to the authenticated user
- All endpoints validate input data before processing
- All endpoints return appropriate HTTP status codes (200, 201, 400, 401, 404, 500)
- Error responses include clear error messages for debugging
- API responses use consistent JSON format

**Checklist:**
- [ ] Set up Next.js API route structure (app/api directory)
- [ ] Create authentication utility to get current user from session (lib/auth-utils.ts)
- [ ] Create reusable authentication middleware function
- [ ] Design consistent API response format (success: { data }, error: { error, message })
- [ ] Create GET /api/transactions route (app/api/transactions/route.ts)
  - [ ] Add authentication check
  - [ ] Query database for transactions where user_id = session.user.id
  - [ ] Support optional query params: type (income/expense), category_id, start_date, end_date
  - [ ] Return transactions array with category and user data populated
  - [ ] Add error handling for database failures
  - [ ] Return 200 with transactions array
- [ ] Create POST /api/transactions route
  - [ ] Add authentication check
  - [ ] Validate request body (amount, type, category_id, date required; amount > 0)
  - [ ] Verify category exists and belongs to user (or is default)
  - [ ] Create transaction record with user_id from session
  - [ ] Return 201 with created transaction
  - [ ] Handle validation errors (return 400 with error message)
- [ ] Create PUT /api/transactions/[id] route (app/api/transactions/[id]/route.ts)
  - [ ] Add authentication check
  - [ ] Find transaction by id
  - [ ] Verify transaction belongs to authenticated user (return 404 if not found or unauthorized)
  - [ ] Validate request body (same as POST)
  - [ ] Update transaction with new data
  - [ ] Return 200 with updated transaction
- [ ] Create DELETE /api/transactions/[id] route
  - [ ] Add authentication check
  - [ ] Find transaction by id
  - [ ] Verify transaction belongs to authenticated user
  - [ ] Delete transaction from database
  - [ ] Return 200 or 204 (No Content)
- [ ] Create GET /api/categories route
  - [ ] Add authentication check
  - [ ] Return default categories + user's custom categories
  - [ ] Filter by user_id = session.user.id OR user_id IS NULL
- [ ] Create POST /api/categories route
  - [ ] Add authentication check
  - [ ] Validate request body (name, color required)
  - [ ] Check for duplicate category name for this user
  - [ ] Create category with user_id from session
  - [ ] Return 201 with created category
- [ ] Create GET /api/goals route
  - [ ] Add authentication check
  - [ ] Query goals where user_id = session.user.id
  - [ ] Return goals array with progress calculated
- [ ] Create POST /api/goals route
  - [ ] Add authentication check
  - [ ] Validate request body (name, target_amount required; target_amount > 0)
  - [ ] Create goal with user_id from session, current_amount = 0
  - [ ] Return 201 with created goal
- [ ] Create PUT /api/goals/[id] route
  - [ ] Add authentication check
  - [ ] Verify goal belongs to authenticated user
  - [ ] Allow updating: name, target_amount, current_amount, deadline
  - [ ] Validate current_amount <= target_amount (if updating)
  - [ ] Return 200 with updated goal
- [ ] Test all endpoints with Postman or Thunder Client:
  - [ ] Test GET /api/transactions without auth → should return 401
  - [ ] Test GET /api/transactions with auth → should return user's transactions
  - [ ] Test POST /api/transactions with valid data → should create transaction
  - [ ] Test POST /api/transactions with invalid data → should return 400
  - [ ] Test PUT /api/transactions/[id] for own transaction → should update
  - [ ] Test PUT /api/transactions/[id] for other user's transaction → should return 404
  - [ ] Test DELETE /api/transactions/[id] → should delete
  - [ ] Test all category endpoints
  - [ ] Test all goal endpoints

### Card: Business Logic Implementation
**Description**: Implement core application logic
**Start Date**: 2025-01-02
**End Date**: 2025-01-03
**Checklist**:
- [ ] Calculate spending totals by category
- [ ] Calculate budget vs actual spending
- [ ] Calculate savings goal progress percentages
- [ ] Generate spending insights/trends
- [ ] Implement data validation rules
- [ ] Add error handling

---

## Testing

### Card: Unit Tests
**Description**: Write unit tests for utility functions and components
**Start Date**: 2025-01-03
**End Date**: 2025-01-04
**Checklist**:
- [ ] Set up Jest/React Testing Library
- [ ] Test transaction calculation functions
- [ ] Test budget calculation functions
- [ ] Test form validation logic
- [ ] Test UI components rendering
- [ ] Achieve minimum 60% code coverage

### Card: Integration Tests
**Description**: Test API endpoints and database interactions
**Start Date**: 2025-01-03
**End Date**: 2025-01-04
**Checklist**:
- [ ] Test transaction CRUD operations
- [ ] Test category management
- [ ] Test savings goals CRUD operations
- [ ] Test authentication flow
- [ ] Test RBA middleware
- [ ] Test AI integration endpoints

### Card: End-to-End Testing
**Description**: Test complete user workflows
**Start Date**: 2025-01-04
**End Date**: 2025-01-04
**Checklist**:
- [ ] Test: User registers → logs in → adds transaction → views dashboard
- [ ] Test: User creates savings goal → makes progress → sees updates
- [ ] Test: Coach logs in → accesses Page 6 → accesses Page 7
- [ ] Test: Regular user tries to access Page 6 → gets blocked
- [ ] Fix any bugs discovered

---

## Deployment

### Card: Production Environment Setup
**Description**: Prepare application for production deployment
**Start Date**: 2025-01-04
**End Date**: 2025-01-04
**Checklist**:
- [ ] Set up production database (Supabase/Neon/PlanetScale)
- [ ] Configure production environment variables
- [ ] Set up Vercel project
- [ ] Connect GitHub repository to Vercel
- [ ] Configure build settings
- [ ] Test production build locally

### Card: Deployment & Testing
**Description**: Deploy to production and verify functionality
**Start Date**: 2025-01-04
**End Date**: 2025-01-04
**Checklist**:
- [ ] Deploy to Vercel
- [ ] Verify all pages load correctly
- [ ] Test authentication in production
- [ ] Test RBA protection in production
- [ ] Test AI features in production
- [ ] Verify database connections work
- [ ] Test on mobile devices
- [ ] Fix any production-specific issues

### Card: Documentation Finalization
**Description**: Complete all documentation for submission
**Start Date**: 2025-01-04
**End Date**: 2025-01-04
**Checklist**:
- [ ] Complete README.md reflection section
- [ ] Verify all wireframe links work
- [ ] Update project plan with actual dates
- [ ] Add screenshots/videos to documentation
- [ ] Ensure all assignment requirements are met
- [ ] Double-check coach credentials are documented

---

## Notes

- All dates are estimates and should be adjusted based on actual progress
- Priority: Focus on MVP features first (Page 5 - Product) before polish pages
- RBA implementation is critical for assignment requirements - prioritize early
- AI integration should be functional but can start with simpler implementations
- Testing should be done incrementally, not just at the end

## Coach/Instructor Credentials

For role-based access control testing:

- **rob@launchpadphilly.org** → Password: `lpuser1`
- **sanaa@launchpadphilly.org** → Password: `lpuser2`
- **taheera@launchpadphilly.org** → Password: `lpuser3`

