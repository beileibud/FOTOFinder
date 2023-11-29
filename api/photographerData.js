/* eslint-disable */
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// FIXME:  GET ALL AUTHORS
const getPhotographers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/photographers.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getUserByUID = (uid) => {
  return new Promise((resolve, reject) => {
    fetch(`${endpoint}/photographers.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const user = Object.values(data)[0];
        resolve(user || null);
      })
      .catch(reject);
  });
};


const getSinglePhotographer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/photographers/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});


const createPhotographers = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/photographers.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  .then((response) => response.json())
  .then((data) => {
    const { name } = data;
    const patchPayload = { firebaseKey: name, photographer_id: name };
    updatePhotographer(patchPayload).then(() => resolve(data));
  })
  .catch(reject);
});

const updatePhotographer = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/photographers/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// FIXME: DELETE AUTHOR
const deleteSinglePhotographer = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/photographers/${firebaseKey}.json`, {
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
  getPhotographers,
  getUserByUID,
  getSinglePhotographer,
  createPhotographers,
  updatePhotographer,
  deleteSinglePhotographer,
};
