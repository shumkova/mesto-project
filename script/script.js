// ===============
// Рендер карточек
// ===============

const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;

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
    fillImagePopup(cardImage.src, cardImage.alt, cardTitle.textContent);
    openPopup(imagePopup);
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

renderInitialCards(initialCards);

// ======================
// Редактирование профиля
// ======================

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupEditProfile = document.querySelector('[data-popup="edit-profile"]');
const formEditProfile = popupEditProfile.querySelector('.form');
const nameInput = popupEditProfile.querySelector('input[name="name"]');
const statusInput = popupEditProfile.querySelector('input[name="status"]');
const buttonEditPopup = document.querySelector('[data-open-popup="edit-profile"]');

const onEditFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;

  closePopup(popupEditProfile);
}

const fillEditPopupInputs = () => {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
}

formEditProfile.addEventListener('submit', onEditFormSubmit);

buttonEditPopup.addEventListener('click', (evt) => {
  evt.preventDefault();
  fillEditPopupInputs();
  openPopup(popupEditProfile);
})

// ===========================
// Добавление карточки
// ===========================

const popupAddCard = document.querySelector('[data-popup="add-card"]');
const formAddCard = popupAddCard.querySelector('.form');
const inputCardName = popupAddCard.querySelector('input[name="card-name"]');
const inputCardImageLink = popupAddCard.querySelector('input[name="card-img-link"]');
const buttonOpenAddCardPopup = document.querySelector('[data-open-popup="add-card"]');

const onCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCardInfo = {
    name: inputCardName.value,
    link: inputCardImageLink.value
  };

  addCard(newCardInfo);
  formAddCard.reset();
  closePopup(popupAddCard);
}

formAddCard.addEventListener('submit', onCardFormSubmit);

buttonOpenAddCardPopup.addEventListener('click', (evt) => {
  evt.preventDefault();
  openPopup(popupAddCard);
})

// ==============================================
// Заполнение попапов для просмотра картинок
// ==============================================

const imagePopup = document.querySelector('[data-popup="image"]');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImgCaption = imagePopup.querySelector('.popup__img-caption');

const fillImagePopup = (src, alt, caption) => {
  popupImage.src = src;
  popupImage.alt = alt;
  popupImgCaption.textContent = caption;
}

// ===========================
// Открытие и закрытие попапов
// ===========================

const POPUP_OPENED_CLASS = 'popup_state_opened';

const onEscPress = (evt) => {
  const openedPopup = document.querySelector(`.${POPUP_OPENED_CLASS}`);
  if (evt.key === 'Escape' && openedPopup) {
    closePopup(openedPopup);
  }
}

const onOverlayClick = (evt) => {
  const target = evt.target;
  if (target.classList.contains('popup__close') || target.classList.contains(POPUP_OPENED_CLASS)) {
    const openedPopup = document.querySelector(`.${POPUP_OPENED_CLASS}`);
    closePopup(openedPopup);
  }
}

const openPopup = (popup) => {
  popup.classList.add(POPUP_OPENED_CLASS);
  document.addEventListener('keydown', onEscPress);
  popup.addEventListener('click', onOverlayClick);
}

const closePopup = (popup) => {
  popup.classList.remove(POPUP_OPENED_CLASS);
  document.removeEventListener('keydown', onEscPress);
  popup.removeEventListener('click', onOverlayClick);
}

const preventBlinkingPopups = () => {
  const popups = document.querySelectorAll('[data-popup]');

  // убирает мигание попапов при загрузке страницы
  setTimeout(() => {
    popups.forEach((popup) => {
      popup.classList.remove('popup_state_preload');
    })
  }, 100);
}

preventBlinkingPopups();
