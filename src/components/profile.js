import {openModal, closeModal} from "./modal";
import {hasInvalidInput} from "./validate";
import {updateProfile} from "./api";

// ======================
// Редактирование профиля
// ======================

const profileAvatar = document.querySelector('.profile__avatar');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const modalEditProfile = document.querySelector('[data-modal="edit-profile"]');
const formEditProfile = modalEditProfile.querySelector('.form');
const nameInput = modalEditProfile.querySelector('input[name="name"]');
const aboutInput = modalEditProfile.querySelector('input[name="about"]');
const buttonEditModal = document.querySelector('[data-open-modal="edit-profile"]');

const fillUserProfile = (data) => {
  profileAvatar.src = data.avatar;
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
}

const onEditFormSubmit = (evt) => {
  evt.preventDefault();
  updateProfile(formEditProfile.elements.name, formEditProfile.elements.about);
  closeModal(modalEditProfile);
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
    openModal(modalEditProfile);
  })
}

export {enableProfileEditing, fillUserProfile};


