# Pennywise - Detailed Trello Cards

This document contains detailed Trello cards for the Pennywise budgeting app, updated to reflect current project progress. Each card follows the format shown in the example with descriptions, acceptance criteria, and checklists.

---

## Card 1: Set Up PostgreSQL Database with Prisma ✅ COMPLETED

**Due Date:** Feb 15, 2025, 11:59 PM  
**Status:** ✅ Complete

### Description

**Process & Design Notes:**
Successfully migrated from localStorage to PostgreSQL database with Prisma ORM. Created comprehensive schema with User, Transaction, and Goal models. Designed relationships (User has many Transactions/Goals) and added indexes for optimal query performance. Database connection established and migrations applied successfully.

**Acceptance Criteria:**
- ✅ Prisma schema file created with User, Transaction, and Goal models
- ✅ Database connection string configured in .env.local
- ✅ Prisma client generated successfully
- ✅ Initial migration created and applied to database
- ✅ Database can store transactions with all current fields (type, amount, category, description, merchant, date)
- ✅ Database can store goals with all current fields (name, targetAmount, currentAmount, deadline)
- ✅ Database can store user accounts with email, password (hashed), name, and role
- ✅ Relationships properly defined (User → Transactions, User → Goals)

### Checklist

- [x] Prisma and PostgreSQL packages installed (already in package.json)
- [x] Prisma schema file created (prisma/schema.prisma)
- [x] User model defined with email, password, name, role fields
- [x] Transaction model defined with type, amount, category, description, merchant, date, userId
- [x] Goal model defined with name, targetAmount, currentAmount, deadline, userId
- [x] Relationships defined (User hasMany Transactions, User hasMany Goals)
- [x] Indexes added for userId, date, category fields
- [x] DATABASE_URL added to .env.local
- [x] Prisma client generated (`npx prisma generate`)
- [x] Initial migration created and applied (`npx prisma migrate dev`)
- [x] Database connection tested
- [x] Prisma client singleton created (lib/prisma.ts)

---

## Card 2: Create API Routes for Transactions ✅ COMPLETED

**Due Date:** Feb 18, 2025, 11:59 PM  
**Status:** ✅ Complete

### Description

**Process & Design Notes:**
Successfully created RESTful API endpoints for transaction management. All CRUD operations implemented following REST conventions. Added Zod validation for request bodies, proper error handling, and user data isolation. API routes are fully functional and ready for frontend integration.

**Acceptance Criteria:**
- ✅ GET /api/transactions endpoint returns all transactions for authenticated user
- ✅ POST /api/transactions endpoint creates new transaction
- ✅ PUT /api/transactions/[id] endpoint updates existing transaction
- ✅ DELETE /api/transactions/[id] endpoint deletes transaction
- ✅ All endpoints require authentication (x-user-id header)
- ✅ Users can only access their own transactions
- ✅ Proper error handling with meaningful error messages
- ✅ Returns appropriate HTTP status codes (200, 201, 400, 401, 404, 500)
- ✅ Request/response validation with Zod schemas

### Checklist

- [x] API route structure planned
- [x] pages/api directory created
- [x] GET /api/transactions route implemented
- [x] POST /api/transactions route implemented
- [x] PUT /api/transactions/[id] route implemented
- [x] DELETE /api/transactions/[id] route implemented
- [x] Authentication middleware (x-user-id header)
- [x] User data isolation (users can't access others' transactions)
- [x] Request body validation with Zod
- [x] Error handling with try/catch blocks
- [x] Proper HTTP status codes returned
- [x] API helper functions created (lib/api-helpers.ts)

---

## Card 3: Create API Routes for Savings Goals ✅ COMPLETED

**Due Date:** Feb 20, 2025, 11:59 PM  
**Status:** ✅ Complete

### Description

**Process & Design Notes:**
Successfully created RESTful API endpoints for savings goals management. All CRUD operations implemented with proper validation. Goals are properly associated with users and support progress tracking (currentAmount updates). Validation ensures data integrity.

**Acceptance Criteria:**
- ✅ GET /api/goals endpoint returns all goals for authenticated user
- ✅ POST /api/goals endpoint creates new goal
- ✅ PUT /api/goals/[id] endpoint updates goal (including currentAmount progress)
- ✅ DELETE /api/goals/[id] endpoint deletes goal
- ✅ All endpoints require authentication
- ✅ Users can only access their own goals
- ✅ Validation ensures targetAmount is positive
- ✅ Deadline validation (if provided, must be valid date)
- ✅ Proper error handling and HTTP status codes

### Checklist

- [x] API route structure planned
- [x] GET /api/goals route implemented
- [x] POST /api/goals route implemented
- [x] PUT /api/goals/[id] route implemented
- [x] DELETE /api/goals/[id] route implemented
- [x] Authentication middleware applied
- [x] User data isolation verified
- [x] Goal validation (targetAmount > 0, valid deadline)
- [x] Progress update logic (currentAmount)
- [x] Error handling implemented
- [x] Zod validation schemas created

---

## Card 4: Implement NextAuth.js Authentication

**Due Date:** Feb 22, 2025, 11:59 PM  
**Status:** 🔄 In Progress

### Description

**Process & Design Notes:**
Currently using localStorage-based authentication in AuthContext.jsx with plain text passwords (insecure). NextAuth.js is installed and database is ready. Need to replace current auth system with NextAuth.js using Prisma adapter. Configure credentials provider for email/password login. Maintain existing role-based access control (coach vs student roles). Update login and signup pages to use NextAuth. Ensure protected routes (rubric-evidence, reflection) still work with NextAuth session.

**Acceptance Criteria:**
- NextAuth.js configured with Prisma adapter
- Credentials provider set up for email/password authentication
- Registration creates user accounts with hashed passwords (bcrypt)
- Login authenticates users and creates secure sessions
- Session persists across page refreshes
- Protected routes redirect unauthenticated users
- Role-based access control works (coach can access protected pages)
- Logout properly destroys sessions
- AuthContext updated or replaced to work with NextAuth

### Checklist

- [x] NextAuth.js package installed (already in package.json)
- [x] Database schema ready (User model exists)
- [x] NEXTAUTH_SECRET generated
- [ ] NextAuth configuration file created (pages/api/auth/[...nextauth].ts)
- [ ] Prisma adapter configured
- [ ] Credentials provider implemented
- [ ] Password hashing with bcrypt on registration
- [ ] Registration API route created (/api/auth/register)
- [ ] Login page updated to use NextAuth signIn
- [ ] Signup page updated to use NextAuth registration
- [ ] Session provider added to _app.jsx
- [ ] Protected route middleware updated for /rubric-evidence
- [ ] Protected route middleware updated for /reflection
- [ ] Logout functionality implemented
- [ ] Existing coach credentials migrated to database
- [ ] API routes updated to use NextAuth session instead of x-user-id header

---

## Card 5: Add Client-Side Form Validation

**Due Date:** Feb 12, 2025, 11:59 PM  
**Status:** 📋 To Do

### Description

**Process & Design Notes:**
Currently using basic HTML5 validation and alert() for errors in AddTransactionModal.jsx and AddGoalModal.jsx. Need comprehensive client-side validation with better UX. Use Zod (already installed) for schema validation. Add real-time validation feedback, clear error messages, and prevent invalid submissions. Validate amounts are positive numbers, dates are valid, required fields are filled, and categories are selected.

**Acceptance Criteria:**
- Zod schemas created for Transaction and Goal forms
- AddTransactionModal validates all fields before submission
- AddGoalModal validates all fields before submission
- Real-time validation feedback shown to users
- Error messages are clear and actionable
- Invalid forms cannot be submitted
- Amount fields only accept positive numbers
- Date fields validate date ranges
- Required field indicators shown
- Validation errors displayed inline with fields

### Checklist

- [x] Zod package installed (already in package.json)
- [ ] Transaction form validation schema created
- [ ] Goal form validation schema created
- [ ] AddTransactionModal validation implemented
- [ ] AddGoalModal validation implemented
- [ ] Real-time validation on input change
- [ ] Error message components created
- [ ] Amount validation (positive numbers only)
- [ ] Date validation (valid dates, not in future for transactions)
- [ ] Required field validation
- [ ] Category selection validation
- [ ] Form submission blocked until valid
- [ ] Error styling matches design system

---

## Card 6: Add Server-Side Validation for API Routes ✅ COMPLETED

**Due Date:** Feb 14, 2025, 11:59 PM  
**Status:** ✅ Complete

### Description

**Process & Design Notes:**
Successfully implemented server-side validation for all API endpoints using Zod schemas. All request bodies are validated before processing, preventing invalid data from entering the database. Validation errors return clear, user-friendly messages with 400 status codes.

**Acceptance Criteria:**
- ✅ Zod validation schemas created for API requests
- ✅ POST /api/transactions validates request body
- ✅ PUT /api/transactions/[id] validates request body
- ✅ POST /api/goals validates request body
- ✅ PUT /api/goals/[id] validates request body
- ✅ Validation errors return 400 status with clear messages
- ✅ Invalid data is rejected before database operations
- ✅ All required fields are validated
- ✅ Data types are validated (numbers, strings, dates)

### Checklist

- [x] Zod package installed (already in package.json)
- [x] Transaction validation schema created
- [x] Goal validation schema created
- [x] POST /api/transactions validation middleware
- [x] PUT /api/transactions/[id] validation middleware
- [x] POST /api/goals validation middleware
- [x] PUT /api/goals/[id] validation middleware
- [x] Error response formatting
- [x] Validation error messages are user-friendly
- [x] All edge cases handled (negative amounts, invalid dates, etc.)

---

## Card 7: Migrate Data from localStorage to Database

**Due Date:** Feb 25, 2025, 11:59 PM  
**Status:** 📋 To Do

### Description

**Process & Design Notes:**
Users currently have data in localStorage (transactions, goals). Need migration strategy to move this data to database when they first log in after database integration. Create migration script that detects localStorage data, associates it with user account, and imports to database. Handle edge cases like duplicate data, corrupted localStorage, and users with no existing data. Provide user feedback during migration and ability to retry if it fails.

**Acceptance Criteria:**
- Migration script detects localStorage data on first database login
- All transactions migrated to database with correct userId
- All goals migrated to database with correct userId
- Migration runs automatically when user logs in with database auth
- User is notified of migration progress
- Failed migrations can be retried
- localStorage is cleared after successful migration
- No data loss during migration
- Migration is idempotent (safe to run multiple times)

### Checklist

- [x] Migration strategy documented
- [ ] Migration detection logic (check for localStorage data)
- [ ] Transaction migration function
- [ ] Goal migration function
- [ ] User association during migration
- [ ] Migration API endpoint created (/api/migrate)
- [ ] Migration progress indicator UI
- [ ] Error handling for corrupted data
- [ ] Migration retry mechanism
- [ ] localStorage cleanup after migration
- [ ] Migration logging for debugging
- [ ] User notification on completion

---

## Card 8: Implement Transaction Editing Feature

**Due Date:** Feb 16, 2025, 11:59 PM  
**Status:** 📋 To Do

### Description

**Process & Design Notes:**
Currently users can only delete transactions (see TransactionList.jsx). Need to add edit functionality so users can correct mistakes without deleting and re-adding. Create EditTransactionModal component similar to AddTransactionModal but pre-filled with existing data. Add edit button to transaction list items. PUT /api/transactions/[id] endpoint already exists and is ready to use. Ensure edited transactions maintain their ID and update timestamp.

**Acceptance Criteria:**
- Edit button appears on transaction list items
- EditTransactionModal component created
- Modal pre-fills with existing transaction data
- Users can update all transaction fields
- Changes are validated before saving
- PUT request updates transaction in database
- UI updates immediately after successful edit
- Error handling if edit fails
- Success feedback shown to user

### Checklist

- [x] Edit feature requirements documented
- [x] PUT /api/transactions/[id] endpoint exists (already created)
- [ ] EditTransactionModal component created
- [ ] Edit button added to TransactionList items
- [ ] Modal pre-fills with transaction data
- [ ] Form validation in edit modal
- [ ] Frontend updates after successful edit
- [ ] Error handling for failed edits
- [ ] Success toast/notification
- [ ] Loading state during edit operation

---

## Card 9: Integrate OpenAI/Gemini API for Advanced AI Categorization ✅ COMPLETED

**Due Date:** Mar 1, 2025, 11:59 PM  
**Status:** ✅ Complete

### Description

**Process & Design Notes:**
Successfully created enhanced AI service that supports OpenAI, Google Gemini, and keyword matching fallback. Created API route for server-side AI categorization. Updated AddTransactionModal to use the new AI service with loading states and method indicators. The system gracefully falls back to keyword matching if API keys are not configured or if API calls fail.

**Acceptance Criteria:**
- ✅ OpenAI or Gemini API integration ready (if API keys are set)
- ✅ AI categorization service created (lib/ai-service.ts)
- ✅ API route created (/api/ai/categorize)
- ✅ API calls handle errors gracefully
- ✅ Fallback to keyword matching if API fails or keys not set
- ✅ Loading states during AI processing
- ✅ UI shows which method was used (OpenAI/Gemini/Keyword)
- ✅ AddTransactionModal updated to use AI API

### Checklist

- [x] OpenAI and Gemini packages installed
- [x] AI service created (lib/ai-service.ts)
- [x] API route created (/api/ai/categorize)
- [x] OpenAI integration implemented
- [x] Gemini integration implemented
- [x] Keyword matching fallback implemented
- [x] Error handling with fallback to keyword matching
- [x] AddTransactionModal updated to use AI API
- [x] Loading states in UI
- [x] Method indicator in UI (shows OpenAI/Gemini/Keyword)
- [ ] Response caching implemented (optional enhancement)
- [ ] Rate limiting middleware (optional enhancement)
- [ ] Cost monitoring setup (optional enhancement)

---

## Card 10: Add Password Hashing to Existing Auth System

**Due Date:** Feb 10, 2025, 11:59 PM  
**Status:** 📋 To Do (Will be handled by NextAuth.js)

### Description

**Process & Design Notes:**
Currently passwords are stored in plain text in localStorage (see AuthContext.jsx createAccount and login functions). This is a critical security issue. However, since we're implementing NextAuth.js (Card 4), password hashing will be handled automatically by NextAuth with bcrypt. This card can be merged with Card 4 or implemented as a temporary fix if NextAuth is delayed.

**Acceptance Criteria:**
- Passwords are hashed with bcrypt before storing
- Login compares hashed passwords correctly
- Existing plain text passwords are handled (migration or re-registration)
- Password hashing works for both student and coach accounts
- No plain text passwords stored after implementation

### Checklist

- [x] bcryptjs package installed (already in package.json)
- [ ] Password hashing function created (or use NextAuth)
- [ ] createAccount function updated to hash passwords
- [ ] login function updated to compare hashed passwords
- [ ] Existing plain text password handling strategy
- [ ] Coach credentials updated with hashed passwords
- [ ] Testing with new account creation
- [ ] Testing with login using hashed passwords
- [ ] Error handling for hashing failures

**Note:** This will be automatically handled when Card 4 (NextAuth.js) is completed.

---

## Card 11: Update Frontend to Use API Routes Instead of localStorage

**Due Date:** Feb 28, 2025, 11:59 PM  
**Status:** 🔄 In Progress

### Description

**Process & Design Notes:**
Currently Product.jsx, TransactionList.jsx, and SavingsGoals.jsx all use localStorage directly. Need to refactor to use API routes instead. API routes are ready and helper functions exist in lib/api-helpers.ts. Update Product.jsx to fetch transactions/goals from API on mount. Update add/delete/update functions to call API endpoints. Add loading states and error handling. Maintain existing UI/UX while switching data source.

**Acceptance Criteria:**
- Product.jsx fetches transactions from GET /api/transactions
- Product.jsx fetches goals from GET /api/goals
- Add transaction calls POST /api/transactions
- Delete transaction calls DELETE /api/transactions/[id]
- Edit transaction calls PUT /api/transactions/[id] (when Card 8 is done)
- Add goal calls POST /api/goals
- Update goal calls PUT /api/goals/[id]
- Delete goal calls DELETE /api/goals/[id]
- Loading states shown during API calls
- Error handling with user-friendly messages
- UI updates optimistically or after API success

### Checklist

- [x] API routes created (from previous cards)
- [x] API helper functions created (lib/api-helpers.ts)
- [ ] Product.jsx updated to fetch from API
- [ ] AddTransactionModal calls POST API
- [ ] TransactionList delete calls DELETE API
- [ ] EditTransactionModal calls PUT API (when Card 8 is done)
- [ ] SavingsGoals component fetches from API
- [ ] AddGoalModal calls POST API
- [ ] Goal update calls PUT API
- [ ] Goal delete calls DELETE API
- [ ] Loading states added
- [ ] Error handling implemented
- [ ] localStorage usage removed from components

---

## Card 12: Implement Budget Tracking Feature

**Due Date:** Mar 5, 2025, 11:59 PM  
**Status:** 📋 To Do

### Description

**Process & Design Notes:**
Budget tracking is mentioned in why-pennywise.jsx as a planned feature but not implemented. Need to create budget system where users can set monthly budgets per category and track spending against budgets. Add Budget model to Prisma schema. Create budget UI components (create budget, view budgets, progress indicators). Add API routes for budgets. Show budget warnings when approaching limits. This enhances the core budgeting functionality.

**Acceptance Criteria:**
- Budget model added to Prisma schema
- Users can create budgets for categories
- Budgets can be set monthly or custom periods
- Spending is tracked against budgets
- Visual indicators show budget progress
- Warnings when approaching budget limits (80%, 100%, over)
- Budget vs actual spending displayed
- API routes for budget CRUD operations
- Budget list/overview component
- Integration with existing transaction categorization

### Checklist

- [x] Budget feature requirements documented
- [ ] Budget model added to Prisma schema
- [ ] Budget migration created
- [ ] POST /api/budgets endpoint
- [ ] GET /api/budgets endpoint
- [ ] PUT /api/budgets/[id] endpoint
- [ ] DELETE /api/budgets/[id] endpoint
- [ ] Create budget UI component
- [ ] Budget list/overview component
- [ ] Budget progress calculation logic
- [ ] Visual progress indicators
- [ ] Budget warning system
- [ ] Integration with transaction categories

---

## Usage Instructions

1. Copy each card section into Trello
2. Set the due dates as specified
3. Add labels (e.g., "Backend", "Frontend", "API", "Security", "AI", "✅ Complete", "🔄 In Progress", "📋 To Do")
4. Assign cards to team members
5. Move cards to appropriate lists (To Do, In Progress, Code Review, Done)
6. Check off checklist items as work progresses
7. Add comments, attachments, and screenshots as needed
8. Link related cards together

---

## Card Priority Recommendations (Updated)

### ✅ Completed (5 cards)
- ✅ Card 1: Database Setup
- ✅ Card 2: Transaction API Routes
- ✅ Card 3: Goals API Routes
- ✅ Card 6: Server-Side Validation
- ✅ Card 9: Advanced AI Features

### 🔄 In Progress (2 cards)
- 🔄 Card 4: NextAuth.js Authentication
- 🔄 Card 11: Frontend API Integration

### 📋 High Priority (Next to Complete)
- Card 11: Frontend API Integration (Complete the switch from localStorage)
- Card 4: NextAuth.js (Replace insecure auth system)
- Card 5: Client-Side Validation (UX improvement)
- Card 8: Transaction Editing (Missing feature)

### 📋 Medium Priority
- Card 7: Data Migration (Move existing localStorage data)
- Card 10: Password Hashing (Will be handled by NextAuth)

### 📋 Lower Priority (Enhancements)
- Card 12: Budget Tracking (New feature)

---

## Progress Summary

**Completed:** 5/12 cards (42%)  
**In Progress:** 2/12 cards (17%)  
**To Do:** 5/12 cards (41%)

### What's Working Now
- ✅ Database schema and migrations
- ✅ All API routes for transactions and goals
- ✅ Server-side validation
- ✅ Enhanced AI categorization service
- ✅ Database connection and Prisma client

### What's Next
1. **Frontend Integration** - Connect UI to API routes (Card 11)
2. **NextAuth.js** - Secure authentication (Card 4)
3. **Client Validation** - Better UX (Card 5)
4. **Transaction Editing** - Complete CRUD (Card 8)

---

## Notes

- All cards are based on the actual current state of the Pennywise project
- Cards reference specific files and components that exist in the codebase
- Dependencies mentioned (Prisma, NextAuth, OpenAI, etc.) are already in package.json
- Database is set up and ready
- API routes are complete and tested
- AI service is working with fallback support
- Frontend still uses localStorage but API routes are ready for integration
