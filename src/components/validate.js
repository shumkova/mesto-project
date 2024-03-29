let formElements;

const showInputError = (formEl, inputEl, errorMessage) => {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(formElements.inputErrorClass);
  if (!errorEl) {
    return;
  }
  errorEl.textContent = errorMessage;
  errorEl.classList.add(formElements.errorActiveClass);
}

const hideInputError = (formEl, inputEl) => {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove(formElements.inputErrorClass);
  if (!errorEl) {
    return;
  }
  errorEl.classList.remove(formElements.errorActiveClass);
  errorEl.textContent = '';
}

const checkInputValidity = (formEl, inputEl) => {
  if (inputEl.validity.patternMismatch) {
    inputEl.setCustomValidity(inputEl.dataset.errorMessage);
  } else {
    inputEl.setCustomValidity('');
  }

  if (inputEl.validity.valid) {
    hideInputError(formEl, inputEl);
  } else {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  })
}

const toggleSubmitButtonState = (inputList, buttonEl) => {
  buttonEl.disabled = !!hasInvalidInput(inputList);
}

const setInputEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(formElements.inputSelector));
  const buttonEl = formEl.querySelector(formElements.submitButtonSelector);
  toggleSubmitButtonState(inputList, buttonEl);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', () => {
      checkInputValidity(formEl, inputEl);
      toggleSubmitButtonState(inputList, buttonEl);
    })
  })
}

const validateForm = (formEl) => {
  formEl.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
  setInputEventListeners(formEl);
}

const enableValidation = (elementsObj) => {
  formElements = elementsObj;
  const formList = Array.from(document.querySelectorAll(formElements.formSelector));

  formList.forEach((formEl) => {
    validateForm(formEl);
  })
}

const clearValidation = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(formElements.inputSelector));
  const buttonEl = formEl.querySelector(formElements.submitButtonSelector);

  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl);
  })

  toggleSubmitButtonState(buttonEl);
}

export {enableValidation, clearValidation, validateForm};
