<script lang="ts">
	import type { PageData } from './$types';
	import type { ContentBlock } from '$lib/notion-blog';
	import { Crown } from '@lucide/svelte';

	export let data: PageData;

	const { post } = data;
	const currentYear = new Date().getFullYear();

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
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description || post.title} />
	{#if post.ogImage}
		<meta property="og:image" content={post.ogImage} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.description || post.title} />
	{#if post.ogImage}
		<meta name="twitter:image" content={post.ogImage} />
	{/if}
</svelte:head>

<div class="h-screen bg-[#faf4ed] text-[#575279] overflow-hidden relative">
	<!-- Lion of Judah Watermark -->
	<div class="fixed bottom-8 right-8 opacity-[0.04] pointer-events-none">
		<img
			src="/images/lion-of-judah.png"
			alt="Lion of Judah"
			width="280"
			height="280"
			loading="lazy"
			class="object-contain"
		/>
	</div>

	<!-- Geometric Background Elements -->
	<div class="absolute inset-0 pointer-events-none">
		<div
			class="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#ea9d34]/10 to-transparent"
		></div>
		<div
			class="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ea9d34]/10 to-transparent"
		></div>
		<div class="absolute top-32 right-1/3 w-2 h-2 bg-[#d7827e] rotate-45"></div>
		<div class="absolute bottom-48 left-16 w-3 h-3 border border-[#ea9d34] rotate-12"></div>
	</div>

	<div class="relative z-10 h-full flex flex-col">
		<!-- Navigation -->
		<nav class="px-4 sm:px-6 lg:px-12 py-4 sm:py-8 flex justify-between items-center">
			<a href="/" class="flex items-center gap-2 hover:opacity-70 transition-opacity">
				<Crown class="w-4 h-4 sm:w-5 sm:h-5 text-[#ea9d34]" />
				<span class="text-xs sm:text-sm font-medium">RE</span>
			</a>
			<a
				href="/journal"
				class="text-xs sm:text-sm text-[#9893a5] font-mono hover:text-[#575279] transition-colors"
			>
				← JOURNAL
			</a>
		</nav>

		<!-- Main Content -->
		<article class="flex-1 px-4 sm:px-6 lg:px-12 py-8 lg:py-16 overflow-y-auto">
			<div class="max-w-7xl mx-auto">
				<!-- Header -->
				<header class="mb-12 lg:mb-16">
					<div class="flex items-center gap-4 text-[#9893a5] text-xs font-mono mb-6">
						<time>{formatDate(post.publishDate)}</time>
						{#if post.tags.length > 0}
							<span>•</span>
							<div class="flex gap-2">
								{#each post.tags as tag}
									<span>{tag}</span>
								{/each}
							</div>
						{/if}
					</div>

					<h1
						class="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-[#575279] mb-6"
					>
						{post.title}
					</h1>

					{#if post.description}
						<p class="text-lg lg:text-xl text-[#9893a5] leading-relaxed">
							{post.description}
						</p>
					{/if}

					<div class="mt-8 flex justify-start">
						<div class="w-12 h-px bg-[#d7827e]"></div>
					</div>
				</header>

				<!-- Content -->
				<div class="prose-custom space-y-6">
					{#each groupedBlocks as block}
						{#if block.type === 'paragraph'}
							<p class="text-base lg:text-lg text-[#575279] leading-relaxed">
								{block.content}
							</p>
						{:else if block.type === 'heading_1'}
							<h2 class="text-2xl lg:text-3xl font-light text-[#575279] mt-12 mb-6">
								{block.content}
							</h2>
						{:else if block.type === 'heading_2'}
							<h3 class="text-xl lg:text-2xl font-light text-[#575279] mt-10 mb-4">
								{block.content}
							</h3>
						{:else if block.type === 'heading_3'}
							<h4 class="text-lg lg:text-xl font-light text-[#575279] mt-8 mb-3">
								{block.content}
							</h4>
						{:else if block.type === 'bulleted_list_item'}
							<ul class="space-y-2 ml-6">
								{#each block.items as item}
									<li class="text-base lg:text-lg text-[#575279] leading-relaxed list-disc">
										{item.content}
									</li>
								{/each}
							</ul>
						{:else if block.type === 'numbered_list_item'}
							<ol class="space-y-2 ml-6 list-decimal">
								{#each block.items as item}
									<li class="text-base lg:text-lg text-[#575279] leading-relaxed">
										{item.content}
									</li>
								{/each}
							</ol>
						{:else if block.type === 'code'}
							<div class="my-8">
								<div class="bg-[#f2e9e1] rounded-lg p-6 overflow-x-auto">
									<pre class="text-sm text-[#575279] font-mono leading-relaxed"><code>{block.content}</code></pre>
								</div>
							</div>
						{:else if block.type === 'quote'}
							<blockquote class="border-l-2 border-[#d7827e] pl-6 py-2 my-8">
								<p class="text-lg lg:text-xl text-[#9893a5] italic leading-relaxed">
									{block.content}
								</p>
							</blockquote>
						{:else if block.type === 'callout'}
							<div class="bg-[#ea9d34]/5 border-l-2 border-[#ea9d34] rounded-r-lg p-6 my-8">
								<p class="text-base lg:text-lg text-[#575279] leading-relaxed">
									{block.content}
								</p>
							</div>
						{:else if block.type === 'image' && block.url}
							<figure class="my-12">
								<img
									src={block.url}
									alt={block.content || 'Blog post image'}
									class="rounded-lg w-full"
									loading="lazy"
								/>
								{#if block.content}
									<figcaption class="text-sm text-[#9893a5] text-center mt-3 font-mono">
										{block.content}
									</figcaption>
								{/if}
							</figure>
						{:else if block.type === 'divider'}
							<div class="my-12 flex justify-center">
								<div class="w-16 h-px bg-[#d7827e]"></div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</article>

<!-- Footer -->
		<footer class="px-4 sm:px-6 lg:px-12 py-3 lg:py-6 mt-16">
			<div class="max-w-7xl mx-auto">
				<div class="mb-6">
					<a
						href="/journal"
						class="inline-flex items-center gap-2 text-[#9893a5] hover:text-[#575279] transition-colors font-mono text-sm"
					>
						← Back to journal
					</a>
				</div>
				<div class="flex flex-col sm:flex-row justify-between items-center gap-2 lg:gap-4">
					<p class="text-[#9893a5] text-xs">
						© {currentYear} Robel Estifanos. Building bridges through technology.
					</p>
					<div class="flex items-center gap-2 text-[#9893a5] text-xs">
						<Crown class="w-3 h-3 text-[#ea9d34]" />
						<span>Heritage • Innovation • Impact</span>
					</div>
				</div>
			</div>
		</footer>
	</div>
</div>
