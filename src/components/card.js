import {openModal, closeModal} from "./modal";
import {clearValidation} from "./validate";

// ===============
// Рендер карточек
// ===============

const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;
const imageModal = document.querySelector('[data-modal="image"]');

const toggleLikes = (evt) => {
  evt.target.classList.toggle('card__like-button_active');
}

const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
}

const createCard = (cardInfo) => {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeBtn = card.querySelector('.card__like-button');
  const deleteBtn = card.querySelector('.card__delete-button');

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.alt;
  cardTitle.textContent = cardInfo.name;

  likeBtn.addEventListener('click', toggleLikes);
  deleteBtn.addEventListener('click', deleteCard);

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
const inputCardName = modalAddCard.querySelector('input[name="card-name"]');
const inputCardImageLink = modalAddCard.querySelector('input[name="card-img-link"]');
const buttonOpenAddCardModal = document.querySelector('[data-open-modal="add-card"]');

const onCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCardInfo = {
    name: inputCardName.value,
    link: inputCardImageLink.value
  };

  addCard(newCardInfo);
  formAddCard.reset();
  closeModal(modalAddCard);
}

const enableAddingCard = () => {
  formAddCard.addEventListener('submit', onCardFormSubmit);

  buttonOpenAddCardModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearValidation(formAddCard);
    openModal(modalAddCard);
  })
}

export {renderInitialCards, enableAddingCard};
