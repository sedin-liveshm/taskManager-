const STORAGE_KEY = 'task-manager.tasks';

export function saveTasks(tasks) {
	if (!Array.isArray(tasks)) {
		return;
	}

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
	} catch {
		console.error('Failed to save tasks to localStorage');
	}
}

export function loadTasks() {
	try {
		const rawTasks = localStorage.getItem(STORAGE_KEY);
		if (!rawTasks) {
			return [];
		}

		const parsed = JSON.parse(rawTasks);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
