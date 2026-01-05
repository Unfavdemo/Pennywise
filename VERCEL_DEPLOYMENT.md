# Vercel Deployment Troubleshooting Guide

## Common 404 Error Fixes

If you're seeing a 404 error on your Vercel deployment, follow these steps:

### 1. Check Environment Variables

**Required Environment Variables** (must be set in Vercel Dashboard → Settings → Environment Variables):

- `DATABASE_URL` - Your PostgreSQL connection string
  ```
  postgresql://user:password@host:port/database?schema=public
  ```
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)

**Optional:**
- `OPENAI_API_KEY` or `GEMINI_API_KEY` - For AI features
- `NODE_ENV` - Set to `production`

### 2. Verify Build Logs

1. Go to your Vercel project dashboard
2. Click on the latest deployment
3. Check the build logs for any errors
4. Common issues:
   - Missing `DATABASE_URL` during build (shouldn't fail, but check)
   - Prisma client generation errors
   - TypeScript compilation errors

### 3. Run Database Migrations

After setting environment variables, run migrations:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy
```

Or connect directly to your production database and run:
```bash
npx prisma migrate deploy
```

### 4. Redeploy

After fixing environment variables:
1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" on the latest deployment
3. Or push a new commit to trigger a new deployment

### 5. Check Function Logs

1. Go to Vercel Dashboard → Functions
2. Check for any runtime errors
3. Look for database connection errors

## Quick Checklist

- [ ] All required environment variables are set in Vercel
- [ ] Database migrations have been run
- [ ] Build completes successfully (check build logs)
- [ ] No errors in function logs
- [ ] `DATABASE_URL` is accessible from Vercel's IP addresses
- [ ] Database connection string is correct

## Still Having Issues?

1. **Check the build output** - Look for specific error messages
2. **Test locally** - Run `npm run build` locally to catch build errors
3. **Verify database access** - Ensure your database allows connections from Vercel
4. **Check Vercel status** - Visit status.vercel.com for service issues

