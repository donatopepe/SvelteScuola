<script lang="ts">
	import { teachersStore, teacherService } from '$lib/services/teacherService';
	import { t } from '$lib/i18n/languageStore';
	import type { Teacher } from '$lib/types';

	let editingId = $state<string | null>(null);
	let editForm = $state({
		firstName: '',
		lastName: '',
		subject: ''
	});

	function startEdit(teacher: Teacher) {
		editingId = teacher.id;
		editForm = {
			firstName: teacher.firstName,
			lastName: teacher.lastName,
			subject: teacher.subject
		};
	}

	function cancelEdit() {
		editingId = null;
	}

	async function saveEdit(id: string) {
		await teacherService.update({
			id,
			...editForm
		});
		editingId = null;
	}

	async function deleteTeacher(id: string) {
		if (confirm($t.teachers.deleteConfirm)) {
			await teacherService.delete(id);
		}
	}
</script>

<div class="bg-white rounded border border-gray-200">
	<div class="px-3 sm:px-4 py-2 border-b border-gray-200 bg-gray-50">
		<h2 class="text-xs sm:text-sm font-medium text-gray-900">{$t.teachers.title}</h2>
	</div>
	<div class="overflow-x-auto">
		{#if $teachersStore.length === 0}
			<div class="px-4 py-8 text-center text-xs text-gray-500">
				{$t.teachers.noTeachers}
			</div>
		{:else}
			<table class="min-w-full text-xs sm:text-sm">
				<thead class="bg-gray-50 border-b border-gray-200">
					<tr>
						<th class="px-2 sm:px-4 py-2 text-left font-medium text-gray-600">
							{$t.teachers.firstName}
						</th>
						<th class="px-2 sm:px-4 py-2 text-left font-medium text-gray-600">
							{$t.teachers.lastName}
						</th>
						<th class="px-2 sm:px-4 py-2 text-left font-medium text-gray-600">
							{$t.teachers.subject}
						</th>
						<th class="px-2 sm:px-4 py-2 text-left font-medium text-gray-600">
							{$t.common.actions}
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					{#each $teachersStore as teacher (teacher.id)}
						<tr class="hover:bg-gray-50">
							{#if editingId === teacher.id}
								<td class="px-2 sm:px-4 py-2">
									<input
										type="text"
										bind:value={editForm.firstName}
										class="w-full px-1 py-0.5 text-xs border border-gray-300 rounded"
									/>
								</td>
								<td class="px-2 sm:px-4 py-2">
									<input
										type="text"
										bind:value={editForm.lastName}
										class="w-full px-1 py-0.5 text-xs border border-gray-300 rounded"
									/>
								</td>
								<td class="px-2 sm:px-4 py-2">
									<input
										type="text"
										bind:value={editForm.subject}
										class="w-full px-1 py-0.5 text-xs border border-gray-300 rounded"
									/>
								</td>
								<td class="px-2 sm:px-4 py-2">
									<div class="flex gap-1">
										<button
											onclick={() => saveEdit(teacher.id)}
											class="px-2 py-0.5 bg-green-500 text-white text-xs rounded hover:bg-green-600"
										>
											{$t.common.save}
										</button>
										<button
											onclick={cancelEdit}
											class="px-2 py-0.5 bg-gray-400 text-white text-xs rounded hover:bg-gray-500"
										>
											{$t.common.cancel}
										</button>
									</div>
								</td>
							{:else}
								<td class="px-2 sm:px-4 py-2 text-gray-900">
									{teacher.firstName}
								</td>
								<td class="px-2 sm:px-4 py-2 text-gray-900">
									{teacher.lastName}
								</td>
								<td class="px-2 sm:px-4 py-2 text-gray-600">
									{teacher.subject}
								</td>
								<td class="px-2 sm:px-4 py-2">
									<div class="flex gap-1">
										<button
											onclick={() => startEdit(teacher)}
											class="px-2 py-0.5 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
										>
											{$t.common.edit}
										</button>
										<button
											onclick={() => deleteTeacher(teacher.id)}
											class="px-2 py-0.5 bg-red-500 text-white text-xs rounded hover:bg-red-600"
										>
											{$t.common.delete}
										</button>
									</div>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</div>
