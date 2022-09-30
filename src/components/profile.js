import {openModal, closeModal} from "./modal";

// ======================
// Редактирование профиля
// ======================

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const modalEditProfile = document.querySelector('[data-modal="edit-profile"]');
const formEditProfile = modalEditProfile.querySelector('.form');
const nameInput = modalEditProfile.querySelector('input[name="name"]');
const statusInput = modalEditProfile.querySelector('input[name="about"]');
const buttonEditModal = document.querySelector('[data-open-modal="edit-profile"]');

const onEditFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = statusInput.value;

  closeModal(modalEditProfile);
}

const fillEditModalInputs = () => {
  nameInput.value = profileName.textContent;
  statusInput.value = profileStatus.textContent;
}

const enableProfileEditing = () => {
  formEditProfile.addEventListener('submit', onEditFormSubmit);

  buttonEditModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    fillEditModalInputs();
    openModal(modalEditProfile);
  })
}

export {enableProfileEditing};


