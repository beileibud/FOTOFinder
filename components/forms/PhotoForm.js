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
  favorite: false,
  type: 'wedding',
  photographer_name: '',
  photographer_uid: '',
};

function PhotoForm({ photoObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectedType, setSelectedType] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (photoObj && photoObj.firebaseKey) {
      setFormInput(photoObj);
      setSelectedType(photoObj.type || '');
    }
  }, [photoObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      setFormInput((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photoObj && photoObj.firebaseKey) {
      updatePhotos(formInput).then(() => router.push('/photos'));
    } else {
      const payload = { ...formInput, uid: user.uid, type: selectedType };
      createPhotos(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePhotos(patchPayload).then(() => {
          router.push('/photos');
        });
      });
    }
  };

  const typeOptions = ['wedding', 'lifestyle', 'graduation', 'business', 'all'];

  return (
    <div className="photo-form">
      <Form onSubmit={handleSubmit}>
        <h2 className="mt-5">{photoObj && photoObj.firebaseKey ? 'Update' : 'Create'} Photo</h2>

        <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
          <Form.Control type="file" placeholder="Upload your image" name="image" accept="image/*" onChange={handleImageChange} required />
          {formInput.image && <img src={formInput.image} alt="" style={{ width: '200px' }} />}
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Photographer" className="mb-3">
          <Form.Control type="text" placeholder="Photographer" name="photographer_name" value={formInput.photographer_name} onChange={handleChange} required />
        </FloatingLabel>

        <Form.Select aria-label="Type" name="type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} required>
          <option value="">Select a type</option>
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>

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

        {/* SUBMIT BUTTON */}
        <Button className="app-button" type="submit" variant="light">
          {photoObj && photoObj.firebaseKey ? 'Update' : 'Create'} Photo
        </Button>
      </Form>
    </div>
  );
}

PhotoForm.propTypes = {
  photoObj: PropTypes.shape({
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    favorite: PropTypes.bool,
    type: PropTypes.oneOf(['wedding', 'lifestyle', 'graduation', 'business']),
    photographer_name: PropTypes.string,
    photographer_uid: PropTypes.string,
  }).isRequired,
};

PhotoForm.defaultProps = {};

export default PhotoForm;
