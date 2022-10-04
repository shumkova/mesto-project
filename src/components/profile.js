import {openModal, closeModal} from "./modal";
import {clearValidation} from "./validate";
import {getUser, updateAvatar, updateProfile} from "./api";

// ======================
// Редактирование профиля и аватара
// ======================

const profileAvatar = document.querySelector('.profile__avatar-image');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const modalEditProfile = document.querySelector('[data-modal="edit-profile"]');
const formEditProfile = modalEditProfile.querySelector('.form');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const aboutInput = formEditProfile.querySelector('input[name="about"]');
const buttonEditProfile = document.querySelector('[data-open-modal="edit-profile"]');
const buttonSubmitProfileEditing = formEditProfile.querySelector('.form__submit');

const buttonEditAvatar = document.querySelector('[data-open-modal="edit-avatar"]');
const modalEditAvatar = document.querySelector('[data-modal="edit-avatar"]');
const formEditAvatar = modalEditAvatar.querySelector('.form');
const avatarInput = formEditAvatar.querySelector('input[name="avatar-img-link"]');
const buttonSubmitAvatarEditing = formEditAvatar.querySelector('.form__submit');

let userId;

const fillUserProfile = (data) => {
  profileAvatar.src = data.avatar;
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
}

const renderProfile = () => {
  getUser()
    .then((res) => {
      fillUserProfile(res);
      userId = res['_id'];
    })
    .catch((err) => {
      console.log(err);
    });
}

const fillEditModalInputs = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

const onEditFormSubmit = (evt) => {
  evt.preventDefault();
  buttonSubmitProfileEditing.disabled = true;
  const buttonText = buttonSubmitProfileEditing.textContent;
  buttonSubmitProfileEditing.textContent = buttonSubmitProfileEditing.dataset.loadingText;

  updateProfile(formEditProfile.elements.name, formEditProfile.elements.about)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось обновить данные пользователя: ${res.status}`);
    })
    .then((result) => {
      fillUserProfile(result);
      closeModal(modalEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitProfileEditing.textContent = buttonText;
      buttonSubmitProfileEditing.disabled = false;
    });
}

const onEditAvatarSubmit = (evt) => {
  evt.preventDefault();
  buttonSubmitAvatarEditing.disabled = true;
  const buttonText = buttonSubmitAvatarEditing.textContent;
  buttonSubmitAvatarEditing.textContent = buttonSubmitAvatarEditing.dataset.loadingText;

  updateAvatar(avatarInput)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Не удалось обновить аватар: ${res.status}`);
    })
    .then((res) => {
      profileAvatar.src = res.avatar;
      formEditAvatar.reset();
      closeModal(modalEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSubmitAvatarEditing.textContent = buttonText;
      buttonSubmitAvatarEditing.disabled = false;
    });
}

const enableProfileEditing = () => {
  formEditProfile.addEventListener('submit', onEditFormSubmit);
  formEditAvatar.addEventListener('submit', onEditAvatarSubmit);

  buttonEditProfile.addEventListener('click', (evt) => {
    evt.preventDefault();
    fillEditModalInputs();
    clearValidation(formEditProfile);
    openModal(modalEditProfile);
  })

  buttonEditAvatar.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModal(modalEditAvatar);
  })
}

export {renderProfile, enableProfileEditing, fillUserProfile, userId};
