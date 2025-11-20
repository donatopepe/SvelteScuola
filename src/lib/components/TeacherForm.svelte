<script lang="ts">
	import { teacherService } from '$lib/services/teacherService';
	import { t } from '$lib/i18n/languageStore';

	let firstName = '';
	let lastName = '';
	let subject = '';

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (firstName && lastName && subject) {
			try {
				await teacherService.add({
					firstName,
					lastName,
					subject
				});

				// Reset form
				firstName = '';
				lastName = '';
				subject = '';
			} catch (error) {
				console.error('Failed to add teacher:', error);
			}
		}
	}
</script>

<div class="bg-white rounded border border-gray-200 p-4">
	<h3 class="text-sm font-medium text-gray-900 mb-4">{$t.teachers.addTitle}</h3>
	<form onsubmit={handleSubmit}>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
			<div>
				<label for="teacherFirstName" class="block text-xs text-gray-600 mb-1">
					{$t.teachers.firstName}
				</label>
				<input
					type="text"
					id="teacherFirstName"
					bind:value={firstName}
					required
					class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div>
				<label for="teacherLastName" class="block text-xs text-gray-600 mb-1">
					{$t.teachers.lastName}
				</label>
				<input
					type="text"
					id="teacherLastName"
					bind:value={lastName}
					required
					class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div class="sm:col-span-2 lg:col-span-1">
				<label for="subject" class="block text-xs text-gray-600 mb-1">
					{$t.teachers.subject}
				</label>
				<input
					type="text"
					id="subject"
					bind:value={subject}
					required
					placeholder="Mathematics"
					class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
				/>
			</div>
		</div>
		<button
			type="submit"
			class="w-full sm:w-auto px-4 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
		>
			{$t.teachers.addButton}
		</button>
	</form>
</div>
