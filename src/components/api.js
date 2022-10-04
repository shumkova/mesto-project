import {renderInitialCards} from "./card";
import {fillUserProfile} from "./profile";

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-15',
  token: '0a6f2833-af50-47bd-9ef3-217391db1563',
}

let userId;

const getUser = () => {
  fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.token
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
      if (!userId) {
        userId = result['_id'];
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

const getCards = () => {
  fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.token
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

const updateProfile = (nameInput, aboutInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: aboutInput.value
    })
  })
}

const postCard = (nameInput, urlInput) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      link: urlInput.value
    })
  })
}

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token,
    }
  })
}

const likeOrDislike = (method, cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: config.token,
    }
  })
}

const updateAvatar = (urlInput) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(({
      avatar: urlInput.value
    }))
  })
}

export {userId, getUser, getCards, updateProfile, postCard, deleteCard, likeOrDislike, updateAvatar};

