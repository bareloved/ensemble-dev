# Vercel Deployment Instructions - Ensemble App

## ✅ Pre-Deployment Checklist Complete

All preparation tasks have been completed successfully:

- [x] TypeScript type errors fixed (20+ fixes)
- [x] Database types updated from Supabase
- [x] Production build succeeds (`npm run build`)
- [x] All changes committed and pushed to GitHub
- [x] Environment variables documented
- [x] No sensitive data in commits
- [x] `.env` files properly ignored

## Deployment Steps

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `bareloved/ensemble-dev`
4. Select the `main` branch

### Step 2: Configure Environment Variables

Before deploying, add these environment variables in Vercel:

#### Required (App Will Not Work Without These):
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

#### Optional (Features Disabled Without These):
```
GOOGLE_CALENDAR_CLIENT_ID=your-google-client-id
GOOGLE_CALENDAR_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALENDAR_REDIRECT_URI=https://your-app.vercel.app/api/auth/google-calendar/callback
RESEND_API_KEY=re_your_resend_api_key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**To add variables in Vercel:**
1. In your project settings, go to "Environment Variables"
2. Add each variable
3. Select "Production" environment
4. Click "Save"

See `ENVIRONMENT_VARIABLES.md` for detailed instructions on where to get each value.

### Step 3: Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)
- **Node Version:** 20.x (recommended)

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Vercel will show you the deployment URL

## Post-Deployment Checklist

After deployment succeeds, test these features:

### Critical Features (Must Work):
- [ ] App loads at deployment URL
- [ ] User can sign up / sign in
- [ ] Dashboard shows gigs
- [ ] Can create a new project
- [ ] Can create a new gig
- [ ] Can add roles to a gig
- [ ] Profile page loads
- [ ] Money page loads

### Optional Features (If Configured):
- [ ] Google Calendar integration works
- [ ] Email invitations send correctly
- [ ] Calendar ICS feed generates

### Database Migrations

**IMPORTANT:** Make sure all database migrations are applied to your production Supabase instance:

```bash
# Check which migrations exist locally
ls supabase/migrations/

# These migrations must be applied:
- 20251120000003_setup_avatars_storage.sql
- 20251120000004_extract_google_avatar.sql
- 20251120000005_money_view_v1.sql
```

See `docs/deployment/migration-testing-checklist.md` for detailed migration verification steps.

## Troubleshooting

### If Build Fails:

1. **Check build logs in Vercel**
   - Look for TypeScript errors
   - Look for missing dependencies
   - Look for environment variable issues

2. **Common Issues:**
   - Missing environment variables → Add them in Vercel settings
   - TypeScript errors → Should not happen (we tested locally)
   - Memory issues → Increase memory limit in Vercel settings

### If App Loads But Doesn't Work:

1. **Check browser console for errors**
   - Often related to environment variables
   - Check Network tab for failed API calls

2. **Verify Supabase connection:**
   - Make sure `NEXT_PUBLIC_SUPABASE_URL` is correct
   - Make sure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
   - Test with: Open browser console and try to sign in

3. **Check Vercel function logs:**
   - Go to Vercel dashboard → Deployments → Your deployment
   - Click "Functions" tab to see serverless function logs

### If Database Queries Fail:

1. **Check RLS policies:**
   - Make sure Row Level Security policies are set up
   - Test queries in Supabase SQL editor

2. **Check migrations:**
   - Verify all migrations are applied to production database
   - Use Supabase dashboard → Database → Migrations

## Rollback Plan

If deployment fails or causes issues:

1. **In Vercel dashboard:**
   - Go to Deployments
   - Find the previous working deployment
   - Click "..." menu → "Promote to Production"

2. **Fix issues locally:**
   - Pull the latest code
   - Fix the issue
   - Test with `npm run build`
   - Commit and push
   - Vercel will auto-deploy again

## Performance Monitoring

After deployment:

1. **Monitor Vercel Analytics:**
   - Check page load times
   - Monitor function execution times
   - Watch for errors in logs

2. **Check Supabase metrics:**
   - Monitor database query performance
   - Check connection pool usage
   - Watch for slow queries

## Domain Setup (Optional)

To use a custom domain:

1. In Vercel project settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` environment variable
5. Update `GOOGLE_CALENDAR_REDIRECT_URI` if using Google Calendar

## Success Criteria

Deployment is successful when:

✅ Build completes without errors  
✅ App loads at Vercel URL  
✅ Users can sign up and sign in  
✅ Dashboard displays correctly  
✅ Can create projects and gigs  
✅ No console errors in browser  
✅ Database queries work correctly  

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Supabase + Vercel: https://supabase.com/docs/guides/hosting/vercel
- Our docs: `docs/deployment/post-deployment-checklist.md`

---

**Prepared:** November 21, 2025  
**Commit:** b65ecfb  
**Branch:** main  
**Status:** Ready for deployment ✅

