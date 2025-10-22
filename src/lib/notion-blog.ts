import { notion, NOTION_DATABASE_ID } from '$lib/notion';
import type {
	PageObjectResponse,
	PartialPageObjectResponse,
	BlockObjectResponse,
	PartialBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

// Type for our blog post
export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	description: string;
	publishDate: string;
	tags: string[];
	featured: boolean;
	published: boolean;
	ogImage?: string;
}

// Type for blog post with content
export interface BlogPostWithContent extends BlogPost {
	blocks: ContentBlock[];
}

// Simplified content block type
export interface ContentBlock {
	type: string;
	content: string;
	children?: ContentBlock[];
	language?: string; // for code blocks
	url?: string; // for images/links
}

/**
 * Check if response is a full page
 */
function isFullPage(
	response: PageObjectResponse | PartialPageObjectResponse
): response is PageObjectResponse {
	return 'properties' in response;
}

/**
 * Extract plain text from Notion rich text array
 */
function extractPlainText(richText: any[]): string {
	if (!richText || !Array.isArray(richText)) return '';
	return richText.map((text) => text.plain_text || '').join('');
}

/**
 * Parse a Notion page into a BlogPost object
 */
function parsePageToBlogPost(page: PageObjectResponse): BlogPost | null {
	try {
		const properties = page.properties;

		// Extract properties - adjust these field names to match your Notion database
		const title = 'Title' in properties && properties.Title.type === 'title'
			? extractPlainText(properties.Title.title)
			: '';

		const slug = 'Slug' in properties && properties.Slug.type === 'rich_text'
			? extractPlainText(properties.Slug.rich_text)
			: '';

		const description = 'Description' in properties && properties.Description.type === 'rich_text'
			? extractPlainText(properties.Description.rich_text)
			: '';

		const published = 'Published' in properties && properties.Published.type === 'checkbox'
			? properties.Published.checkbox
			: false;

		const featured = 'Featured' in properties && properties.Featured.type === 'checkbox'
			? properties.Featured.checkbox
			: false;

		const publishDate = 'PublishDate' in properties && properties.PublishDate.type === 'date'
			? properties.PublishDate.date?.start || new Date().toISOString()
			: new Date().toISOString();

		const tags = 'Tags' in properties && properties.Tags.type === 'multi_select'
			? properties.Tags.multi_select.map((tag) => tag.name)
			: [];

		const ogImage = 'OGImage' in properties && properties.OGImage.type === 'url'
			? properties.OGImage.url || undefined
			: undefined;

		if (!title || !slug) {
			console.warn(`Page ${page.id} missing required title or slug`);
			return null;
		}

		return {
			id: page.id,
			title,
			slug,
			description,
			publishDate,
			tags,
			featured,
			published,
			ogImage
		};
	} catch (error) {
		console.error('Error parsing page:', error);
		return null;
	}
}

/**
 * Query all published blog posts from Notion
 */
export async function getBlogPosts(options: {
	publishedOnly?: boolean;
	featuredOnly?: boolean;
	tag?: string;
} = {}): Promise<BlogPost[]> {
	const { publishedOnly = true, featuredOnly = false, tag } = options;

	try {
		// Build filter conditions
		const filters: any[] = [];

		if (publishedOnly) {
			filters.push({
				property: 'Published',
				checkbox: {
					equals: true
				}
			});
		}

		if (featuredOnly) {
			filters.push({
				property: 'Featured',
				checkbox: {
					equals: true
				}
			});
		}

		if (tag) {
			filters.push({
				property: 'Tags',
				multi_select: {
					contains: tag
				}
			});
		}

		// Query the database
		const response = await notion.databases.query({
			database_id: NOTION_DATABASE_ID,
			filter: filters.length > 0 ? { and: filters } : undefined,
			sorts: [
				{
					property: 'PublishDate',
					direction: 'descending'
				}
			]
		});

		// Parse and filter results
		const posts: BlogPost[] = [];
		for (const page of response.results) {
			if (isFullPage(page)) {
				const post = parsePageToBlogPost(page);
				if (post) {
					posts.push(post);
				}
			}
		}

		return posts;
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return [];
	}
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
	try {
		// Query for the specific post
		const response = await notion.databases.query({
			database_id: NOTION_DATABASE_ID,
			filter: {
				property: 'Slug',
				rich_text: {
					equals: slug
				}
			}
		});

		if (response.results.length === 0) {
			return null;
		}

		const page = response.results[0];
		if (!isFullPage(page)) {
			return null;
		}

		const post = parsePageToBlogPost(page);
		if (!post) {
			return null;
		}

		// Fetch the page content (blocks)
		const blocks = await getPageBlocks(page.id);

		return {
			...post,
			blocks
		};
	} catch (error) {
		console.error('Error fetching blog post by slug:', error);
		return null;
	}
}

/**
 * Get all blocks for a page
 */
async function getPageBlocks(pageId: string): Promise<ContentBlock[]> {
	try {
		const blocks: ContentBlock[] = [];
		let cursor: string | undefined = undefined;

		// Notion paginates block results, so we need to loop
		do {
			const response: any = await notion.blocks.children.list({
				block_id: pageId,
				start_cursor: cursor,
				page_size: 100
			});

			for (const block of response.results) {
				const contentBlock = await parseBlock(block);
				if (contentBlock) {
					blocks.push(contentBlock);
				}
			}

			cursor = response.next_cursor;
		} while (cursor);

		return blocks;
	} catch (error) {
		console.error('Error fetching page blocks:', error);
		return [];
	}
}

/**
 * Parse a Notion block into a ContentBlock
 */
async function parseBlock(block: any): Promise<ContentBlock | null> {
	if (!block.type) return null;

	try {
		switch (block.type) {
			case 'paragraph': {
				const text = extractPlainText(block.paragraph.rich_text);
				return { type: 'paragraph', content: text };
			}

			case 'heading_1': {
				const text = extractPlainText(block.heading_1.rich_text);
				return { type: 'heading_1', content: text };
			}

			case 'heading_2': {
				const text = extractPlainText(block.heading_2.rich_text);
				return { type: 'heading_2', content: text };
			}

			case 'heading_3': {
				const text = extractPlainText(block.heading_3.rich_text);
				return { type: 'heading_3', content: text };
			}

			case 'bulleted_list_item': {
				const text = extractPlainText(block.bulleted_list_item.rich_text);
				return { type: 'bulleted_list_item', content: text };
			}

			case 'numbered_list_item': {
				const text = extractPlainText(block.numbered_list_item.rich_text);
				return { type: 'numbered_list_item', content: text };
			}

			case 'code': {
				const text = extractPlainText(block.code.rich_text);
				const language = block.code.language || 'text';
				return { type: 'code', content: text, language };
			}

			case 'quote': {
				const text = extractPlainText(block.quote.rich_text);
				return { type: 'quote', content: text };
			}

			case 'callout': {
				const text = extractPlainText(block.callout.rich_text);
				return { type: 'callout', content: text };
			}

			case 'image': {
				const url =
					block.image.type === 'external'
						? block.image.external?.url
						: block.image.file?.url;
				const caption = extractPlainText(block.image.caption || []);
				return { type: 'image', content: caption, url };
			}

			case 'divider': {
				return { type: 'divider', content: '' };
			}

			default:
				console.warn(`Unsupported block type: ${block.type}`);
				return null;
		}
	} catch (error) {
		console.error(`Error parsing block of type ${block.type}:`, error);
		return null;
	}
}

/**
 * Get all unique tags from blog posts
 */
export async function getAllTags(): Promise<string[]> {
	const posts = await getBlogPosts({ publishedOnly: true });
	const tagsSet = new Set<string>();

	posts.forEach((post) => {
		post.tags.forEach((tag) => tagsSet.add(tag));
	});

	return Array.from(tagsSet).sort();
}
