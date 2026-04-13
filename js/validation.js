import { TITLE_MIN_LENGTH, VALIDATION_MESSAGES } from './config.js';

function normalizeTitle(value) {
	return value.trim().toLowerCase();
}

export function validateTitle(title, existingTasks) {
	const trimmedTitle = title.trim();

	if (!trimmedTitle) {
		return {
			isValid: false,
			message: VALIDATION_MESSAGES.titleRequired,
		};
	}

	if (trimmedTitle.length < TITLE_MIN_LENGTH) {
		return {
			isValid: false,
			message: VALIDATION_MESSAGES.titleTooShort,
		};
	}

	const normalizedInput = normalizeTitle(trimmedTitle);
	const hasDuplicate = existingTasks.some((task) => normalizeTitle(task.title) === normalizedInput);

	if (hasDuplicate) {
		return {
			isValid: false,
			message: VALIDATION_MESSAGES.titleDuplicate,
		};
	}

	return {
		isValid: true,
		message: '',
	};
}

export function validateTaskInput({ title, existingTasks }) {
	const titleValidation = validateTitle(title, existingTasks);

	return {
		isValid: titleValidation.isValid,
		errors: {
			title: titleValidation.message,
		},
	};
}
