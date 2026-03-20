# How to Push GigShield AI to GitHub

Follow these steps to push your project to GitHub and deploy it.

## Option 1: Using v0's Built-in GitHub Integration (Easiest)

### Step 1: Connect GitHub to v0
1. Click the **Settings** button (gear icon) in the top right of v0
2. Go to the **Git** tab
3. Click **Connect GitHub**
4. Authorize v0 to access your GitHub account
5. Select "Create new repository"
6. Name it: `gigshield-ai`
7. Click **Create**

### Step 2: v0 Will Auto-Push
Once connected, v0 will automatically:
- Initialize the git repository
- Commit all your changes
- Push to your new GitHub repository

Your repository is now live at: `https://github.com/YOUR_USERNAME/gigshield-ai`

---

## Option 2: Manual Git Setup (If you prefer command line)

### Step 1: Initialize Git Repository
```bash
cd /vercel/share/v0-project
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 2: Create `.gitignore` (if it doesn't exist)
The project should already have one, but verify it includes:
```
node_modules/
.next/
.env.local
.env.*.local
*.log
.DS_Store
```

### Step 3: Stage and Commit
```bash
git add .
git commit -m "Initial commit: GigShield AI - Parametric insurance for India's gig workers"
```

### Step 4: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `gigshield-ai`
3. Description: "AI-powered parametric insurance for India's 450M+ gig workers"
4. Choose **Public** (so others can see it)
5. **Do NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

### Step 5: Add Remote and Push
```bash
git remote add origin https://github.com/YOUR_USERNAME/gigshield-ai.git
git branch -M main
git push -u origin main
```

### Step 6: Verify
Visit: `https://github.com/YOUR_USERNAME/gigshield-ai`

---

## Deploy to Vercel (Optional)

### Automatic Deployment via GitHub
1. Go to https://vercel.com
2. Click **New Project**
3. Click **Import Git Repository**
4. Select your `gigshield-ai` repository
5. Click **Import**
6. Vercel will auto-detect Next.js and configure everything
7. Click **Deploy**

Your live website will be at: `https://gigshield-ai.vercel.app`

### Alternative: Deploy from v0
1. In v0, click the **Publish** button (top right)
2. Select **Vercel**
3. Authorize and connect your Vercel account
4. Click **Deploy**

---

## Project Structure

```
gigshield-ai/
├── app/
│   ├── layout.tsx           # Root layout with navbar & footer
│   ├── page.tsx             # Landing page (/)
│   ├── globals.css          # Global styles & theme
│   ├── dashboard/
│   │   └── page.tsx         # Worker dashboard (/dashboard)
│   ├── insurer/
│   │   └── page.tsx         # Insurer portal (/insurer)
│   ├── live/
│   │   └── page.tsx         # Live control room (/live)
│   ├── onboarding/
│   │   └── page.tsx         # Sign-up flow (/onboarding)
│   ├── about/
│   │   └── page.tsx         # About page (/about)
│   └── api-docs/
│       └── page.tsx         # API documentation (/api-docs)
├── components/
│   ├── navbar.tsx           # Top navigation bar
│   ├── footer.tsx           # Footer component
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── mockData.ts          # Mock data (workers, claims, etc)
│   └── utils.ts             # Utility functions
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── next.config.mjs          # Next.js config
├── postcss.config.mjs       # PostCSS config
├── tailwind.config.ts       # Tailwind config
└── README.md                # Project documentation
```

---

## Features

### Pages
- **Landing Page (/)** - Hero, problem, how-it-works, pricing, CTA
- **Dashboard (/dashboard)** - Worker earnings shield score, claims, coverage
- **Live (/live)** - Real-time disruption monitoring, simulation, event feed
- **Onboarding (/onboarding)** - 3-step sign-up flow with platform selection
- **Insurer (/insurer)** - Insurance company analytics and portfolio management
- **About (/about)** - Company mission, team, technology stack
- **API Docs (/api-docs)** - REST API documentation

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4.2 + custom dark theme
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Language**: TypeScript
- **Animations**: CSS keyframes, Framer Motion (optional)

### Color Scheme (Dark Theme)
- **Primary**: #FF5722 (Deep Orange)
- **Secondary**: #00E5FF (Cyan)
- **Accent**: #00C853 (Green)
- **Background**: #0F0F1E (Very Dark Blue)
- **Card**: #1A1A2E (Dark Blue)

---

## Quick Start for Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/gigshield-ai.git
cd gigshield-ai

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev

# Open http://localhost:3000
```

---

## Commit Message Examples

Good commit messages for your project:

```
git commit -m "Add dashboard with ESS gauge and claims table"
git commit -m "Create live control room with event feed"
git commit -m "Build onboarding flow with terminal animation"
git commit -m "Update navbar with all page links"
git commit -m "Add insurer portal with analytics"
```

---

## GitHub Best Practices

1. **Keep commits atomic** - One feature per commit
2. **Write clear messages** - "Add X" not "stuff" or "updates"
3. **Push regularly** - Don't wait to push many changes at once
4. **Use branches** - Create `feature/add-xyz` branches for new features
5. **Open PRs** - Even for small features, opens discussion

Example workflow:
```bash
# Create a feature branch
git checkout -b feature/add-animations

# Make changes, commit
git add .
git commit -m "Add scroll animations with GSAP"

# Push to GitHub
git push origin feature/add-animations

# Open a Pull Request on GitHub (for review)
```

---

## Troubleshooting

### Error: "Fatal error during initialization"
- Clear `.next` folder: `rm -rf .next`
- Clear cache: `npm run clean` (if defined in package.json)
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Restart dev server

### Error: "Module not found"
- Check import paths use `@/` alias
- Verify file exists and is in correct folder
- Run `npm install` to ensure all dependencies are installed

### CSS Not Loading
- Check Tailwind import in `app/globals.css`
- Verify PostCSS config exists
- Restart dev server after changes to CSS

---

## Next Steps

1. Push to GitHub following the steps above
2. Deploy to Vercel
3. Share your live link with others
4. Continuously update and improve the platform
5. Add more features like animations, real data integration, etc.

---

## Support

For issues with:
- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Vercel Deployment**: https://vercel.com/docs

Happy coding! 🚀
