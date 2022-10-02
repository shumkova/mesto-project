import '../pages/index.css';
import {preventBlinkingModals} from "./modal";
import {enableAddingCard} from "./card";
import {enableValidation} from "./validate";
import {enableProfileEditing} from "./profile";

import {getCards, getUser} from "./api";

preventBlinkingModals();
getUser();
getCards();
enableProfileEditing();
enableAddingCard();
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorActiveClass: 'form__error_active'
});


