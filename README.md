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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Public API services

Set backend base URL:

- Add NEXT_PUBLIC_API_URL to your environment (e.g., http://localhost:4000)

Provided helpers:

- `src/lib/api/client.ts` – minimal fetch wrapper with JSON and error handling
- `src/lib/api/public.ts` – typed services for categories, countries, manufacturers, products, and orders
- `src/lib/api/hooks.ts` – optional React Query hooks (use in client components)
- `src/lib/client-id.ts` – helper to create/persist clientId per docs

Example (server component or route):

```ts
import { getProducts } from '@/lib/api/public';

const data = await getProducts({ qLike: 'comp', page: 1, limit: 12 });
```

Example (client component with React Query):

```tsx
"use client";
import { useProducts } from '@/lib/api/hooks';

export default function CatalogList() {
	const { data, isLoading, error } = useProducts({ page: 1, limit: 20 });
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {String(error)}</div>;
	return (
		<ul>
			{data?.items.map(p => (
				<li key={p._id || p.slug}>{p.titleI18n.uk}</li>
			))}
		</ul>
	);
}
```
