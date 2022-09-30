import './pages/index.css';
import {initialCards} from "./components/initial-cards";
import {preventBlinkingModals} from "./components/modal";
import {enableAddingCard, renderInitialCards} from "./components/card";
import {enableValidation} from "./components/validate";
import {enableProfileEditing} from "./components/profile";

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
