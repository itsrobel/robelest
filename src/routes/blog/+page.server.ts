import { getBlogPosts, getAllTags } from '$lib/notion-blog';
import type { PageServerLoad } from './$types';

// Enable prerendering with ISR
export const prerender = true;

// Revalidate every hour (3600 seconds)
export const config = {
	isr: {
		expiration: 3600
	}
};

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	// Set cache headers for ISR
	setHeaders({
		'cache-control': 'public, max-age=3600'
	});

	// Get query parameters for filtering
	const tag = url.searchParams.get('tag');
	const featured = url.searchParams.get('featured') === 'true';

	// Fetch blog posts
	const posts = await getBlogPosts({
		publishedOnly: true,
		featuredOnly: featured,
		tag: tag || undefined
	});

	// Fetch all available tags
	const tags = await getAllTags();

	return {
		posts,
		tags,
		selectedTag: tag,
		showFeaturedOnly: featured
	};
};
