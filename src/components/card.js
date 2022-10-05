import {openModal} from "./modal";
import {likeOrDislike} from "./api";
import {fillImageModal} from "./index";
import {userId} from "./index";

const LIKE_BTN_ACTIVE_CLASS = 'card__like-button_active';
const cardTemplate = document.querySelector('#card').content;
const imageModal = document.querySelector('[data-modal="image"]');
const modalConfirmDelete = document.querySelector('[data-modal="delete-card"]');

const cardToDelete = {
  id: '',
  element: ''
};

const displayLikes = (likeBtnEl, likesCounterEl, likesArr) => {
  if (likesArr.some((item) => item['_id'] === userId)) {
    likeBtnEl.classList.add(LIKE_BTN_ACTIVE_CLASS);
  } else {
    likeBtnEl.classList.remove(LIKE_BTN_ACTIVE_CLASS);
  }

  likesCounterEl.textContent = likesArr.length;
}

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

  displayLikes(likeBtn, likesCounter, cardInfo.likes);

  likeBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    likeBtn.disabled = true;
    const method = likeBtn.classList.contains(LIKE_BTN_ACTIVE_CLASS) ? 'DELETE' : 'PUT';

    likeOrDislike(method, cardInfo['_id'])
      .then((res) => {
        displayLikes(likeBtn, likesCounter, res.likes);
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
      openModal(modalConfirmDelete);
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

export {createCard, cardToDelete};
