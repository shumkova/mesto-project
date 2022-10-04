import {openModal, closeModal} from "./modal";
import {deleteCard, likeOrDislike, postCard, userId} from "./api";

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
      deleteBtn.disabled = true;
      const cardEL = evt.target.closest('.card');

      deleteCard(cardInfo['_id'])
        .then((res) => {
          if (res.ok) {
            cardEL.remove();
          } else {
            return Promise.reject(`Не удалось удалить карточку: ${res.status}`);
          }
        })
        .catch((err) => {
          console.log(err);
          deleteBtn.disabled = false;
        })
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

const renderInitialCards = (cardsData) => {
  const cardsFrag = document.createDocumentFragment();

  cardsData.forEach((item) => {
    cardsFrag.append(createCard(item));
  });

  cardsContainer.append(cardsFrag);
}

const addCard = (cardInfo) => {
  cardsContainer.prepend(createCard(cardInfo));
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

const enableAddingCard = () => {
  formAddCard.addEventListener('submit', onCardFormSubmit);

  buttonOpenAddCardModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal(modalAddCard);
  })
}

export {renderInitialCards, enableAddingCard};
