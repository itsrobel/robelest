<script lang="ts">
	import { Crown, MapPin } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();
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

<div class="h-screen bg-[#faf4ed] text-[#575279] overflow-hidden relative">
	<!-- Lion of Judah Watermark - Bottom Right -->
	<div class="absolute bottom-8 right-8 opacity-[0.04] pointer-events-none">
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
		<!-- Geometric Lines -->
		<div
			class="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#ea9d34]/10 to-transparent"
		></div>
		<div
			class="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ea9d34]/10 to-transparent"
		></div>

		<!-- Floating Elements -->
		<div class="absolute top-20 right-1/4 w-2 h-2 bg-[#d7827e] rotate-45"></div>
		<div class="absolute bottom-32 left-20 w-3 h-3 border border-[#ea9d34] rotate-12"></div>
		<div class="absolute top-1/3 left-10 w-1 h-16 bg-[#ea9d34]/20"></div>
	</div>

	<div class="relative z-10 h-full flex flex-col">
		<!-- Navigation -->
		<nav class="px-4 sm:px-6 lg:px-12 py-4 sm:py-8 flex justify-between items-center">
			<div class="flex items-center gap-2">
				<Crown class="w-4 h-4 sm:w-5 sm:h-5 text-[#ea9d34]" />
				<span class="text-xs sm:text-sm font-medium">RE</span>
			</div>
			<a href="/journal" class="text-xs sm:text-sm text-[#9893a5] font-mono hover:text-[#575279] transition-colors">Journal</a>
		</nav>

		<!-- Main Content -->
		<main class="flex-1 px-4 sm:px-6 lg:px-12 flex items-center">
			<div class="max-w-7xl mx-auto w-full">
				<div class="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
					<!-- Left Side - Main Content -->
					<div class="lg:col-span-7 space-y-6 lg:space-y-8">
						<!-- Header -->
						<div class="space-y-4 lg:space-y-6">
							<h1
								class="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-light leading-[0.85] tracking-tight"
							>
								<span class="text-[#575279]">Robel Estifanos</span>
							</h1>

							<p class="text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#575279] max-w-lg">
								Building software that <span class="italic text-[#d7827e]"
									>amplifies human compassion</span
								>
								@ Trestle
							</p>
						</div>

						<!-- Mission & Values -->
						<div class="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
							<div class="space-y-3 lg:space-y-4">
								<div class="flex items-center gap-3 text-[#ea9d34] font-mono text-xs">
									<span>01</span>
									<div class="w-6 h-px bg-[#ea9d34]"></div>
									<span>MISSION</span>
									<Crown class="w-3 h-3 lg:w-4 lg:h-4 text-[#ea9d34]" />
								</div>
								<p class="text-sm lg:text-base text-[#575279] leading-relaxed">
									Every API endpoint serves a greater purpose—connecting people with housing,
									healthcare, food security, and dignity.
								</p>
							</div>
						</div>

						<!-- Contact & Social -->
						<div class="space-y-4 lg:space-y-6">
							<div class="flex items-center gap-4 lg:gap-6 text-[#9893a5]">
								<div class="flex items-center gap-3 text-[#9893a5]">
									<MapPin class="w-4 h-4" />
									<span class="text-sm">Manhattan, NYC</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<!-- Footer -->
		<footer class="px-4 sm:px-6 lg:px-12 py-3 lg:py-6">
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
