import {renderInitialCards} from "./card";
import {fillUserProfile} from "./profile";

const URL = 'https://mesto.nomoreparties.co/v1';
const token = '0a6f2833-af50-47bd-9ef3-217391db1563';
const id = 'plus-cohort-15';

const getUser = () => {
  fetch(`${URL}/${id}/users/me`, {
    headers: {
      authorization: token
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Не удалось загрузить данные пользователя: ${res.status}`);
    })
    .then((result) => {
      fillUserProfile(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

const getCards = () => {
  fetch(`${URL}/${id}/cards`, {
    headers: {
      authorization: token
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Не удалось загрузить посты: ${res.status}`);
    })
    .then((res) => {
      renderInitialCards(res);
    })
}

const updateProfile = (name, about) => {
  fetch(`${URL}/${id}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      about: about.value
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Не удалось обновить данные пользователя: ${res.status}`);
    })
    .then((result) => {
      fillUserProfile(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

export {getUser, getCards, updateProfile};
