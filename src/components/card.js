import {openModal, closeModal} from "./modal";
import {deleteCard, getCards, likeOrDislike, postCard} from "./api";
import {userId} from "./profile";

// ===============
// Рендер карточек
// ===============

const LIKE_BTN_ACTIVE_CLASS = 'card__like-button_active';
const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;
const imageModal = document.querySelector('[data-modal="image"]');

const modalDelete = document.querySelector('[data-modal="delete"]');
const formDelete = modalDelete.querySelector('.form');
const buttonConfirmDeletion = formDelete.querySelector('.form__submit');

const cardToDelete = {
  id: '',
  element: ''
};

const createCard = (cardInfo) => {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeBtn = card.querySelector('.card__like-button');
  const likesCounter = card.querySelector('.card__likes-counter');
  const deleteBtn = card.querySelector('.card__delete-button');

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  likesCounter.textContent = cardInfo.likes.length;

  if (cardInfo.likes.some((item) => item['_id'] === userId)) {
    likeBtn.classList.add(LIKE_BTN_ACTIVE_CLASS);
  }

  likeBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    likeBtn.disabled = true;
    const method = likeBtn.classList.contains(LIKE_BTN_ACTIVE_CLASS) ? 'DELETE' : 'PUT';

    likeOrDislike(method, cardInfo['_id'])
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Произошла ошибка: ${res.status}`);
      })
      .then((res) => {
        likeBtn.classList.toggle(LIKE_BTN_ACTIVE_CLASS);
        likesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        likeBtn.disabled = false;
      })
  });

  if (userId === cardInfo.owner['_id']) {
    deleteBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      cardToDelete.element = evt.target.closest('.card');
      cardToDelete.id = cardInfo['_id'];
      openModal(modalDelete);
    });
  } else {
    deleteBtn.remove();
  }

  cardImage.addEventListener('click', () => {
    fillImageModal(cardImage.src, cardImage.alt, cardTitle.textContent);
    openModal(imageModal);
  })

  return card;
}

const renderInitialCards = () => {
  getCards()
    .then((res) => {
      const cardsFrag = document.createDocumentFragment();

      res.forEach((item) => {
        cardsFrag.append(createCard(item));
      });

      cardsContainer.append(cardsFrag);
    })
}

const addCard = (cardInfo) => {
  cardsContainer.prepend(createCard(cardInfo));
}

const onDeleteSubmit = (evt) => {
  evt.preventDefault();
  buttonConfirmDeletion.disabled = true;
  const buttonText = buttonConfirmDeletion.textContent;
  buttonConfirmDeletion.textContent = buttonConfirmDeletion.dataset.loadingText;

  deleteCard(cardToDelete.id)
    .then((res) => {
      if (res.ok) {
        cardToDelete.element.remove();
        closeModal(modalDelete);
      } else {
        return Promise.reject(`Не удалось удалить карточку: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonConfirmDeletion.disabled = false;
      buttonConfirmDeletion.textContent = buttonText;
    });
}

// ==============================================
// Заполнение модалки с картинкой
// ==============================================

const modalImage = imageModal.querySelector('.modal__image');
const modalImgCaption = imageModal.querySelector('.modal__img-caption');

const fillImageModal = (src, alt, caption) => {
  modalImage.src = src;
  modalImage.alt = alt;
  modalImgCaption.textContent = caption;
}

// ===========================
// Добавление карточки
// ===========================

const modalAddCard = document.querySelector('[data-modal="add-card"]');
const formAddCard = modalAddCard.querySelector('.form');
const inputCardName = formAddCard.querySelector('input[name="card-name"]');
const inputCardImageLink = formAddCard.querySelector('input[name="card-img-link"]');
const buttonOpenAddCardModal = document.querySelector('[data-open-modal="add-card"]');
const buttonSubmitEditing = formAddCard.querySelector('.form__submit');

const onCardFormSubmit = (evt) => {
  evt.preventDefault();
  buttonSubmitEditing.disabled = true;
  const buttonText = buttonSubmitEditing.textContent;
  buttonSubmitEditing.textContent = buttonSubmitEditing.dataset.loadingText;

  postCard(inputCardName, inputCardImageLink)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось опубликовать пост:  ${res.status}`);
    })
    .then((res) => {
      addCard(res);
      formAddCard.reset();
      closeModal(modalAddCard);
    })
    .finally(() => {
      buttonSubmitEditing.disabled = false;
      buttonSubmitEditing.textContent = buttonText;
    });
}

const enableCardActions = () => {
  formAddCard.addEventListener('submit', onCardFormSubmit);

  buttonOpenAddCardModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal(modalAddCard);
  })

  modalDelete.addEventListener('submit', onDeleteSubmit);
}

export {renderInitialCards, enableCardActions};
