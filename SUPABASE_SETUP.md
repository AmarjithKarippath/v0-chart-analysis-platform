# Supabase Google Authentication Setup Guide

This guide will help you connect your chart analysis platform to an external Supabase project with Google OAuth authentication.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- A Google Cloud Console account for OAuth credentials

## Step 1: Create a Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in your project details:
   - Project name: `chart-analysis-platform` (or your preferred name)
   - Database password: (create a strong password)
   - Region: (choose closest to your users)
4. Click "Create new project" and wait for setup to complete

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Step 3: Set Up Google OAuth Provider

### 3.1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure the OAuth consent screen if prompted:
   - User Type: External
   - App name: Chart Analysis Platform
   - User support email: your email
   - Developer contact: your email
6. For Application type, select **Web application**
7. Add Authorized redirect URIs:
   \`\`\`
   https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
   \`\`\`
   Replace `[YOUR-PROJECT-REF]` with your Supabase project reference (found in your Supabase project URL)
8. Click **Create** and copy:
   - Client ID
   - Client Secret

### 3.2: Configure Google Provider in Supabase

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list and click to expand
3. Enable the Google provider
4. Paste your Google OAuth credentials:
   - Client ID (from Google Cloud Console)
   - Client Secret (from Google Cloud Console)
5. Click **Save**

## Step 4: Configure Environment Variables

Add the following environment variables to your project:

### For Local Development

Create a `.env.local` file in your project root:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
\`\`\`

### For Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Make sure to add them for all environments (Production, Preview, Development)

## Step 5: Configure Redirect URLs

1. In Supabase dashboard, go to **Authentication** → **URL Configuration**
2. Add your site URLs to **Redirect URLs**:
   - For local development: `http://localhost:3000`
   - For production: `https://your-domain.com`

## Step 6: Test the Authentication

1. Start your development server:
   \`\`\`bash
   npm run dev
   \`\`\`
2. Open your app at `http://localhost:3000`
3. Click on a watchlist item 3 times to trigger the sign-in dialog
4. Click "Sign in with Google"
5. Complete the Google OAuth flow
6. You should be redirected back to your app, now authenticated

## Troubleshooting

### "Supabase environment variables not configured" warning

- Make sure your `.env.local` file exists and contains the correct variables
- Restart your development server after adding environment variables

### Google OAuth redirect error

- Verify that your redirect URI in Google Cloud Console matches exactly:
  `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
- Check that the Google provider is enabled in Supabase

### Authentication not persisting

- Check browser console for errors
- Verify that cookies are enabled in your browser
- Make sure your site URL is added to Supabase redirect URLs

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your Supabase anon key and Google OAuth credentials secure
- The anon key is safe to use in client-side code as it's protected by Row Level Security (RLS)
- Consider setting up RLS policies if you add database tables in the future

## Next Steps

Once authentication is working, you can:
- Add user profiles to store user preferences
- Save custom watchlists per user in Supabase database
- Track user's favorite stocks
- Add premium features for authenticated users
