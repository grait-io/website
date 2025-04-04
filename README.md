This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare Pages

This project is configured for static export compatible with [Cloudflare Pages](https://pages.cloudflare.com/).

### Deployment steps:
- Connect this repository to Cloudflare Pages via the dashboard.
- Set **Production branch** to `main`.
- Set **Build command** to `npm run build`.
- Set **Build output directory** to `public`.
- Leave **Root directory** empty (default).

After deployment, your static site will be served from Cloudflare's edge network.

### Cloudflare Pages Functions
An example serverless function is included at `functions/api/hello.js`. It responds with a simple message and can be accessed at `/api/hello` after deployment.
