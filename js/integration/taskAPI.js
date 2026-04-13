const tasks = [];
const TASKS_CHANGED_EVENT = 'tasks:changed';

export function getTasks() {
	return tasks;
}

export function addTask(task) {
	tasks.push(task);
	window.dispatchEvent(new CustomEvent(TASKS_CHANGED_EVENT));
	return task;
}
