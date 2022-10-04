import '../pages/index.css';

import {preventBlinkingModals} from "./modal";
import {enableCardActions, renderInitialCards} from "./card";
import {enableValidation} from "./validate";
import {renderProfile, enableProfileEditing} from "./profile";

preventBlinkingModals();
renderProfile();
renderInitialCards();
enableProfileEditing();
enableCardActions();
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorActiveClass: 'form__error_active'
});


