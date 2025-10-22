import { getBlogPostBySlug } from '$lib/notion-blog';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Enable prerendering with ISR
export const prerender = true;

// Revalidate every hour (3600 seconds)
export const config = {
	isr: {
		expiration: 3600
	}
};

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	// Set cache headers for ISR
	setHeaders({
		'cache-control': 'public, max-age=3600'
	});

	const post = await getBlogPostBySlug(params.slug);

	if (!post) {
		throw error(404, {
			message: 'Blog post not found'
		});
	}

	// Only show published posts
	if (!post.published) {
		throw error(404, {
			message: 'Blog post not found'
		});
	}

	return {
		post
	};
};
