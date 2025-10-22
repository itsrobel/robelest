<script lang="ts">
	import type { PageData } from './$types';
	import type { ContentBlock } from '$lib/notion-blog';

	export let data: PageData;

	const { post } = data;

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// Group consecutive list items
	function groupBlocks(blocks: ContentBlock[]): any[] {
		const grouped: any[] = [];
		let currentList: ContentBlock[] | null = null;
		let currentListType: string | null = null;

		for (const block of blocks) {
			if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
				if (currentListType === block.type) {
					currentList?.push(block);
				} else {
					if (currentList) {
						grouped.push({ type: currentListType, items: currentList });
					}
					currentList = [block];
					currentListType = block.type;
				}
			} else {
				if (currentList) {
					grouped.push({ type: currentListType, items: currentList });
					currentList = null;
					currentListType = null;
				}
				grouped.push(block);
			}
		}

		if (currentList) {
			grouped.push({ type: currentListType, items: currentList });
		}

		return grouped;
	}

	$: groupedBlocks = groupBlocks(post.blocks);
</script>

<svelte:head>
	<title>{post.title} | Robel Estifanos</title>
	<meta name="description" content={post.description || post.title} />

	<!-- Open Graph / Social Media -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description || post.title} />
	{#if post.ogImage}
		<meta property="og:image" content={post.ogImage} />
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.description || post.title} />
	{#if post.ogImage}
		<meta name="twitter:image" content={post.ogImage} />
	{/if}
</svelte:head>

<article class="min-h-screen bg-base py-16 px-6">
	<div class="max-w-3xl mx-auto">
		<!-- Back button -->
		<a
			href="/blog"
			class="inline-flex items-center gap-2 text-rose hover:text-text transition-colors mb-8"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="m15 18-6-6 6-6" />
			</svg>
			Back to blog
		</a>

		<!-- Post header -->
		<header class="mb-12">
			<div class="flex flex-wrap gap-2 mb-4">
				{#if post.featured}
					<span class="inline-block px-3 py-1 rounded-full text-xs bg-gold text-base font-medium">
						Featured
					</span>
				{/if}
				{#each post.tags as tag}
					<span class="inline-block px-3 py-1 rounded-full text-xs bg-rose/20 text-rose">
						{tag}
					</span>
				{/each}
			</div>

			<h1 class="text-4xl md:text-5xl font-bold text-text mb-4 leading-tight">
				{post.title}
			</h1>

			{#if post.description}
				<p class="text-xl text-muted mb-4 leading-relaxed">
					{post.description}
				</p>
			{/if}

			<time class="text-sm text-muted">{formatDate(post.publishDate)}</time>
		</header>

		<!-- Post content -->
		<div class="prose prose-rose max-w-none">
			{#each groupedBlocks as block}
				{#if block.type === 'paragraph'}
					<p class="text-text mb-6 leading-relaxed">{block.content}</p>
				{:else if block.type === 'heading_1'}
					<h2 class="text-3xl font-bold text-text mt-12 mb-6">{block.content}</h2>
				{:else if block.type === 'heading_2'}
					<h3 class="text-2xl font-bold text-text mt-10 mb-4">{block.content}</h3>
				{:else if block.type === 'heading_3'}
					<h4 class="text-xl font-bold text-text mt-8 mb-3">{block.content}</h4>
				{:else if block.type === 'bulleted_list_item'}
					<ul class="list-disc list-inside space-y-2 mb-6 text-text">
						{#each block.items as item}
							<li class="ml-4">{item.content}</li>
						{/each}
					</ul>
				{:else if block.type === 'numbered_list_item'}
					<ol class="list-decimal list-inside space-y-2 mb-6 text-text">
						{#each block.items as item}
							<li class="ml-4">{item.content}</li>
						{/each}
					</ol>
				{:else if block.type === 'code'}
					<pre class="bg-surface border-2 border-muted rounded-lg p-4 mb-6 overflow-x-auto"><code
							class="text-sm text-text">{block.content}</code></pre>
				{:else if block.type === 'quote'}
					<blockquote
						class="border-l-4 border-rose pl-6 py-2 mb-6 text-muted italic bg-surface/50 rounded-r-lg"
					>
						{block.content}
					</blockquote>
				{:else if block.type === 'callout'}
					<div
						class="bg-gold/10 border-2 border-gold rounded-lg p-6 mb-6 text-text"
					>
						{block.content}
					</div>
				{:else if block.type === 'image' && block.url}
					<figure class="mb-8">
						<img
							src={block.url}
							alt={block.content || 'Blog post image'}
							class="rounded-lg w-full shadow-lg"
							loading="lazy"
						/>
						{#if block.content}
							<figcaption class="text-sm text-muted text-center mt-2">
								{block.content}
							</figcaption>
						{/if}
					</figure>
				{:else if block.type === 'divider'}
					<hr class="my-8 border-t-2 border-surface" />
				{/if}
			{/each}
		</div>

		<!-- Post footer -->
		<footer class="mt-16 pt-8 border-t-2 border-surface">
			<a
				href="/blog"
				class="inline-flex items-center gap-2 text-rose hover:text-text transition-colors"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="m15 18-6-6 6-6" />
				</svg>
				Back to blog
			</a>
		</footer>
	</div>
</article>

<style>
	/* Custom styling for prose content */
	.prose {
		line-height: 1.75;
	}

	.prose code {
		font-family: 'Courier New', monospace;
	}

	/* Smooth transitions */
	a {
		transition: all 0.2s ease;
	}
</style>
