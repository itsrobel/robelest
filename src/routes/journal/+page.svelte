<script lang="ts">
	import type { PageData } from './$types';
	import { Crown } from '@lucide/svelte';
	import { formatDate } from '$lib/utils/date';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Journal | Robel Estifanos</title>
	<meta name="description" content="Thoughts on software and building better systems." />
</svelte:head>

<!-- Lion of Judah Watermark -->
<div class="fixed bottom-8 right-8 opacity-[0.04] pointer-events-none" aria-hidden="true">
	<img
		src="/images/lion-of-judah.png"
		alt=""
		width="280"
		height="280"
		loading="lazy"
		class="object-contain"
	/>
</div>

<!-- Geometric Background Elements -->
<div class="absolute inset-0 pointer-events-none" aria-hidden="true">
	<div
		class="absolute top-0 left-1/3 w-px h-full bg-linear-to-b from-transparent via-rose-pine-gold/10 to-transparent"
	></div>
	<div
		class="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-rose-pine-gold/10 to-transparent"
	></div>
	<div class="absolute top-20 right-1/4 w-2 h-2 bg-rose-pine-rose rotate-45"></div>
	<div class="absolute bottom-32 left-20 w-3 h-3 border border-rose-pine-gold rotate-12"></div>
</div>

<Header logoHref="/" />

<!-- Main Content -->
<main id="main-content" class="flex-1 px-4 sm:px-6 lg:px-12 py-8 lg:py-16 overflow-y-auto">
	<div class="max-w-7xl mx-auto">
		<!-- Page Header Section -->
		<section aria-label="Page header" class="mb-12 lg:mb-20">
			<h1 class="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-4">
				Writing & Thoughts
			</h1>
			<p class="text-lg lg:text-xl text-rose-pine-muted max-w-2xl">
				Thoughts on software and building better systems.
			</p>
		</section>

		<!-- Blog Posts Section -->
		<section aria-labelledby="posts-heading">
			<div class="flex items-center gap-3 text-rose-pine-gold font-mono text-xs mb-8">
				<span aria-hidden="true">02</span>
				<div class="w-6 h-px bg-rose-pine-gold" aria-hidden="true"></div>
				<span aria-hidden="true">JOURNAL</span>
				<Crown aria-hidden="true" class="w-3 h-3 lg:w-4 lg:h-4 text-rose-pine-gold" />
			</div>

			{#if data.posts.length === 0}
				<div class="py-12">
					<p class="text-rose-pine-muted text-lg italic">
						No posts yet. Check back soon!
					</p>
				</div>
			{:else}
				<nav aria-label="Blog posts">
					<ul class="space-y-8 lg:space-y-10">
						{#each data.posts as post}
							<li>
								<a
									href="/journal/{post.slug}"
									aria-label="Read {post.title}"
									class="group block space-y-3 hover:opacity-70 transition-opacity"
								>
									<div class="flex items-center gap-2 sm:gap-4 text-rose-pine-text font-mono text-xs sm:text-sm flex-wrap">
										<time datetime={post.publishDate}>{formatDate(post.publishDate)}</time>
										<span aria-hidden="true">•</span>
										<span class="font-medium">{post.title}</span>
									</div>
									{#if post.description}
										<p class="text-base text-rose-pine-muted max-w-full sm:max-w-[30%]">
											{post.description}
										</p>
									{/if}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			{/if}
		</section>
	</div>
</main>

<Footer />
