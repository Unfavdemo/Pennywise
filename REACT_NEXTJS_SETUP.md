# React & Next.js Setup Documentation

## Overview

This project uses **Next.js 14** (Pages Router), which is built on **React 18**. All code follows React and Next.js best practices.

## Architecture

### Next.js Pages Router Structure
- ✅ `pages/_app.tsx` - Root app component with providers
- ✅ `pages/index.tsx` - Home page (route: `/`)
- ✅ `pages/*.tsx` - File-based routing (each file = a route)
- ✅ All pages are React functional components

### React Patterns Used

#### 1. **React Hooks**
- `useState` - Component state management
- `useEffect` - Side effects and lifecycle
- `useContext` - Context API for global state
- `useRouter` - Next.js routing (from `next/router`)

#### 2. **React Context API**
- `AuthContext` - Authentication state
- `AccessibilityContext` - Accessibility settings
- Both use `createContext` and `Provider` patterns

#### 3. **Component Patterns**
- Functional components (modern React)
- Proper TypeScript typing
- Component composition
- Props drilling where appropriate
- Context for shared state

#### 4. **Next.js Features**
- File-based routing (Pages Router)
- `Link` component for client-side navigation
- `useRouter` hook for programmatic navigation
- `_app.tsx` for global providers
- CSS modules support via Tailwind

## File Structure

```
pages/
  ├── _app.tsx          # Root app with providers
  ├── index.tsx         # Home page (/)
  ├── about.tsx         # /about
  ├── login.tsx         # /login
  └── ...

components/
  ├── Navigation.tsx    # Reusable React component
  ├── Footer.tsx        # Reusable React component
  └── ui/               # shadcn/ui components

context/
  ├── AuthContext.tsx   # React Context Provider
  └── AccessibilityContext.tsx  # React Context Provider
```

## Key React/Next.js Conventions

### ✅ Pages (Next.js)
- Default export of React component
- File name = route path
- `index.tsx` = home route (`/`)

### ✅ Components (React)
- Functional components
- TypeScript interfaces for props
- Reusable and composable

### ✅ Context (React)
- Custom hooks (`useAuth`, `useAccessibility`)
- Providers wrap app in `_app.tsx`
- Type-safe with TypeScript

### ✅ Navigation (Next.js)
- Use `Link` from `next/link` (not `react-router-dom`)
- Use `useRouter` from `next/router` for programmatic navigation
- Client-side routing with prefetching

## Dependencies

```json
{
  "react": "^18.3.0",        // React core
  "react-dom": "^18.3.0",    // React DOM
  "next": "^14.2.0"          // Next.js (includes React)
}
```

## Best Practices Implemented

1. ✅ **Functional Components** - All components use modern React syntax
2. ✅ **Hooks** - useState, useEffect, useContext properly used
3. ✅ **TypeScript** - Full type safety
4. ✅ **Context API** - Global state management
5. ✅ **Component Composition** - Reusable, modular components
6. ✅ **Next.js Routing** - File-based routing system
7. ✅ **Client-Side Navigation** - Next.js Link component
8. ✅ **Server-Side Ready** - Can add getServerSideProps/getStaticProps

## Notes

- The `"use client"` directives in UI components are for Next.js App Router compatibility but are harmless in Pages Router (ignored)
- All routing uses Next.js conventions (not React Router)
- All components are React functional components
- TypeScript ensures type safety throughout

## Development Commands

```bash
npm run dev    # Start Next.js dev server (includes React)
npm run build  # Build for production
npm run start  # Start production server
```

## Summary

✅ **React**: All code uses React 18 patterns (hooks, functional components, Context API)
✅ **Next.js**: Proper Next.js Pages Router structure and conventions
✅ **TypeScript**: Full type safety
✅ **Best Practices**: Modern React and Next.js patterns throughout

The codebase is already properly structured for React and Next.js!

