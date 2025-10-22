<script lang="ts">
	import type { PageData } from './$types';
	import { Crown } from '@lucide/svelte';

	export let data: PageData;

	const currentYear = new Date().getFullYear();

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Journal | Robel Estifanos</title>
	<meta name="description" content="Thoughts on software and building better systems." />
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
			class="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#ea9d34]/10 to-transparent"
		></div>
		<div
			class="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ea9d34]/10 to-transparent"
		></div>
		<div class="absolute top-20 right-1/4 w-2 h-2 bg-[#d7827e] rotate-45"></div>
		<div class="absolute bottom-32 left-20 w-3 h-3 border border-[#ea9d34] rotate-12"></div>
	</div>

	<div class="relative z-10 h-full flex flex-col">
		<!-- Navigation -->
		<nav class="px-4 sm:px-6 lg:px-12 py-4 sm:py-8 flex justify-between items-center">
			<a href="/" class="flex items-center gap-2 hover:opacity-70 transition-opacity">
				<Crown class="w-4 h-4 sm:w-5 sm:h-5 text-[#ea9d34]" />
				<span class="text-xs sm:text-sm font-medium">RE</span>
			</a>
		</nav>

		<!-- Main Content -->
		<main class="flex-1 px-4 sm:px-6 lg:px-12 py-8 lg:py-16 overflow-y-auto">
			<div class="max-w-7xl mx-auto">
				<!-- Header -->
				<div class="mb-12 lg:mb-20">
					<div class="flex items-center gap-3 text-[#ea9d34] font-mono text-xs mb-6">
						<span>01</span>
						<div class="w-6 h-px bg-[#ea9d34]"></div>
						<span>JOURNAL</span>
						<Crown class="w-3 h-3 lg:w-4 lg:h-4 text-[#ea9d34]" />
					</div>
					<h1 class="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-4">
						Writing & Thoughts
					</h1>
					<p class="text-lg lg:text-xl text-[#9893a5] max-w-2xl">
						Thoughts on software and building better systems.
					</p>
				</div>


				<!-- All Posts -->
				<section>
					<div class="flex items-center gap-3 text-[#ea9d34] font-mono text-xs mb-8">
						<span>02</span>
						<div class="w-6 h-px bg-[#ea9d34]"></div>
						<span>{data.selectedTag ? 'FILTERED POSTS' : 'ALL POSTS'}</span>
					</div>

					{#if data.posts.length === 0}
						<div class="py-12">
							<p class="text-[#9893a5] text-lg italic">
								{data.selectedTag ? 'No posts found with this tag.' : 'No posts yet. Check back soon!'}
							</p>
						</div>
					{:else}
						<div class="space-y-8 lg:space-y-10">
							{#each data.posts as post}
								<a
									href="/journal/{post.slug}"
									class="group block space-y-3 hover:opacity-70 transition-opacity"
								>
									<div class="flex items-center gap-4 text-[#9893a5] text-xs font-mono">
										<time>{formatDate(post.publishDate)}</time>
										{#if post.tags.length > 0}
											<span>•</span>
											<span>{post.tags.join(', ')}</span>
										{/if}
									</div>
									<h3
										class="text-xl lg:text-2xl font-light leading-tight tracking-tight text-[#575279] group-hover:text-[#d7827e] transition-colors"
									>
										{post.title}
									</h3>
									{#if post.description}
										<p class="text-base text-[#9893a5] max-w-2xl">
											{post.description}
										</p>
									{/if}
								</a>
							{/each}
						</div>
					{/if}
				</section>
			</div>
		</main>


		<!-- Footer -->
		<footer class="px-4 sm:px-6 lg:px-12 py-3 lg:py-6 mt-16">
			<div
				class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 lg:gap-4"
			>
				<p class="text-[#9893a5] text-xs">
					© {currentYear} Robel Estifanos. Building bridges through technology.
				</p>
				<div class="flex items-center gap-2 text-[#9893a5] text-xs">
					<Crown class="w-3 h-3 text-[#ea9d34]" />
					<span>Heritage • Innovation • Impact</span>
				</div>
			</div>
		</footer>
	</div>
</div>
