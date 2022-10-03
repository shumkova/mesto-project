import {renderInitialCards} from "./card";
import {fillUserProfile} from "./profile";

const URL = 'https://mesto.nomoreparties.co/v1';
const token = '0a6f2833-af50-47bd-9ef3-217391db1563';
const id = 'plus-cohort-15';
let userId;

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
      if (!userId) {
        userId = result['_id'];
      }
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
  return fetch(`${URL}/${id}/users/me`, {
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
}

const postCard = (name, url) => {
  return fetch(`${URL}/${id}/cards`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      link: url.value
    })
  })
}

const deleteCard = (cardId) => {
  return fetch(`${URL}/${id}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    }
  })
}

const likeOrDislike = (method, cardId) => {
  return fetch(`${URL}/${id}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: token,
    }
  })
}

const removeLike = (cardId) => {
  return fetch(`${URL}/${id}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    }
  })
}


export {getUser, getCards, updateProfile, postCard, userId, deleteCard, removeLike, likeOrDislike};

