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

const getClientsAppointment = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/appointment.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
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
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update appointment.'); // Add an error message here
      }
      return response.json();
    })
    .then((data) => resolve(Object.values(data)))
    .catch((error) => {
      console.error('Error updating appointment:', error); // Log the error for debugging
      reject(error);
    });
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

const getPhotographersAppointments = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/appointment.json?orderBy="photographer_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAppointments,
  getClientsAppointment,
  getPhotographersAppointments,
  updateAppointments,
  createAppointments,
  deleteSingleAppointments,
  getSingleAppointment,
};
