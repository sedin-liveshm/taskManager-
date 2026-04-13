import { addTask, getTasks } from '../integration/taskAPI.js';
import { renderTasks } from '../ui/render.js';
import { sortTasks } from '../services/sort.js';
import { loadTasks, saveTasks } from '../services/storage.js';

const TASKS_CHANGED_EVENT = 'tasks:changed';
let isInitialized = false;

function replaceTasksContent(targetTasks, sourceTasks) {
	targetTasks.length = 0;
	for (const task of sourceTasks) {
		targetTasks.push(task);
	}
}

function syncFromStorageIntoApi() {
	const storedTasks = loadTasks();
	const tasks = getTasks();

	if (tasks.length === 0 && storedTasks.length > 0) {
		for (const task of storedTasks) {
			if (!task || typeof task !== 'object') {
				continue;
			}

			addTask({
				id: Number(task.id) || Date.now(),
				title: String(task.title ?? '').trim(),
				priority: String(task.priority ?? 'Medium'),
				description: String(task.description ?? ''),
				createdAt: Number(task.createdAt) || Date.now(),
				completed: Boolean(task.completed),
			});
		}
	}
}

function commitTasks(tasks) {
	const sortedTasks = sortTasks(tasks);
	replaceTasksContent(tasks, sortedTasks);
	saveTasks(tasks);
	renderTasks(tasks);
}

function getTaskIdFromElement(element) {
	const rawId = element.dataset.id;
	const parsedId = Number(rawId);
	return Number.isFinite(parsedId) ? parsedId : null;
}

function handleTaskClick(event) {
	const actionElement = event.target.closest('button');
	if (!actionElement) {
		return;
	}

	const taskId = getTaskIdFromElement(actionElement);
	if (taskId === null) {
		return;
	}

	const tasks = getTasks();

	if (actionElement.classList.contains('delete-btn')) {
		const taskIndex = tasks.findIndex((task) => task.id === taskId);
		if (taskIndex === -1) {
			return;
		}

		tasks.splice(taskIndex, 1);
		commitTasks(tasks);
		return;
	}

	if (actionElement.classList.contains('complete-btn')) {
		const taskIndex = tasks.findIndex((task) => task.id === taskId);
		if (taskIndex === -1) {
			return;
		}

		tasks[taskIndex] = {
			...tasks[taskIndex],
			completed: !tasks[taskIndex].completed,
		};

		commitTasks(tasks);
	}
}

function handleExternalTaskChange() {
	commitTasks(getTasks());
}

export function initTaskEvents() {
	if (isInitialized) {
		return;
	}

	syncFromStorageIntoApi();
	commitTasks(getTasks());

	const taskList = document.querySelector('#task-list');
	if (taskList) {
		taskList.addEventListener('click', handleTaskClick);
	}

	window.addEventListener(TASKS_CHANGED_EVENT, handleExternalTaskChange);
	isInitialized = true;
}
