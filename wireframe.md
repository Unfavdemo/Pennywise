# Pennywise Wireframe Documentation

This document provides detailed wireframe specifications for all 7 pages of the Pennywise Money & Budgeting App, along with user flows, component inventory, and a ready-to-use Figma AI prompt.

---

## Table of Contents

1. [Page Specifications](#page-specifications)
2. [User Flows](#user-flows)
3. [Component Inventory](#component-inventory)
4. [Figma AI Prompt](#figma-ai-prompt)

---

## Page Specifications

### Page 1 - Home

**Purpose**: Landing page that introduces the app, explains its value proposition, and guides users to the main application.

**Key UI Components**:
- **Header/Navigation Bar**: 
  - Logo/App name "Pennywise" on the left
  - Navigation links: Home, About, Why Pennywise?, Features, Product
  - "Login" button on the right (if not authenticated)
  - User menu/profile (if authenticated)
  
- **Hero Section**:
  - Large, friendly headline: "Take Control of Your Money, Student Style"
  - Subheadline: Brief tagline (e.g., "Budget smarter. Save faster. Stress less.")
  - Prominent CTA button: "Start Budgeting" or "Try Pennywise" → Links to Page 5 (Product)
  
- **"Who Will Benefit" Section**:
  - Heading: "Perfect for students who want to..."
  - Bullet points or cards showing:
    - Track spending without stress
    - Build savings habits that last
    - Understand where money goes
    - Achieve financial goals
  
- **Quick Features Preview** (3-4 cards/icons):
  - Easy expense tracking
  - Smart categorization
  - Savings goals
  - AI-powered insights
  
- **Footer**:
  - Links to About, Features pages
  - Copyright/credits

**Layout**: Single column, mobile-first. Clean spacing, approachable colors.

---

### Page 2 - About (Problem Page)

**Purpose**: Demonstrate deep understanding of the student money management problem (CCC.1.1 evidence).

**Key UI Components**:
- **Page Header**: "Understanding the Problem"
- **Problem Statement Section**:
  - Clear heading: "The Student Financial Challenge"
  - 2-3 paragraphs explaining the problem in own words
  
- **Real-World Manifestation Section**:
  - Heading: "How This Shows Up in Real Life"
  - Bullet points or short stories about:
    - Overspending without realizing it
    - Difficulty saving for goals
    - Lack of financial visibility
  - **Personal Example Card**: 
    - Highlighted box with realistic scenario
    - Example: "A college student with $500/month income ends up broke by month-end without knowing why"
  
- **Why It's Difficult Section**:
  - Heading: "Why Solving This Is Challenging"
  - List of constraints:
    - Limited financial education
    - Variable income sources
    - Habit-building difficulty
    - Time constraints
    - Existing tools are too complex
  
- **Consequences Section**:
  - Heading: "What Happens If We Don't Solve This"
  - Impact points:
    - Debt accumulation
    - Academic stress
    - Long-term financial consequences
    - Missed savings opportunities
  
- **Existing Solutions Section**:
  - Heading: "Current Solutions & Their Limitations"
  - Card showing one existing app/solution
  - "What Worked": List of good features
  - "What Didn't Work": List of gaps or issues

**Layout**: Content-focused, scrollable. Use cards/sections to break up text. Include relevant icons or illustrations.

---

### Page 3 - Why Pennywise?

**Purpose**: Show solution planning and strategic thinking (CCC.1.2 evidence).

**Key UI Components**:
- **Page Header**: "Why Pennywise?"
- **Solution Explanation Section**:
  - Heading: "Our Approach"
  - Clear explanation of what Pennywise is and why it works
  - How it addresses the problems outlined in Page 2
  
- **Features List Section**:
  - Heading: "What Pennywise Does"
  - Two-column grid (on desktop) or stacked (mobile):
    - Core Features:
      - Income & Expense Tracking
      - Spending Categories
      - Savings Goals
      - Financial Insights
    - AI Features:
      - Smart Categorization
      - Predictive Budgeting
      - Spending Insights
      - Anomaly Detection
  
- **Expected Challenges Section**:
  - Heading: "Challenges We Anticipate"
  - List of expected difficulties:
    - User adoption and habit formation
    - Data accuracy and manual entry
    - AI accuracy for categorization
    - Time constraints for development
  
- **How We'll Handle Challenges Section**:
  - Heading: "Our Solutions"
  - Match each challenge with a solution/approach
  
- **Project Plan Link Section**:
  - Card or button: "View Full Project Plan"
  - Links to project-plan.md or external Trello board
  - Brief summary of project phases/sprints

**Layout**: Structured sections with clear hierarchy. Use visual elements (icons, cards) to make features stand out.

---

### Page 4 - Features

**Purpose**: Showcase working features and highlight AI integration that sets Pennywise apart.

**Key UI Components**:
- **Page Header**: "Features That Make a Difference"
- **Core Features Showcase**:
  - Feature cards (3-4) with:
    - Icon or screenshot
    - Feature name
    - Brief description
    - "Try it" link to Page 5
  
- **AI Integration Highlight Section**:
  - Prominent heading: "Powered by AI"
  - Large card or hero section explaining AI value
  - AI feature cards:
    - **Smart Categorization**: "Automatically categorize your expenses"
    - **Predictive Budgeting**: "Get budget suggestions based on your spending"
    - **Intelligent Insights**: "Discover patterns you didn't know existed"
    - **Anomaly Detection**: "Catch unusual spending before it becomes a problem"
  - Interactive demo or screenshot showing AI in action
  
- **Differentiation Section**:
  - Heading: "Why Choose Pennywise?"
  - Comparison or unique selling points:
    - Built for students specifically
    - AI-powered insights
    - Simple and approachable
    - Free/affordable
  
- **Call-to-Action**:
  - Large button: "Experience the Full Product" → Links to Page 5

**Layout**: Feature-focused, visual. Use cards, icons, and screenshots to demonstrate capabilities.

---

### Page 5 - Product (MVP / Core Application)

**Purpose**: The main working application where users interact with the core features (CCC.1.3 evidence).

**Key UI Components**:
- **Dashboard Header**:
  - Balance overview card: Current balance, monthly income, expenses
  - Quick stats: Total saved, goals progress
  
- **Navigation** (if not in header):
  - Transactions
  - Goals
  - Insights/Analytics
  - Settings
  
- **Add Transaction Form** (Primary Input):
  - Form fields:
    - Transaction type toggle/radio: Income / Expense
    - Amount (number input)
    - Category (dropdown with AI suggestion badge)
    - Date picker
    - Description/notes (optional)
    - Merchant/store name (optional, for AI categorization)
  - Submit button
  - "AI Categorize" button (if description provided)
  
- **Transaction List** (Primary Output):
  - Filter options: All / Income / Expenses / By Category / By Date Range
  - List items showing:
    - Date
    - Description/merchant
    - Category (with color indicator)
    - Amount (green for income, red for expenses)
    - Edit/Delete buttons
  - Total summary row at bottom
  
- **Savings Goals Section**:
  - Goal cards showing:
    - Goal name
    - Target amount
    - Current progress (progress bar)
    - Percentage complete
    - Days until deadline (if set)
  - "Add New Goal" button/form
  
- **Insights/Charts Section**:
  - Spending by category (pie chart or bar chart)
  - Monthly trend (line chart)
  - AI-generated insights card:
    - "This week you spent 25% more on food"
    - "You're on track to save $200 this month!"
  
- **Quick Actions**:
  - Floating action button (FAB) or prominent button: "Add Transaction"
  - Quick add buttons for common categories

**Layout**: Dashboard-style layout. Main content area with sidebar (desktop) or bottom navigation (mobile). Focus on easy data input and clear visualization.

---

### Page 6 - Rubric Evidence (RBA Protected)

**Purpose**: Map CCC competencies to specific project artifacts for instructor evaluation. **Only accessible to coaches/instructors.**

**Key UI Components**:
- **Protected Route Indicator**:
  - Banner: "Instructor/Coach Access Only"
  - Show logged-in user's email if authenticated
  
- **CCC.1.1 Section**:
  - Heading: "CCC.1.1 - Understanding the Problem"
  - Description: Brief explanation of what CCC.1.1 means
  - **Where to See It**:
    - Bullet: "Page 2 - About (Problem Overview)"
    - Bullet: "README.md - Problem Summary Section"
  - **Links/Buttons**:
    - Button: "View Page 2 - About" → Links to Page 2
    - Button: "View README Problem Section" → Links to README anchor
  
- **CCC.1.2 Section**:
  - Heading: "CCC.1.2 - Planning a Solution"
  - Description: Brief explanation of what CCC.1.2 means
  - **Where to See It**:
    - Bullet: "Wireframes (uploaded/linked)"
    - Bullet: "Page 3 - Why Pennywise? (Solution Planning)"
    - Bullet: "project-plan.md (Project Plan)"
  - **Links/Buttons**:
    - Button: "View Wireframes" → Links to Figma/Canva wireframes
    - Button: "View Page 3 - Why Pennywise?" → Links to Page 3
    - Button: "View Project Plan" → Links to project-plan.md
  
- **CCC.1.3 Section**:
  - Heading: "CCC.1.3 - Building a Working App"
  - Description: Brief explanation of what CCC.1.3 means
  - **Where to See It**:
    - Bullet: "Page 5 - Product (Working MVP)"
    - Bullet: "Live application with functional features"
  - **Links/Buttons**:
    - Button: "View Page 5 - Product" → Links to Page 5
    - Button: "Test Live Application" → Links to Page 5 with demo data
  
- **Quick Navigation**:
  - Links to all 7 pages for easy navigation during evaluation

**Layout**: Clean, organized sections. Use cards or boxes to separate each CCC competency. Prominent buttons for easy navigation to evidence.

**Access Control**: This page should redirect unauthenticated users or users without "coach"/"instructor" role to an "Access Denied" page.

---

### Page 7 - Reflection (RBA Protected)

**Purpose**: Document project journey, learnings, and future plans. **Only accessible to coaches/instructors.**

**Key UI Components**:
- **Protected Route Indicator**:
  - Banner: "Instructor/Coach Access Only"
  
- **What Went Well Section**:
  - Heading: "What Went Well"
  - Text area or formatted content:
    - List of successes
    - Features that worked as expected
    - Technologies that were easy to use
    - Learning moments that were positive
  
- **What Didn't Go Well Section**:
  - Heading: "What Didn't Go Well"
  - Text area or formatted content:
    - Challenges faced
    - Features that were harder than expected
    - Technical difficulties
    - Time management issues
  
- **What Changed During the Project Section**:
  - Heading: "Changes Made & Why"
  - Text area or formatted content:
    - Features that were added/removed/modified
    - Scope adjustments
    - Technical stack changes
    - Design changes
    - Explanation of why each change was made
  
- **Future Plans Section**:
  - Heading: "What I'd Build Next"
  - Text area or formatted content:
    - Features planned but not implemented
    - Improvements to existing features
    - New capabilities to add
    - Learning goals for future development

**Layout**: Form-like or blog-post style. Clean, readable sections. Could include timestamps or edit history if desired.

**Access Control**: This page should redirect unauthenticated users or users without "coach"/"instructor" role to an "Access Denied" page.

---

## User Flows

### Primary User Flow: First-Time User Journey

```
1. User lands on Page 1 (Home)
   ↓
2. User clicks "Start Budgeting" → Goes to Page 5 (Product)
   ↓
3. User sees dashboard (or empty state if no data)
   ↓
4. User clicks "Add Transaction"
   ↓
5. User fills out transaction form:
   - Selects Income/Expense
   - Enters amount
   - Types description (AI suggests category)
   - Selects or confirms category
   - Submits
   ↓
6. Transaction appears in transaction list
   ↓
7. User sees updated balance and insights
```

### Navigation Flow Between Public Pages

```
Page 1 (Home) 
  ↔ Page 2 (About)
  ↔ Page 3 (Why Pennywise?)
  ↔ Page 4 (Features)
  → Page 5 (Product) [Main App]
```

### Authentication Flow

```
1. User clicks "Login" button (any page)
   ↓
2. User redirected to Login page
   ↓
3. User enters email and password
   ↓
4a. If regular user → Redirected to Page 5 (Product)
4b. If coach/instructor → Redirected to dashboard, can access Pages 6 & 7
```

### RBA Protection Flow

```
1. Coach/Instructor logs in with credentials:
   - rob@launchpadphilly.org / lpuser1
   - sanaa@launchpadphilly.org / lpuser2
   - taheera@launchpadphilly.org / lpuser3
   ↓
2. User navigates to Page 6 (Rubric Evidence)
   ↓
3. System checks authentication and role
   ↓
4a. If authenticated + has "coach"/"instructor" role → Access granted
4b. If not authenticated or wrong role → Redirect to "Access Denied" page
   ↓
5. Same check applies to Page 7 (Reflection)
```

### Transaction Workflow (Core Feature)

```
1. User on Page 5 (Product dashboard)
   ↓
2. User clicks "Add Transaction" (button or FAB)
   ↓
3. Modal or form appears
   ↓
4. User enters transaction details:
   - Type: Income or Expense
   - Amount: $XX.XX
   - Description: "Coffee at Starbucks"
   - (Optional) Click "AI Categorize" → AI suggests "Food & Dining"
   - Category: User selects or confirms
   - Date: Defaults to today, user can change
   ↓
5. User clicks "Save" or "Add Transaction"
   ↓
6. Transaction saved to database
   ↓
7. UI updates:
   - Transaction appears in list
   - Balance updates
   - Charts/insights refresh
   - AI insights may update
```

### Savings Goal Workflow

```
1. User on Page 5 (Product dashboard)
   ↓
2. User navigates to "Goals" section
   ↓
3. User clicks "Add New Goal"
   ↓
4. User enters:
   - Goal name: "Emergency Fund"
   - Target amount: $1000
   - Deadline: (optional) Date picker
   ↓
5. Goal created and displayed as card
   ↓
6. User can manually add to goal or link transactions
   ↓
7. Progress bar updates as goal progresses
```

---

## Component Inventory

### Reusable UI Components

#### Buttons
- **Primary Button**: Large, prominent CTA (e.g., "Start Budgeting")
- **Secondary Button**: Outlined style for less important actions
- **Icon Button**: For edit, delete, close actions
- **Floating Action Button (FAB)**: For "Add Transaction" on mobile

#### Cards
- **Feature Card**: For showcasing features on Pages 1, 3, 4
- **Transaction Card**: For displaying individual transactions in list
- **Goal Card**: For savings goals with progress bar
- **Insight Card**: For AI-generated insights on dashboard
- **Stat Card**: For displaying numbers (balance, totals)

#### Forms
- **Input Field**: Text, number, date inputs
- **Dropdown/Select**: For categories, filters
- **Radio Buttons**: For transaction type (Income/Expense)
- **Toggle Switch**: For settings, filters
- **Form Modal**: Overlay form for adding transactions/goals

#### Navigation
- **Top Navigation Bar**: For desktop, with logo and links
- **Bottom Navigation**: For mobile (Home, Transactions, Goals, Insights)
- **Breadcrumbs**: (Optional) For deep navigation
- **Sidebar**: (Optional) For desktop dashboard navigation

#### Data Display
- **Transaction List**: Scrollable list with filters
- **Chart Components**: 
  - Pie chart (spending by category)
  - Bar chart (monthly comparisons)
  - Line chart (spending trends)
- **Progress Bar**: For savings goals
- **Table**: (Optional) For detailed transaction view

#### Feedback
- **Alert/Toast**: For success/error messages
- **Loading Spinner**: During API calls
- **Empty State**: When no transactions/goals exist
- **Access Denied Page**: For unauthorized RBA access

#### Layout
- **Container**: Max-width wrapper for content
- **Grid**: For feature cards, transaction grid
- **Flexbox Layout**: For dashboard sections
- **Modal/Dialog**: For forms, confirmations

---

## Figma AI Prompt

Copy and paste the following prompt into Figma AI to generate wireframes for the Pennywise Money & Budgeting App:

---

### FIGMA AI PROMPT

**Create low-fidelity wireframes for a Money & Budgeting Web Application called "Pennywise" designed specifically for students. This is a Next.js web application that needs to be simple, clean, approachable, and non-intimidating for young users.**

#### App Purpose & Audience
- **Target Users**: College and high school students who struggle with money management
- **Core Problem**: Students need help tracking spending, building savings habits, and understanding where their money goes
- **Design Philosophy**: Friendly, approachable, modern - avoid corporate or sterile financial app aesthetics
- **Platform**: Web application (Next.js), mobile-responsive design (mobile-first approach)

#### Required Screens (7 Total)

**1. Page 1 - Home (Landing Page)**
- Hero section with app name "Pennywise" and tagline about student budgeting
- "Who will benefit" statement or section
- Large prominent button/link labeled "Start Budgeting" or "Try Pennywise" that leads to the main app
- Top navigation bar with links: Home, About, Why Pennywise?, Features, Product
- Login button in header (if not authenticated)
- Footer with additional links
- Design should be welcoming and encourage users to try the app

**2. Page 2 - About (Problem Understanding Page)**
- Page title: "Understanding the Problem"
- Section explaining the student financial challenge in clear, relatable terms
- Section showing how the problem manifests in real life (with examples)
- Section explaining why solving this problem is difficult (constraints, challenges)
- Section on consequences if problem isn't solved
- At least one highlighted personal/realistic example (e.g., student story)
- Section on one existing solution - what worked, what didn't work
- Use cards or sections to organize content, keep text readable

**3. Page 3 - Why Pennywise? (Solution Planning Page)**
- Page title: "Why Pennywise?"
- Section explaining the solution approach and why it works
- Features list showing both core features and AI features in organized format
- Section on expected challenges during development
- Section explaining how challenges will be addressed
- Link or button to project plan
- Summary of project planning/sprints
- Visual hierarchy to make features stand out

**4. Page 4 - Features (Feature Showcase Page)**
- Page title: "Features That Make a Difference"
- Feature cards showcasing core features (tracking, categories, goals, insights)
- **Prominent AI Integration Section** - large card or hero area highlighting:
  - Smart Expense Categorization
  - Predictive Budgeting
  - Intelligent Spending Insights
  - Anomaly Detection
- Section on why Pennywise is different/better than other apps
- Clear explanation of how AI helps solve user problems
- Call-to-action button linking to the main product (Page 5)
- Make AI features visually distinct and impressive

**5. Page 5 - Product (Main MVP Application Dashboard)**
- **This is the core working application**
- Dashboard header with balance overview (current balance, monthly income/expenses)
- Quick stats cards (total saved, goals progress)
- **Primary Input**: "Add Transaction" form (can be modal or inline) with:
  - Transaction type selector (Income/Expense radio buttons or toggle)
  - Amount input field
  - Category dropdown (with AI suggestion indicator/badge)
  - Date picker
  - Description/notes field
  - Merchant/store name field (for AI categorization)
  - "AI Categorize" button
  - Submit/Save button
- **Primary Output**: Transaction list showing:
  - Date, description, category (with color indicator), amount
  - Filter options (All, Income, Expenses, by Category, by Date)
  - Edit/Delete buttons per transaction
  - Total summary
- Savings Goals section with:
  - Goal cards showing name, target, progress bar, percentage
  - "Add New Goal" button
- Insights/Analytics section with:
  - Spending by category chart (pie or bar chart)
  - Monthly trend chart (line chart)
  - AI-generated insights card with personalized messages
- Floating Action Button (FAB) or prominent "Add Transaction" button
- Navigation: Top nav or bottom nav (mobile) or sidebar (desktop)
- Layout should be dashboard-style, organized, easy to scan

**6. Page 6 - Rubric Evidence (RBA Protected - Instructors Only)**
- **Access Control**: Banner indicating "Instructor/Coach Access Only"
- Display logged-in user's email/role
- **CCC.1.1 Section**:
  - Heading: "CCC.1.1 - Understanding the Problem"
  - Brief description of competency
  - "Where to See It" with bullet points linking to Page 2 and README
  - Prominent buttons: "View Page 2 - About", "View README Problem Section"
- **CCC.1.2 Section**:
  - Heading: "CCC.1.2 - Planning a Solution"
  - Brief description of competency
  - "Where to See It" with bullet points linking to wireframes, Page 3, project plan
  - Prominent buttons: "View Wireframes", "View Page 3 - Why Pennywise?", "View Project Plan"
- **CCC.1.3 Section**:
  - Heading: "CCC.1.3 - Building a Working App"
  - Brief description of competency
  - "Where to See It" with bullet points linking to Page 5 (working product)
  - Prominent buttons: "View Page 5 - Product", "Test Live Application"
- Quick navigation links to all pages
- Clean, organized layout with clear sections for each competency
- Make buttons/links prominent for easy instructor navigation

**7. Page 7 - Reflection (RBA Protected - Instructors Only)**
- **Access Control**: Banner indicating "Instructor/Coach Access Only"
- **What Went Well Section**: Text area or formatted content for project successes
- **What Didn't Go Well Section**: Text area or formatted content for challenges
- **What Changed During Project Section**: Document scope/feature/technical changes and reasons
- **Future Plans Section**: What would be built next with more time
- Blog-post or form-like layout, clean and readable
- Each section clearly labeled and separated

#### Layout & Navigation Expectations

- **Navigation Type**: 
  - Desktop: Top navigation bar with logo on left, links in center/right
  - Mobile: Bottom navigation bar or hamburger menu
  - Pages 6 & 7 should only be accessible via navigation when user has coach/instructor role
- **Hierarchy**: 
  - Clear visual hierarchy with headings, subheadings
  - Important CTAs should be prominent (larger, contrasting colors)
  - Content sections should be well-spaced
- **Responsive Design**:
  - Mobile-first approach
  - Single column layouts on mobile, multi-column on desktop
  - Touch-friendly buttons and inputs (minimum 44px height)
  - Charts and data visualizations should be readable on small screens

#### Design Guidelines

- **Color Palette**: 
  - Use friendly, approachable colors (avoid harsh reds for negative, consider softer tones)
  - Green for positive/income, orange/red for expenses (but softer than typical finance apps)
  - Light background, dark text for readability
  - Accent colors for categories and features
- **Typography**: 
  - Clean, modern sans-serif fonts
  - Clear hierarchy (large headings, readable body text)
  - Avoid overly formal or corporate fonts
- **Spacing**: 
  - Generous whitespace for clarity
  - Consistent padding and margins
  - Cards and sections should feel breathable
- **Icons**: 
  - Use simple, recognizable icons
  - Category icons (food, transportation, entertainment, etc.)
  - Action icons (add, edit, delete, filter)
- **Visual Style**: 
  - Modern, clean design
  - Rounded corners on cards/buttons (friendly feel)
  - Subtle shadows for depth
  - Avoid overwhelming users with too much information at once

#### Special Considerations

- **RBA Protection**: Visually indicate on wireframes that Pages 6 & 7 are protected (maybe with a lock icon or different styling)
- **AI Features**: Make AI-powered features visually distinct (perhaps with a badge, different color, or icon)
- **Empty States**: Show wireframes for empty states (e.g., no transactions yet, no goals set)
- **Loading States**: Consider showing loading indicators for data fetching
- **Error States**: Consider error message placement (e.g., form validation errors)

#### Output Requirements

- Create wireframes for all 7 pages
- Use low-fidelity style (simple shapes, placeholders for images, basic typography)
- Show mobile and desktop versions for key pages (at least Pages 1 and 5)
- Include annotations explaining key interactions or features
- Use consistent component styles across pages
- Ensure wireframes clearly show user flow and navigation between pages

---

**End of Figma AI Prompt**

---

## Additional Notes for Implementation

### Mobile-First Considerations

- All wireframes should be designed mobile-first (320px width minimum)
- Breakpoints to consider:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+

### Accessibility

- Ensure sufficient color contrast (WCAG AA minimum)
- Touch targets minimum 44x44px
- Form labels clearly associated with inputs
- Keyboard navigation support indicated

### Technical Implementation Notes

- Pages 6 & 7 require authentication middleware check
- Transaction forms should include client-side validation
- Charts should be responsive and use libraries like Recharts
- AI features should show loading states and error handling

---

## Wireframe Links & References

Once wireframes are created in Figma/Canva/Excalidraw, add the links here:

- **Figma Wireframes**: [Link to be added]
- **Canva Wireframes**: [Link to be added]
- **Excalidraw Wireframes**: [Link to be added]

