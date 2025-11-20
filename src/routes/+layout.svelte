<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { t } from '$lib/i18n/languageStore';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import { page } from '$app/stores';

	let { children } = $props();
	let mobileMenuOpen = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{$t.app.title}</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col">
	<!-- Header -->
	<header class="bg-white border-b border-gray-200 sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4">
			<div class="flex items-center justify-between h-14">
				<!-- Logo -->
				<a href="/" class="text-base font-semibold text-gray-900 hover:text-gray-700">
					{$t.app.title}
				</a>

				<!-- Desktop Navigation -->
				<nav class="hidden md:flex gap-6">
					<a
						href="/students"
						class="text-sm font-medium transition-colors {$page.url.pathname === '/students'
							? 'text-blue-600'
							: 'text-gray-600 hover:text-gray-900'}"
					>
						{$t.nav.students}
					</a>
					<a
						href="/teachers"
						class="text-sm font-medium transition-colors {$page.url.pathname === '/teachers'
							? 'text-blue-600'
							: 'text-gray-600 hover:text-gray-900'}"
					>
						{$t.nav.teachers}
					</a>
				</nav>

				<!-- Right side -->
				<div class="flex items-center gap-4">
					<LanguageSwitcher />

					<!-- Mobile menu button -->
					<button
						onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
						class="md:hidden p-2 rounded hover:bg-gray-100"
						aria-label="Toggle menu"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{#if mobileMenuOpen}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							{:else}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							{/if}
						</svg>
					</button>
				</div>
			</div>

			<!-- Mobile Navigation -->
			{#if mobileMenuOpen}
				<nav class="md:hidden py-4 border-t border-gray-200">
					<a
						href="/students"
						onclick={() => (mobileMenuOpen = false)}
						class="block py-2 text-sm font-medium {$page.url.pathname === '/students'
							? 'text-blue-600'
							: 'text-gray-600'}"
					>
						{$t.nav.students}
					</a>
					<a
						href="/teachers"
						onclick={() => (mobileMenuOpen = false)}
						class="block py-2 text-sm font-medium {$page.url.pathname === '/teachers'
							? 'text-blue-600'
							: 'text-gray-600'}"
					>
						{$t.nav.teachers}
					</a>
				</nav>
			{/if}
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-white border-t border-gray-200 mt-auto">
		<div class="max-w-7xl mx-auto px-4 py-6">
			<div class="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
				<div class="text-center md:text-left">
					<p class="font-medium text-gray-900">School Registry System</p>
					<p class="mt-1">Developed by Donato Pepe</p>
				</div>
				<div class="text-center md:text-right">
					<p>Open Source Project</p>
					<p class="mt-1">
						<a
							href="https://github.com/donatopepe/SvelteScuola"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-500 hover:text-blue-600"
						>
							View on GitHub
						</a>
					</p>
				</div>
			</div>
		</div>
	</footer>
</div>
