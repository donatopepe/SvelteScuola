import { writable } from 'svelte/store';
import type { Language } from '$lib/types';
import { translations } from './translations';
import { browser } from '$app/environment';

const STORAGE_KEY = 'app-language';

// Detect browser language
function detectBrowserLanguage(): Language {
	if (!browser) return 'en';

	const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language | null;
	if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'it')) {
		return savedLanguage;
	}

	const browserLang = navigator.language.toLowerCase();
	if (browserLang.startsWith('it')) {
		return 'it';
	}
	return 'en';
}

// Create language store
function createLanguageStore() {
	const { subscribe, set } = writable<Language>(detectBrowserLanguage());

	return {
		subscribe,
		setLanguage: (lang: Language) => {
			if (browser) {
				localStorage.setItem(STORAGE_KEY, lang);
			}
			set(lang);
		}
	};
}

export const languageStore = createLanguageStore();

// Create reactive translations store
export const t = writable(translations[detectBrowserLanguage()]);

// Update translations when language changes
languageStore.subscribe((lang) => {
	t.set(translations[lang]);
});
