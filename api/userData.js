/* eslint-disable */
import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// FIXME:  GET ALL AUTHORS
const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users.json`, {
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

const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${payload.firebaseKey}.json`, {
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
const deleteSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${firebaseKey}.json`, {
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
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteSingleUser,
};
