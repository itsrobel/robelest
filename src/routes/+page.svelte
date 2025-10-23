<script lang="ts">
	import { MapPin } from '@lucide/svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Robel Estifanos - Founding Engineer</title>
	<meta
		name="description"
		content="Building software that amplifies human compassion. Founding engineer focused on social impact technology."
	/>
	<meta
		name="keywords"
		content="Robel Estifanos, founding engineer, social impact, technology, Ethiopian heritage, Trestle, human services"
	/>

	<!-- Open Graph -->
	<meta property="og:title" content="Robel Estifanos - Founding Engineer" />
	<meta property="og:description" content="Building software that amplifies human compassion" />
	<meta property="og:url" content="https://robelestifanos.com" />
	<meta property="og:site_name" content="Robel Estifanos" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:type" content="website" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Robel Estifanos - Founding Engineer" />
	<meta name="twitter:description" content="Building software that amplifies human compassion" />
</svelte:head>

<!-- Lion of Judah Watermark - Bottom Right -->
<div class="absolute bottom-8 right-8 opacity-[0.04] pointer-events-none" aria-hidden="true">
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
	<!-- Geometric Lines -->
	<div
		class="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-rose-pine-gold/10 to-transparent"
	></div>
	<div
		class="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-pine-gold/10 to-transparent"
	></div>

	<!-- Floating Elements -->
	<div class="absolute top-20 right-1/4 w-2 h-2 bg-rose-pine-rose rotate-45"></div>
	<div class="absolute bottom-32 left-20 w-3 h-3 border border-rose-pine-gold rotate-12"></div>
	<div class="absolute top-1/3 left-10 w-1 h-16 bg-rose-pine-gold/20"></div>
</div>

<Header logoHref="" rightLink={{ text: 'Journal', href: '/journal' }} />

<!-- Main Content -->
<main id="main-content" class="flex-1 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
	<div class="max-w-7xl mx-auto w-full">
		<div class="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
			<!-- Left Side - Main Content -->
			<div class="lg:col-span-7 space-y-6 lg:space-y-8">
				<!-- Introduction Section -->
				<section aria-label="Introduction">
					<h1
						class="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-light leading-[0.85] tracking-tight mb-4 lg:mb-6"
					>
						<span class="text-rose-pine-text">Robel Estifanos</span>
					</h1>

					<p class="text-lg sm:text-xl lg:text-2xl leading-relaxed text-rose-pine-text max-w-lg">
						Building software that <span class="italic text-rose-pine-rose"
							>amplifies human compassion</span
						>
						@ Trestle
					</p>
				</section>

				<!-- Mission Section -->
				<section aria-labelledby="mission-heading">
					<div class="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
						<div class="space-y-3 lg:space-y-4">
							<div class="flex items-center gap-3 text-rose-pine-gold font-mono text-xs">
								<span aria-hidden="true">01</span>
								<div class="w-6 h-px bg-rose-pine-gold" aria-hidden="true"></div>
								<h2 id="mission-heading" class="text-xs">MISSION</h2>
							</div>
							<p class="text-sm lg:text-base text-rose-pine-text leading-relaxed">
								Every API endpoint serves a greater purpose—connecting people with housing,
								healthcare, food security, and dignity.
							</p>
						</div>
					</div>
				</section>

				<!-- Contact Section -->
				<section aria-label="Contact information">
					<div class="flex items-center gap-4 lg:gap-6 text-rose-pine-muted">
						<div class="flex items-center gap-3 text-rose-pine-muted">
							<MapPin aria-hidden="true" class="w-4 h-4" />
							<span class="text-sm">Manhattan, NYC</span>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</main>

<Footer />
