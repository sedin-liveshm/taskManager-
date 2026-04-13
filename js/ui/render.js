function createTaskListItem(task) {
	const listItem = document.createElement('li');
	listItem.className = `task-item ${task.completed ? 'is-completed' : ''}`;
	listItem.dataset.id = String(task.id);

	const taskLabel = document.createElement('span');
	taskLabel.className = 'task-label';
	taskLabel.textContent = task.title;

	const taskDescription = document.createElement('p');
	taskDescription.className = 'task-description';
	taskDescription.textContent = task.description || 'No description';

	const taskPriority = document.createElement('span');
	taskPriority.className = `task-priority priority-${String(task.priority).toLowerCase()}`;
	taskPriority.textContent = task.priority;

	const actions = document.createElement('div');
	actions.className = 'task-actions';

	const completeButton = document.createElement('button');
	completeButton.type = 'button';
	completeButton.className = 'complete-btn';
	completeButton.dataset.id = String(task.id);
	completeButton.textContent = task.completed ? '↺' : '✔';
	completeButton.setAttribute('aria-label', task.completed ? 'Mark task incomplete' : 'Mark task complete');

	const deleteButton = document.createElement('button');
	deleteButton.type = 'button';
	deleteButton.className = 'delete-btn';
	deleteButton.dataset.id = String(task.id);
	deleteButton.textContent = '✕';
	deleteButton.setAttribute('aria-label', 'Delete task');

	actions.append(completeButton, deleteButton);
	listItem.append(taskLabel, taskPriority, actions, taskDescription);

	return listItem;
}

export function renderTasks(tasks) {
	const taskList = document.querySelector('#task-list');
	if (!taskList) {
		return;
	}

	taskList.textContent = '';

	if (!Array.isArray(tasks) || tasks.length === 0) {
		const emptyState = document.createElement('li');
		emptyState.className = 'task-empty';
		emptyState.textContent = 'No tasks yet. Add your first task above.';
		taskList.append(emptyState);
		return;
	}

	const fragment = document.createDocumentFragment();

	for (const task of tasks) {
		fragment.append(createTaskListItem(task));
	}

	taskList.append(fragment);
}
