export function getFormElements() {
	const form = document.querySelector('#taskForm');
	const titleInput = document.querySelector('#titleInput');
	const priorityInput = document.querySelector('#priorityInput');
	const descriptionInput = document.querySelector('#descriptionInput');
	const titleError = document.querySelector('#titleError');
	const submitButton = document.querySelector('#submitButton');

	if (!form || !titleInput || !priorityInput || !descriptionInput || !titleError || !submitButton) {
		throw new Error('Task form elements are missing in the DOM.');
	}

	return {
		form,
		titleInput,
		priorityInput,
		descriptionInput,
		titleError,
		submitButton,
	};
}

export function setFieldError(inputElement, errorElement, message) {
	const hasError = Boolean(message);

	inputElement.classList.toggle('is-invalid', hasError);
	inputElement.setAttribute('aria-invalid', String(hasError));
	errorElement.textContent = message ?? '';
}

export function setSubmitState(buttonElement, disabled) {
	buttonElement.disabled = disabled;
}
