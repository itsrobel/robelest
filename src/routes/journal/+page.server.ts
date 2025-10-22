import { getBlogPosts } from '$lib/notion-blog';
import type { PageServerLoad } from './$types';

// Enable prerendering with ISR
export const prerender = true;

// Revalidate every hour (3600 seconds)
export const config = {
	isr: {
		expiration: 3600
	}
};

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Set cache headers for ISR
	setHeaders({
		'cache-control': 'public, max-age=3600'
	});

	// Fetch all published blog posts
	const posts = await getBlogPosts({
		publishedOnly: true
	});

	return {
		posts
	};
};
