import {openModal, closeModal} from "./modal";
import {clearValidation} from "./validate";
import {updateAvatar, updateProfile} from "./api";

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

const fillProfile = (profileData) => {
  profileAvatar.src = profileData.avatar;
  profileName.textContent = profileData.name;
  profileAbout.textContent = profileData.about;
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
      fillProfile(res);
      closeModal(modalEditProfile);
    })
    .catch((err) => {
      console.log(err);
      buttonSubmitProfileEditing.disabled = false;
    })
    .finally(() => {
      buttonSubmitProfileEditing.textContent = buttonText;
    });
}

const onEditAvatarSubmit = (evt) => {
  evt.preventDefault();
  buttonSubmitAvatarEditing.disabled = true;
  const buttonText = buttonSubmitAvatarEditing.textContent;
  buttonSubmitAvatarEditing.textContent = buttonSubmitAvatarEditing.dataset.loadingText;

  updateAvatar(avatarInput)
    .then((res) => {
      profileAvatar.src = res.avatar;
      formEditAvatar.reset();
      closeModal(modalEditAvatar);
    })
    .catch((err) => {
      console.log(err);
      buttonSubmitAvatarEditing.disabled = false;
    })
    .finally(() => {
      buttonSubmitAvatarEditing.textContent = buttonText;
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

export {enableProfileEditing, fillProfile};
