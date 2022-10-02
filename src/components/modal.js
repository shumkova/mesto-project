import {clearValidation} from "./validate";

const MODAL_OPENED_CLASS = 'modal_state_opened';

const onEscPress = (evt) => {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector(`.${MODAL_OPENED_CLASS}`);
    if (openedModal) {
      closeModal(openedModal);
    }
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
  modal.addEventListener('mousedown', onOverlayClick);
}

const closeModal = (modal) => {
  modal.classList.remove(MODAL_OPENED_CLASS);
  document.removeEventListener('keydown', onEscPress);
  modal.removeEventListener('mousedown', onOverlayClick);
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
