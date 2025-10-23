<script lang="ts">
	import { Crown } from '@lucide/svelte';

	interface Props {
		/** Optional back link to show above the footer (for blog posts) */
		backLink?: {
			text: string;
			href: string;
		};
	}

	let { backLink }: Props = $props();

	const currentYear = new Date().getFullYear();
</script>

<footer class="px-4 sm:px-6 lg:px-12 py-3 lg:py-6">
	<div class="max-w-7xl mx-auto">
		{#if backLink}
			<nav aria-label="Back navigation" class="mb-6">
				<a
					href={backLink.href}
					class="inline-flex items-center gap-2 text-rose-pine-muted hover:text-rose-pine-text transition-colors font-mono text-sm"
				>
					{backLink.text}
				</a>
			</nav>
		{/if}

		<div
			class="flex flex-col sm:flex-row justify-between items-center gap-2 lg:gap-4"
		>
			<p class="text-rose-pine-muted text-xs">
				© {currentYear} Robel Estifanos. Building bridges through technology.
			</p>
			<div class="flex items-center gap-2 text-rose-pine-muted text-xs" aria-label="Site tagline">
				<Crown aria-hidden="true" class="w-3 h-3 text-rose-pine-gold" />
				<span>Heritage • Innovation • Impact</span>
			</div>
		</div>
	</div>
</footer>
