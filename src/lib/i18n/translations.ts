export const translations = {
	en: {
		app: {
			title: 'School Registry',
			welcome: 'Welcome to the School Registry Management System. Use the navigation above to manage students and teachers.'
		},
		nav: {
			students: 'Students',
			teachers: 'Teachers'
		},
		students: {
			title: 'Students',
			addTitle: 'Add New Student',
			firstName: 'First Name',
			lastName: 'Last Name',
			age: 'Age',
			class: 'Class',
			addButton: 'Add Student',
			noStudents: 'No students yet',
			deleteConfirm: 'Are you sure you want to delete this student?'
		},
		teachers: {
			title: 'Teachers',
			addTitle: 'Add New Teacher',
			firstName: 'First Name',
			lastName: 'Last Name',
			subject: 'Subject',
			addButton: 'Add Teacher',
			noTeachers: 'No teachers yet',
			deleteConfirm: 'Are you sure you want to delete this teacher?'
		},
		common: {
			actions: 'Actions',
			cancel: 'Cancel',
			save: 'Save',
			edit: 'Edit',
			delete: 'Delete'
		}
	},
	it: {
		app: {
			title: 'Registro Scolastico',
			welcome: 'Benvenuto nel Sistema di Gestione del Registro Scolastico. Usa la navigazione sopra per gestire studenti e insegnanti.'
		},
		nav: {
			students: 'Studenti',
			teachers: 'Insegnanti'
		},
		students: {
			title: 'Studenti',
			addTitle: 'Aggiungi Nuovo Studente',
			firstName: 'Nome',
			lastName: 'Cognome',
			age: 'Età',
			class: 'Classe',
			addButton: 'Aggiungi Studente',
			noStudents: 'Nessuno studente ancora',
			deleteConfirm: 'Sei sicuro di voler eliminare questo studente?'
		},
		teachers: {
			title: 'Insegnanti',
			addTitle: 'Aggiungi Nuovo Insegnante',
			firstName: 'Nome',
			lastName: 'Cognome',
			subject: 'Materia',
			addButton: 'Aggiungi Insegnante',
			noTeachers: 'Nessun insegnante ancora',
			deleteConfirm: 'Sei sicuro di voler eliminare questo insegnante?'
		},
		common: {
			actions: 'Azioni',
			cancel: 'Annulla',
			save: 'Salva',
			edit: 'Modifica',
			delete: 'Elimina'
		}
	}
};

export type TranslationKeys = typeof translations.en;
