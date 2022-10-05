const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-15',
  token: '0a6f2833-af50-47bd-9ef3-217391db1563',
}

const _getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);;
  }

  return res.json();
}

const getUser = fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.token
    }
  })
    .then(_getResponseData);


const getCards = fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.token
    }
  })
    .then(_getResponseData);

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
    .then(_getResponseData);
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
    .then(_getResponseData);
}

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token,
    }
  })
    .then(_getResponseData);
}

const likeOrDislike = (method, cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: config.token,
    }
  })
    .then(_getResponseData);
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
    .then(_getResponseData);
}

export {getUser, getCards, updateProfile, postCard, deleteCard, likeOrDislike, updateAvatar};
