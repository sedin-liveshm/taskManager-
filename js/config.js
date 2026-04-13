export const PRIORITY_OPTIONS = Object.freeze(['High', 'Medium', 'Low']);

export const DEFAULT_PRIORITY = 'Medium';

export const TITLE_MIN_LENGTH = 3;

export const VALIDATION_MESSAGES = Object.freeze({
	titleRequired: 'Title is required.',
	titleTooShort: `Title must be at least ${TITLE_MIN_LENGTH} characters.`,
	titleDuplicate: 'Title must be unique.',
});

export const FIELD_NAMES = Object.freeze({
	title: 'title',
	priority: 'priority',
	description: 'description',
});
