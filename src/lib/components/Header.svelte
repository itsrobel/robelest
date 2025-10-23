<script lang="ts">
	import { Crown } from '@lucide/svelte';

	interface Props {
		/** URL for the logo/brand link (usually "/" for home, or empty string to disable link) */
		logoHref?: string;
		/** Text and href for right-side navigation link */
		rightLink?: {
			text: string;
			href: string;
		};
	}

	let { logoHref = '/', rightLink }: Props = $props();
</script>

<nav aria-label="Main navigation" class="px-4 sm:px-6 lg:px-12 py-4 sm:py-8 flex justify-between items-center">
	{#if logoHref}
		<a href={logoHref} aria-label="Robel Estifanos - Home" class="flex items-center gap-2 hover:opacity-70 transition-opacity">
			<Crown aria-hidden="true" class="w-4 h-4 sm:w-5 sm:h-5 text-rose-pine-gold" />
			<span class="text-xs sm:text-sm font-medium">RE</span>
		</a>
	{:else}
		<div class="flex items-center gap-2">
			<Crown aria-hidden="true" class="w-4 h-4 sm:w-5 sm:h-5 text-rose-pine-gold" />
			<span class="text-xs sm:text-sm font-medium">RE</span>
		</div>
	{/if}

	{#if rightLink}
		<a
			href={rightLink.href}
			class="text-xs sm:text-sm text-rose-pine-muted font-mono hover:text-rose-pine-text transition-colors"
		>
			{rightLink.text}
		</a>
	{/if}
</nav>
