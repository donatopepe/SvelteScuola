import type { Teacher } from '$lib/types';
import { writable } from 'svelte/store';
import { db } from '$lib/db/indexedDB';
import { browser } from '$app/environment';

// Create a writable store for teachers
export const teachersStore = writable<Teacher[]>([]);

// Initialize teachers from IndexedDB
async function initTeachers() {
	if (!browser) return;

	try {
		await db.init();
		const teachers = await db.getAllTeachers();
		teachersStore.set(teachers);
	} catch (error) {
		console.error('Failed to initialize teachers:', error);
	}
}

// Initialize on module load
if (browser) {
	initTeachers();
}

// Service methods
export const teacherService = {
	init: initTeachers,

	getAll: async (): Promise<Teacher[]> => {
		if (!browser) return [];
		try {
			const teachers = await db.getAllTeachers();
			teachersStore.set(teachers);
			return teachers;
		} catch (error) {
			console.error('Failed to get teachers:', error);
			return [];
		}
	},

	add: async (teacher: Omit<Teacher, 'id'>): Promise<Teacher> => {
		const newTeacher: Teacher = {
			...teacher,
			id: Date.now().toString()
		};

		if (!browser) return newTeacher;

		try {
			await db.addTeacher(newTeacher);
			teachersStore.update((teachers) => [...teachers, newTeacher]);
			return newTeacher;
		} catch (error) {
			console.error('Failed to add teacher:', error);
			throw error;
		}
	},

	update: async (teacher: Teacher): Promise<Teacher> => {
		if (!browser) return teacher;

		try {
			await db.updateTeacher(teacher);
			teachersStore.update((teachers) =>
				teachers.map((t) => (t.id === teacher.id ? teacher : t))
			);
			return teacher;
		} catch (error) {
			console.error('Failed to update teacher:', error);
			throw error;
		}
	},

	delete: async (id: string): Promise<void> => {
		if (!browser) return;

		try {
			await db.deleteTeacher(id);
			teachersStore.update((teachers) => teachers.filter((t) => t.id !== id));
		} catch (error) {
			console.error('Failed to delete teacher:', error);
			throw error;
		}
	}
};
