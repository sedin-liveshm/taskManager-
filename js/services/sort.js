const PRIORITY_ORDER = Object.freeze({
	High: 3,
	Medium: 2,
	Low: 1,
});

function getPriorityWeight(priority) {
	return PRIORITY_ORDER[priority] ?? 0;
}

export function sortTasks(tasks) {
	if (!Array.isArray(tasks) || tasks.length <= 1) {
		return Array.isArray(tasks) ? [...tasks] : [];
	}

	return [...tasks].sort((leftTask, rightTask) => {
		const priorityDelta = getPriorityWeight(rightTask.priority) - getPriorityWeight(leftTask.priority);
		if (priorityDelta !== 0) {
			return priorityDelta;
		}

		const leftCreatedAt = Number(leftTask.createdAt) || 0;
		const rightCreatedAt = Number(rightTask.createdAt) || 0;
		return rightCreatedAt - leftCreatedAt;
	});
}
