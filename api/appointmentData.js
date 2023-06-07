import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// FIXME:  GET ALL books
const getAppointments = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/appointment/.json`, {
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
const getSingleAppointment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/appointment/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createAppointments = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/appointment.json`, {
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

const updateAppointments = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/appointment/${payload.firebaseKey}.json`, {
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
const deleteSingleAppointments = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/appointment/${firebaseKey}.json`, {
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
  getAppointments,
  updateAppointments,
  createAppointments,
  deleteSingleAppointments,
  getSingleAppointment,
};
