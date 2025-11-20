<script lang="ts">
	import { t } from '$lib/i18n/languageStore';
	import { studentsStore } from '$lib/services/studentService';
	import { teachersStore } from '$lib/services/teacherService';
</script>

<div class="max-w-4xl mx-auto">
	<!-- Welcome Section -->
	<div class="bg-white rounded border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
		<h2 class="text-base sm:text-lg font-semibold text-gray-900 mb-2">
			{$t.app.title}
		</h2>
		<p class="text-xs sm:text-sm text-gray-600">
			{$t.app.welcome}
		</p>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-2 gap-3 sm:gap-4">
		<!-- Students Card -->
		<a
			href="/students"
			class="bg-white border border-gray-200 rounded p-3 sm:p-4 hover:border-blue-500 hover:shadow-sm transition-all"
		>
			<div class="text-xs text-gray-600 mb-1">{$t.nav.students}</div>
			<div class="text-xl sm:text-2xl font-semibold text-gray-900">{$studentsStore.length}</div>
		</a>

		<!-- Teachers Card -->
		<a
			href="/teachers"
			class="bg-white border border-gray-200 rounded p-3 sm:p-4 hover:border-blue-500 hover:shadow-sm transition-all"
		>
			<div class="text-xs text-gray-600 mb-1">{$t.nav.teachers}</div>
			<div class="text-xl sm:text-2xl font-semibold text-gray-900">{$teachersStore.length}</div>
		</a>
	</div>
</div>

