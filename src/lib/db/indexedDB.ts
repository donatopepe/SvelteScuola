import type { Student, Teacher } from '$lib/types';

const DB_NAME = 'app-school-registry';
const DB_VERSION = 1;

const STORES = {
	STUDENTS: 'students',
	TEACHERS: 'teachers'
};

class IndexedDBService {
	private db: IDBDatabase | null = null;
	private initPromise: Promise<void> | null = null;

	async init(): Promise<void> {
		if (this.db) return;
		if (this.initPromise) return this.initPromise;

		this.initPromise = new Promise((resolve, reject) => {
			const request = indexedDB.open(DB_NAME, DB_VERSION);

			request.onerror = () => {
				reject(new Error('Failed to open database'));
			};

			request.onsuccess = () => {
				this.db = request.result;
				resolve();
			};

			request.onupgradeneeded = (event) => {
				const db = (event.target as IDBOpenDBRequest).result;

				// Create students store
				if (!db.objectStoreNames.contains(STORES.STUDENTS)) {
					db.createObjectStore(STORES.STUDENTS, { keyPath: 'id' });
				}

				// Create teachers store
				if (!db.objectStoreNames.contains(STORES.TEACHERS)) {
					db.createObjectStore(STORES.TEACHERS, { keyPath: 'id' });
				}
			};
		});

		return this.initPromise;
	}

	private async getDB(): Promise<IDBDatabase> {
		if (!this.db) {
			await this.init();
		}
		if (!this.db) {
			throw new Error('Database not initialized');
		}
		return this.db;
	}

	// Generic CRUD operations
	async getAll<T>(storeName: string): Promise<T[]> {
		const db = await this.getDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readonly');
			const store = transaction.objectStore(storeName);
			const request = store.getAll();

			request.onsuccess = () => {
				resolve(request.result as T[]);
			};

			request.onerror = () => {
				reject(new Error(`Failed to get all from ${storeName}`));
			};
		});
	}

	async get<T>(storeName: string, id: string): Promise<T | undefined> {
		const db = await this.getDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readonly');
			const store = transaction.objectStore(storeName);
			const request = store.get(id);

			request.onsuccess = () => {
				resolve(request.result as T | undefined);
			};

			request.onerror = () => {
				reject(new Error(`Failed to get from ${storeName}`));
			};
		});
	}

	async add<T>(storeName: string, item: T): Promise<T> {
		const db = await this.getDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readwrite');
			const store = transaction.objectStore(storeName);
			const request = store.add(item);

			request.onsuccess = () => {
				resolve(item);
			};

			request.onerror = () => {
				reject(new Error(`Failed to add to ${storeName}`));
			};
		});
	}

	async update<T>(storeName: string, item: T): Promise<T> {
		const db = await this.getDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readwrite');
			const store = transaction.objectStore(storeName);
			const request = store.put(item);

			request.onsuccess = () => {
				resolve(item);
			};

			request.onerror = () => {
				reject(new Error(`Failed to update in ${storeName}`));
			};
		});
	}

	async delete(storeName: string, id: string): Promise<void> {
		const db = await this.getDB();
		return new Promise((resolve, reject) => {
			const transaction = db.transaction(storeName, 'readwrite');
			const store = transaction.objectStore(storeName);
			const request = store.delete(id);

			request.onsuccess = () => {
				resolve();
			};

			request.onerror = () => {
				reject(new Error(`Failed to delete from ${storeName}`));
			};
		});
	}

	// Specific methods for Students
	async getAllStudents(): Promise<Student[]> {
		return this.getAll<Student>(STORES.STUDENTS);
	}

	async addStudent(student: Student): Promise<Student> {
		return this.add<Student>(STORES.STUDENTS, student);
	}

	async updateStudent(student: Student): Promise<Student> {
		return this.update<Student>(STORES.STUDENTS, student);
	}

	async deleteStudent(id: string): Promise<void> {
		return this.delete(STORES.STUDENTS, id);
	}

	// Specific methods for Teachers
	async getAllTeachers(): Promise<Teacher[]> {
		return this.getAll<Teacher>(STORES.TEACHERS);
	}

	async addTeacher(teacher: Teacher): Promise<Teacher> {
		return this.add<Teacher>(STORES.TEACHERS, teacher);
	}

	async updateTeacher(teacher: Teacher): Promise<Teacher> {
		return this.update<Teacher>(STORES.TEACHERS, teacher);
	}

	async deleteTeacher(id: string): Promise<void> {
		return this.delete(STORES.TEACHERS, id);
	}

}

// Export singleton instance
export const db = new IndexedDBService();
