<script lang="ts">
	import { studentService } from '$lib/services/studentService';
	import { t } from '$lib/i18n/languageStore';

	let firstName = '';
	let lastName = '';
	let age: number | '' = '';
	let studentClass = '';

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (firstName && lastName && age && studentClass) {
			try {
				await studentService.add({
					firstName,
					lastName,
					age: Number(age),
					class: studentClass
				});

				// Reset form
				firstName = '';
				lastName = '';
				age = '';
				studentClass = '';
			} catch (error) {
				console.error('Failed to add student:', error);
			}
		}
	}
</script>

<div class="bg-white rounded border border-gray-200 p-4">
	<h3 class="text-sm font-medium text-gray-900 mb-4">{$t.students.addTitle}</h3>
	<form onsubmit={handleSubmit}>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
			<div>
				<label for="firstName" class="block text-xs text-gray-600 mb-1">
					{$t.students.firstName}
				</label>
				<input
					type="text"
					id="firstName"
					bind:value={firstName}
					required
					class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div>
				<label for="lastName" class="block text-xs text-gray-600 mb-1">
					{$t.students.lastName}
				</label>
				<input
					type="text"
					id="lastName"
					bind:value={lastName}
					required
					class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div>
				<label for="age" class="block text-xs text-gray-600 mb-1">
					{$t.students.age}
				</label>
				<input
					type="number"
					id="age"
					bind:value={age}
					required
					min="1"
					max="100"
					class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
				/>
			</div>
			<div>
				<label for="class" class="block text-xs text-gray-600 mb-1">
					{$t.students.class}
				</label>
				<input
					type="text"
					id="class"
					bind:value={studentClass}
					required
					placeholder="3A"
					class="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
				/>
			</div>
		</div>
		<button
			type="submit"
			class="w-full sm:w-auto px-4 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
		>
			{$t.students.addButton}
		</button>
	</form>
</div>
