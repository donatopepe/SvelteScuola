import type { Student } from '$lib/types';
import { writable } from 'svelte/store';
import { db } from '$lib/db/indexedDB';
import { browser } from '$app/environment';

// Create a writable store for students
export const studentsStore = writable<Student[]>([]);

// Initialize students from IndexedDB
async function initStudents() {
	if (!browser) return;

	try {
		await db.init();
		const students = await db.getAllStudents();
		studentsStore.set(students);
	} catch (error) {
		console.error('Failed to initialize students:', error);
	}
}

// Initialize on module load
if (browser) {
	initStudents();
}

// Service methods
export const studentService = {
	init: initStudents,

	getAll: async (): Promise<Student[]> => {
		if (!browser) return [];
		try {
			const students = await db.getAllStudents();
			studentsStore.set(students);
			return students;
		} catch (error) {
			console.error('Failed to get students:', error);
			return [];
		}
	},

	add: async (student: Omit<Student, 'id'>): Promise<Student> => {
		const newStudent: Student = {
			...student,
			id: Date.now().toString()
		};

		if (!browser) return newStudent;

		try {
			await db.addStudent(newStudent);
			studentsStore.update((students) => [...students, newStudent]);
			return newStudent;
		} catch (error) {
			console.error('Failed to add student:', error);
			throw error;
		}
	},

	update: async (student: Student): Promise<Student> => {
		if (!browser) return student;

		try {
			await db.updateStudent(student);
			studentsStore.update((students) =>
				students.map((s) => (s.id === student.id ? student : s))
			);
			return student;
		} catch (error) {
			console.error('Failed to update student:', error);
			throw error;
		}
	},

	delete: async (id: string): Promise<void> => {
		if (!browser) return;

		try {
			await db.deleteStudent(id);
			studentsStore.update((students) => students.filter((s) => s.id !== id));
		} catch (error) {
			console.error('Failed to delete student:', error);
			throw error;
		}
	}
};
