<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<!-- Skip to main content link for keyboard navigation -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-rose-pine-rose focus:text-rose-pine-base focus:rounded"
>
	Skip to main content
</a>

<div class="h-[100dvh] bg-rose-pine-base text-rose-pine-text overflow-hidden relative">
	<div class="relative z-10 h-full flex flex-col">
		{@render children()}
	</div>
</div>
