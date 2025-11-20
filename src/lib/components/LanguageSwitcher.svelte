<script lang="ts">
	import { languageStore } from '$lib/i18n/languageStore';
	import type { Language } from '$lib/types';

	let currentLang: Language;
	languageStore.subscribe((lang) => {
		currentLang = lang;
	});

	function switchLanguage(lang: Language) {
		languageStore.setLanguage(lang);
	}
</script>

<div class="inline-flex gap-1 text-xs">
	<button
		onclick={() => switchLanguage('en')}
		class="px-2 py-1 rounded transition-colors {currentLang === 'en'
			? 'bg-blue-500 text-white'
			: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}"
	>
		EN
	</button>
	<button
		onclick={() => switchLanguage('it')}
		class="px-2 py-1 rounded transition-colors {currentLang === 'it'
			? 'bg-blue-500 text-white'
			: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}"
	>
		IT
	</button>
</div>
