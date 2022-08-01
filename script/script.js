const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Зелёные, слегка заснеженные горы'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Не замёрзшая зимой речка'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Мрачные панельки в сумерках'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Заснеженная вершина'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железнодорожный путь посреди зелёного леса'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Замёрзший берег Байкала, скалистый край заснеженного острова'
  }
];



// ===============
// Рендер карточек
// ===============

const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;

const toggleLikes = (evt) => {
  evt.target.classList.toggle('card__like-button_active');
  evt.stopPropagation();
}

const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
  evt.stopPropagation();
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
  deleteBtn.addEventListener('click', deleteCard)

  return card;
}

const renderInitialCards = (cardsData) => {
  let cardsFrag = document.createDocumentFragment();

  cardsData.forEach((item) => {
    cardsFrag.append(createCard(item));
  });

  cardsContainer.append(cardsFrag);
}

const addCard = (cardInfo) => {
  cardsContainer.prepend(createCard(cardInfo));
}



// ==============================
// Модалка редактирования профиля
// ==============================

const editPopup = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const editForm = editPopup.querySelector('.form');
let nameInput = editPopup.querySelector('input[name="name"]');
let statusInput = editPopup.querySelector('input[name="status"]');

const onEditFormSubmit = (evt) => {
  evt.preventDefault();

  nameInput = editPopup.querySelector('input[name="name"]');
  statusInput = editPopup.querySelector('input[name="status"]');

  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;

  closePopup(editPopup);
}

editForm.addEventListener('submit', onEditFormSubmit);

const onEditPopupOpen = () => {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
}


// ===========================
// Модалка добавления карточки
// ===========================

const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardForm = addCardPopup.querySelector('.form');

const onCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCardInfo = {
    name: addCardPopup.querySelector('input[name="card-name"]').value,
    link: addCardPopup.querySelector('input[name="card-img-link"]').value
  };

  addCard(newCardInfo);
  addCardForm.reset();
  closePopup(addCardPopup);
}

const initAddCardFormSubmit = () => {
  addCardForm.addEventListener('submit', onCardFormSubmit);
}

// ==============================================
// Открытие модальных окон для просмотра картинок
// ==============================================

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const fillImagePopup = (src, alt, caption) => {
  popupImage.src = src;
  popupImage.alt = alt;
  popupCaption.textContent = caption;
}

const onImagePopupOpen = (evt) => {
  let target = evt.target;

  const card = target.closest('.card');

  if (card) {
    let cardImage = card.querySelector('.card__image');
    let cardCaption = card.querySelector('.card__caption');

    fillImagePopup(cardImage.src, cardImage.alt, cardCaption.textContent);
  }
}

const clearImagePopup = () => {
  popupImage.src = '';
  popupImage.alt = '';
  popupCaption.textContent = '';
}

const onImagePopupClose = () => {
  setTimeout(clearImagePopup, 300);
}



// ====================
// Открытие и закрытие попапов
// ====================

const POPUP_OPENED_CLASS = 'popup_state_opened';

const openPopup = (evt, popup, openCallback) => {
  if (openCallback) {
    openCallback(evt);
  }

  popup.classList.add(POPUP_OPENED_CLASS);
}

const closePopup = (popup, closeCallback) => {
  popup.classList.remove(POPUP_OPENED_CLASS);

  if (closeCallback) {
    closeCallback();
  }
}

const onEscPress = (evt, popup, closeCallback) => {
  if (evt.key === 'Escape' && popup.classList.contains(POPUP_OPENED_CLASS)) {
    closePopup(popup, closeCallback);
  }
}

const setupPopup = (popupId, popup, btn, openCallback, closeCallback) => {
  btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup(evt, popup, openCallback);
  })

  popup.addEventListener('click', (evt) => {
    let target = evt.target;
    if (target.classList.contains('popup__close') || target.classList.contains('popup')) {
      closePopup(popup, closeCallback);
    }
  })

  document.addEventListener('keydown', (evt) => {
    onEscPress(evt, popup, closeCallback);
  })
}

const initPopup = (popupId, popup, btn) => {
  switch (popupId) {
    case 'edit-profile':
      setupPopup(popupId, popup, btn, onEditPopupOpen);
      break
    case 'image':
      setupPopup(popupId, popup, btn, onImagePopupOpen, onImagePopupClose);
      break
    default:
      setupPopup(popupId, popup, btn);
  }
}

const initPopups = () => {
  const popups = document.querySelectorAll('[data-popup]');
  const openPopupButtons = document.querySelectorAll('[data-open-popup]')

  // убирает мигание модалок при загрузке страницы
  setTimeout(() => {
    popups.forEach((popup) => {
      popup.classList.remove('popup_state_preload');
    })
  }, 100);

  openPopupButtons.forEach((btn) => {
    const popupId = btn.dataset.openPopup;
    const popup = document.querySelector(`[data-popup=${popupId}]`);
    if (popup) {
      initPopup(popupId, popup, btn);
    }
  })
}




window.addEventListener('load', () => {
  renderInitialCards(initialCards);
  initPopups();
  initAddCardFormSubmit();
})
