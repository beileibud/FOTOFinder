/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPhotos, updatePhotos } from '../../api/photoData';


const initialState = {
  image: '',
  firebaseKey: '',
  favorite: 'false',
  type: '',
  photographer_name: '',
  photographer_uid: '',
};

function PhotoForm({ photoObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (photoObj.firebaseKey) setFormInput(photoObj);
  }, [photoObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photoObj.firebaseKey) {
      updatePhotos(formInput).then(() => router.push(`/photos`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPhotos(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePhotos(patchPayload).then(() => {
          router.push('/photos');
        });
      });
    }
  };

  return (
    <div className="photo-form">
      <Form onSubmit={handleSubmit}>
        <h2 className="mt-5">{photoObj.firebaseKey ? 'Update' : 'Create'} Photo</h2>
        
        <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label=" photographer" className="mb-3">
          <Form.Control type="text" placeholder="photographer" name="photographer_name" value={formInput.photographer_name} onChange={handleChange} required />
        </FloatingLabel>

        <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

        {/* SUBMIT BUTTON  */}
        <Button className="app-button" type="submit" variant="light">{photoObj.firebaseKey ? 'Update' : 'Create'} Photo</Button>
      </Form>
    </div>
  );
}

PhotoForm.propTypes = {
  photoObj: PropTypes.shape({
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    favorite: PropTypes.bool,
    type: PropTypes.string,
    photographer_name: PropTypes.string,
    photographer_uid: PropTypes.string,
  }).isRequired,
};

PhotoForm.defaultProps = {
  photoObj: initialState,
};

export default PhotoForm;