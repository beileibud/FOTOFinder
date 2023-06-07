import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// FIXME:  GET ALL books
const getPhotos = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/photos.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// get single book
const getSinglePhoto = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/photos/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createPhotos = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/photos.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePhotos = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/photos/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// FIXME: DELETE AUTHOR
const deleteSinglePhoto = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/photos/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getPhotos,
  updatePhotos,
  createPhotos,
  deleteSinglePhoto,
  getSinglePhoto,
};
