<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data: PageData;

	function filterByTag(tag: string) {
		const url = new URL($page.url);
		url.searchParams.set('tag', tag);
		goto(url.toString());
	}

	function clearFilters() {
		goto('/blog');
	}

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
	<title>Blog | Robel Estifanos</title>
	<meta name="description" content="Thoughts on software, compassion, and building better systems." />
</svelte:head>

<div class="min-h-screen bg-base py-16 px-6">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<header class="mb-12 text-center">
			<h1 class="text-4xl md:text-5xl font-bold text-text mb-4">Blog</h1>
			<p class="text-lg text-muted">
				Thoughts on software, compassion, and building better systems.
			</p>
		</header>

		<!-- Filters -->
		<div class="mb-12">
			<div class="flex flex-wrap gap-3 items-center justify-center">
				{#if data.selectedTag}
					<button
						on:click={clearFilters}
						class="px-4 py-2 rounded-lg bg-surface border-2 border-rose text-text hover:bg-rose hover:text-base transition-colors"
					>
						← Back to all posts
					</button>
				{/if}

				{#if data.tags.length > 0}
					<div class="flex flex-wrap gap-2 justify-center">
						{#each data.tags as tag}
							<button
								on:click={() => filterByTag(tag)}
								class="px-3 py-1 rounded-full text-sm {data.selectedTag === tag
									? 'bg-rose text-base'
									: 'bg-surface text-text hover:bg-rose hover:text-base'} transition-colors"
							>
								{tag}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			{#if data.selectedTag}
				<p class="text-center text-muted mt-4">
					Showing posts tagged with <span class="text-rose font-medium">"{data.selectedTag}"</span>
				</p>
			{/if}
		</div>

		<!-- Featured Posts -->
		{#if !data.selectedTag && data.posts.filter((p) => p.featured).length > 0}
			<section class="mb-16">
				<h2 class="text-2xl font-bold text-text mb-6">Featured</h2>
				<div class="grid gap-6">
					{#each data.posts.filter((p) => p.featured) as post}
						<a
							href="/blog/{post.slug}"
							class="group block bg-surface rounded-lg p-8 border-2 border-transparent hover:border-rose transition-all"
						>
							<div class="flex flex-wrap gap-2 mb-3">
								<span class="inline-block px-3 py-1 rounded-full text-xs bg-gold text-base font-medium">
									Featured
								</span>
								{#each post.tags as tag}
									<span class="inline-block px-3 py-1 rounded-full text-xs bg-rose/20 text-rose">
										{tag}
									</span>
								{/each}
							</div>
							<h3
								class="text-2xl font-bold text-text mb-3 group-hover:text-rose transition-colors"
							>
								{post.title}
							</h3>
							{#if post.description}
								<p class="text-muted mb-4 leading-relaxed">
									{post.description}
								</p>
							{/if}
							<time class="text-sm text-muted">{formatDate(post.publishDate)}</time>
						</a>
					{/each}
				</div>
			</section>
		{/if}

		<!-- All Posts -->
		<section>
			<h2 class="text-2xl font-bold text-text mb-6">
				{data.selectedTag ? 'Posts' : 'All Posts'}
			</h2>
			{#if data.posts.filter((p) => !p.featured || data.selectedTag).length === 0}
				<div class="text-center py-12">
					<p class="text-muted text-lg">
						{data.selectedTag ? 'No posts found with this tag.' : 'No posts yet. Check back soon!'}
					</p>
				</div>
			{:else}
				<div class="grid gap-6">
					{#each data.posts.filter((p) => !p.featured || data.selectedTag) as post}
						<a
							href="/blog/{post.slug}"
							class="group block bg-surface rounded-lg p-6 border-2 border-transparent hover:border-rose transition-all"
						>
							<div class="flex flex-wrap gap-2 mb-3">
								{#each post.tags as tag}
									<span class="inline-block px-2 py-1 rounded-full text-xs bg-rose/20 text-rose">
										{tag}
									</span>
								{/each}
							</div>
							<h3
								class="text-xl font-bold text-text mb-2 group-hover:text-rose transition-colors"
							>
								{post.title}
							</h3>
							{#if post.description}
								<p class="text-muted mb-3 text-sm leading-relaxed">
									{post.description}
								</p>
							{/if}
							<time class="text-sm text-muted">{formatDate(post.publishDate)}</time>
						</a>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</div>

<style>
	/* Ensure smooth transitions */
	a {
		transition: all 0.2s ease;
	}
</style>
