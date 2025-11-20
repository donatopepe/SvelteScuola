export interface Student {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	class: string;
}

export interface Teacher {
	id: string;
	firstName: string;
	lastName: string;
	subject: string;
}

export type Language = 'en' | 'it';
