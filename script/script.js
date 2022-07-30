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

// Создание модальных окон для просмотра картинок

function createImagePopup (cardInfo) {

}

// Рендер карточек

const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;

function createCard (cardInfo) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeBtn = card.querySelector('.card__like-button');
  const deleteBtn = card.querySelector('.card__delete');

  cardImage.src = cardInfo.link;
  cardTitle.textContent = cardInfo.name;

  likeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  deleteBtn.addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  })

  return card;
}

function renderInitialCards (cardsData) {
  let frag = document.createDocumentFragment();

  cardsData.forEach( (item) => {
    frag.append(createCard(item));
  });

  cardsContainer.append(frag);
}

function addCard (cardInfo) {
  cardsContainer.prepend(createCard(cardInfo));
}

renderInitialCards(initialCards);



// Убирает мигание модалок при загрузке страницы

const popups = document.querySelectorAll('.popup');

function initPopups (popupsArr) {
  setTimeout(function () {
    popupsArr.forEach((popup) => {
      popup.classList.add('popup_initialized');
    })
  }, 100);
}

initPopups(popups);


// Модалка редактирования профиля

const editButton = document.querySelector('.profile__edit');
const editPopup = document.querySelector('.popup_edit-profile');
const closeEditPopupButton = editPopup.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

const editForm = editPopup.querySelector('.form');
let nameInput = editPopup.querySelector('input[name="name"]');
let statusInput = editPopup.querySelector('input[name="status"]');
const editPopupSubmitButton = editPopup.querySelector('.form__submit');

function closeEditPopup () {
  editPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEditPopupOnEsc);
}

function closeEditPopupOnEsc (evt) {
  if (evt.key === 'Escape') {
    closeEditPopup();
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  nameInput = editPopup.querySelector('input[name="name"]');
  statusInput = editPopup.querySelector('input[name="status"]');

  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;

  closeEditPopup();
}

editForm.addEventListener('submit', formSubmitHandler);

closeEditPopupButton.addEventListener('click', closeEditPopup);

editButton.addEventListener('click', function () {
  editPopup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;

  document.addEventListener('keydown', closeEditPopupOnEsc);
});


// Модалка добавления карточки

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_add-card');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close');
const addCardForm = addCardPopup.querySelector('.form');


function closeAddCardPopup () {
  addCardPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeAddCardPopupOnEsc);
}

function closeAddCardPopupOnEsc (evt) {
  if (evt.key === 'Escape') {
    closeEditPopup();
  }
}

function addCardFormSubmitHandler (evt) {
  evt.preventDefault();

  console.log('submit');

  const newCardInfo = {
    name: addCardPopup.querySelector('input[name="card-name"]').value,
    link: addCardPopup.querySelector('input[name="card-img-link"]').value
  };

  addCard(newCardInfo);
  addCardForm.reset();
  closeAddCardPopup();
}

addCardForm.addEventListener('submit', addCardFormSubmitHandler);

closeAddCardPopupButton.addEventListener('click', closeAddCardPopup);

addCardButton.addEventListener('click', function () {
  addCardPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closeAddCardPopupOnEsc);
});
