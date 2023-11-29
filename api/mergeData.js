import { getSingleAppointment } from "./appointmentData";
import { deleteSinglePhoto, getPhotographersPhotos } from "./photoData";
import { deleteSinglePhotographer, getSinglePhotographer } from "./photographerData";

const viewPhotographersDetail = (photographersFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSinglePhotographer(photographersFirebaseKey), getPhotographersPhotos(photographersFirebaseKey)])
    .then(([photographerObject, photographerPhotosArray]) => {
      resolve({ ...photographerObject, photos: photographerPhotosArray });
    })
    .catch((error) => reject(error));
});


const viewAppointmentDetails = (appointmentFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAppointment(appointmentFirebaseKey)
    .then((appObject) => {
      if (!appObject) {
        resolve({});
      } else {
        getSinglePhotographer(appObject.photographer_id)
          .then((photographerObject) => {
            resolve({ photographerObject, ...appObject });
          })
          .catch(reject);
      }
    })
    .catch(reject);
});



  const deletePhotographerPhoto = (photographer_id) => new Promise((resolve, reject) => {
    getPhotographersPhotos(photographer_id).then((photosArray) => {
      console.warn(photosArray, 'Photographer Photos');
      const deletePhotoPromises = photosArray.map((photo) => deleteSinglePhoto(photo.firebaseKey));
  
      Promise.all(deletePhotoPromises).then(() => {
        deleteSinglePhotographer(photographer_id).then(resolve);
      });
    }).catch((error) => reject(error));
  });

  export { viewPhotographersDetail, deletePhotographerPhoto, viewAppointmentDetails };