import { DEFAULT_PRIORITY, PRIORITY_OPTIONS } from '../config.js';
import { getTasks, addTask } from '../integration/taskAPI.js';
import { getFormElements, setFieldError, setSubmitState } from '../dom.js';
import { validateTaskInput } from '../validation.js';

function sanitizeInput(value) {
	return value.trim();
}

function buildTaskObject({ title, priority, description }) {
	const now = Date.now();

	return {
		id: now,
		title,
		priority,
		description,
		createdAt: now,
		completed: false,
	};
}

function normalizePriority(priority) {
	return PRIORITY_OPTIONS.includes(priority) ? priority : DEFAULT_PRIORITY;
}

export function initializeTaskForm() {
	const {
		form,
		titleInput,
		priorityInput,
		descriptionInput,
		titleError,
		submitButton,
	} = getFormElements();

	function validateCurrentForm() {
		const validationResult = validateTaskInput({
			title: titleInput.value,
			existingTasks: getTasks(),
		});

		setFieldError(titleInput, titleError, validationResult.errors.title);
		setSubmitState(submitButton, !validationResult.isValid);

		return validationResult;
	}

	titleInput.addEventListener('input', validateCurrentForm);

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const validationResult = validateCurrentForm();
		if (!validationResult.isValid) {
			return;
		}

		const task = buildTaskObject({
			title: sanitizeInput(titleInput.value),
			priority: normalizePriority(priorityInput.value),
			description: sanitizeInput(descriptionInput.value),
		});

		addTask(task);
		form.reset();
		priorityInput.value = DEFAULT_PRIORITY;
		validateCurrentForm();
	});

	validateCurrentForm();
}
