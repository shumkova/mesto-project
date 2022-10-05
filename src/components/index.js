import '../pages/index.css';

import {closeModal, openModal, preventBlinkingModals} from "./modal";
import {enableValidation} from "./validate";
import {fillProfile, enableProfileEditing} from "./profile";
import {deleteCard, getCards, getUser, postCard} from "./api";
import {createCard, cardToDelete} from "./card";

let userId;

const cardsContainer = document.querySelector('.cards__list');
const modalConfirmDelete = document.querySelector('[data-modal="delete-card"]');
const formConfirmDelete = modalConfirmDelete.querySelector('.form');
const buttonConfirmDelete = modalConfirmDelete.querySelector('.form__submit');

const renderInitialCards = (cardsData) => {
  const cardsFrag = document.createDocumentFragment();
  cardsData.forEach((item) => cardsFrag.append(createCard(item)));
  cardsContainer.append(cardsFrag);
}

const renderCard = (cardInfo) => {
  cardsContainer.prepend(createCard(cardInfo));
}

const removeCardFromDom = (cardEl) => {
  cardEl.remove();
}

const onDeleteSubmit = (evt) => {
  evt.preventDefault();
  buttonConfirmDelete.disabled = true;
  const buttonText = buttonConfirmDelete.textContent;
  buttonConfirmDelete.textContent = buttonConfirmDelete.dataset.loadingText;

  deleteCard(cardToDelete.id)
    .then(() => {
      removeCardFromDom(cardToDelete.element);
      closeModal(modalConfirmDelete);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonConfirmDelete.disabled = false;
      buttonConfirmDelete.textContent = buttonText;
    });
}

// ===========================
// Добавление карточки
// ===========================

const modalAddCard = document.querySelector('[data-modal="add-card"]');
const formAddCard = modalAddCard.querySelector('.form');
const inputCardName = formAddCard.querySelector('input[name="card-name"]');
const inputCardImageLink = formAddCard.querySelector('input[name="card-img-link"]');
const buttonOpenAddCardModal = document.querySelector('[data-open-modal="add-card"]');
const buttonSubmitAddCard = formAddCard.querySelector('.form__submit');

const onFormAddCardSubmit = (evt) => {
  evt.preventDefault();
  buttonSubmitAddCard.disabled = true;
  const buttonText = buttonSubmitAddCard.textContent;
  buttonSubmitAddCard.textContent = buttonSubmitAddCard.dataset.loadingText;

  postCard(inputCardName, inputCardImageLink)
    .then((res) => {
      renderCard(res);
      formAddCard.reset();
      closeModal(modalAddCard);
    })
    .catch((err) => {
      console.log(err);
      buttonSubmitAddCard.disabled = false;
    })
    .finally(() => {
      buttonSubmitAddCard.textContent = buttonText;
    });
}

const enableCardActions = () => {
  formAddCard.addEventListener('submit', onFormAddCardSubmit);

  buttonOpenAddCardModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal(modalAddCard);
  })

  formConfirmDelete.addEventListener('submit', onDeleteSubmit);
}

// ==============================================
// Заполнение модалки с картинкой
// ==============================================

const imageModal = document.querySelector('[data-modal="image"]');
const modalImage = imageModal.querySelector('.modal__image');
const modalImgCaption = imageModal.querySelector('.modal__img-caption');

const fillImageModal = (src, alt, caption) => {
  modalImage.src = src;
  modalImage.alt = alt;
  modalImgCaption.textContent = caption;
}

// ==============================================
// Запуск всего
// ==============================================

preventBlinkingModals();

Promise.all([getUser, getCards])
  .then(([user, cards]) => {
    userId = user['_id'];
    fillProfile(user);
    renderInitialCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });

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

export {fillImageModal, userId};
