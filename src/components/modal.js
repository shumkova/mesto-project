import {clearValidation} from "./validate";

const MODAL_OPENED_CLASS = 'modal_state_opened';

const onEscPress = (evt) => {
  const openedModal = document.querySelector(`.${MODAL_OPENED_CLASS}`);
  if (evt.key === 'Escape' && openedModal) {
    closeModal(openedModal);
  }
}

const onOverlayClick = (evt) => {
  const target = evt.target;
  if (target.classList.contains('modal__close') || target.classList.contains(MODAL_OPENED_CLASS)) {
    const openedModal = document.querySelector(`.${MODAL_OPENED_CLASS}`);
    closeModal(openedModal);
  }
}

const openModal = (modal) => {
  modal.classList.add(MODAL_OPENED_CLASS);
  document.addEventListener('keydown', onEscPress);
  modal.addEventListener('click', onOverlayClick);
}

const closeModal = (modal) => {
  modal.classList.remove(MODAL_OPENED_CLASS);
  document.removeEventListener('keydown', onEscPress);
  modal.removeEventListener('click', onOverlayClick);

  const modalForm = modal.querySelector('.form');
  console.log(modalForm);
  if (modalForm) {
    clearValidation(modalForm);
  }
}

const preventBlinkingModals = () => {
  const modalList = document.querySelectorAll('[data-modal]');

  // убирает мигание модалок при загрузке страницы
  setTimeout(() => {
    modalList.forEach((modal) => {
      modal.classList.remove('modal_state_preload');
    })
  }, 100);
}

export {openModal, closeModal, preventBlinkingModals};
