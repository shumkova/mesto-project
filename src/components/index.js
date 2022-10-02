import '../pages/index.css';
import {initialCards} from "./initial-cards";
import {preventBlinkingModals} from "./modal";
import {enableAddingCard, renderInitialCards} from "./card";
import {enableValidation} from "./validate";
import {enableProfileEditing} from "./profile";

preventBlinkingModals();
renderInitialCards(initialCards);
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
