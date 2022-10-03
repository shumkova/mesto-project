import {openModal, closeModal} from "./modal";
import {clearValidation} from "./validate";
import {updateProfile} from "./api";

// ======================
// Редактирование профиля
// ======================

const profileAvatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const modalEditProfile = document.querySelector('[data-modal="edit-profile"]');
const formEditProfile = modalEditProfile.querySelector('.form');
const nameInput = formEditProfile.querySelector('input[name="name"]');
const aboutInput = formEditProfile.querySelector('input[name="about"]');
const buttonEditModal = document.querySelector('[data-open-modal="edit-profile"]');
const buttonSubmitEditing = formEditProfile.querySelector('.form__submit');

const fillUserProfile = (data) => {
  profileAvatar.src = data.avatar;
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
}

const onEditFormSubmit = (evt) => {
  evt.preventDefault();
  buttonSubmitEditing.disabled = true;

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
      buttonSubmitEditing.disabled = false;
    });
}

const fillEditModalInputs = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

const enableProfileEditing = () => {
  formEditProfile.addEventListener('submit', onEditFormSubmit);

  buttonEditModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    fillEditModalInputs();
    clearValidation(formEditProfile);
    openModal(modalEditProfile);
  })
}

export {enableProfileEditing, fillUserProfile};


