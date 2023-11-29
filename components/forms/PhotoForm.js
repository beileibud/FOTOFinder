import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../utils/context/authContext';
import { createPhotos, updatePhotos } from '../../api/photoData';

const initialState = {
  image: [],
  favorite: false,
  type: 'wedding',
  photographer_id: '',
};

function PhotoForm({ photoObj, photographerId }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectedType, setSelectedType] = useState('');
  const [uploadMethod, setUploadMethod] = useState('local');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (photoObj.firebaseKey) {
      setFormInput((prevState) => ({
        ...prevState,
        ...photoObj,
      }));
      setSelectedType(photoObj.type || '');
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        photographerId,
      }));
    }
  }, [photoObj, photographerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUploadMethodChange = (e) => {
    setUploadMethod(e.target.value);
    setFormInput((prevState) => ({
      ...prevState,
      image: [],
    }));
  };

  const handleImageChange = (e) => {
    if (uploadMethod === 'local') {
      const imageFiles = e.target.files;
      const imagePromises = [];

      for (let i = 0; i < imageFiles.length; i++) {
        const imageFile = imageFiles[i];
        const reader = new FileReader();

        const promise = new Promise((resolve, reject) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
        });

        reader.readAsDataURL(imageFile);
        imagePromises.push(promise);
      }

      Promise.all(imagePromises).then((results) => {
        setFormInput((prevState) => ({
          ...prevState,
          image: results,
        }));
      });
    } else {
      const { value } = e.target;
      setFormInput((prevState) => ({
        ...prevState,
        image: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photoObj.firebaseKey) {
      updatePhotos(formInput).then(() => router.push(`/photos/${photoObj.firebaseKey}`));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        photographerId,
        type: selectedType,
      };
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
        <h2 className="mt-5">{photoObj.firebaseKey ? 'Update' : 'Create'} Photo</h2>

        {/* Upload Method Dropdown */}
        <Form.Select aria-label="Upload Method" value={uploadMethod} onChange={handleUploadMethodChange} required>
          <option value="local">Upload Local File</option>
          <option value="url">Use URL</option>
        </Form.Select>

        {/* Local File Upload */}
        {uploadMethod === 'local' && (
          <FloatingLabel controlId="floatingInput2" className="mb-3">
            <Form.Control type="file" placeholder="Upload your images" name="image" accept="image/*" onChange={handleImageChange} multiple required />
            {formInput.image && formInput.image.map((imageDataUrl) => <img key={uuidv4()} src={imageDataUrl} alt="" style={{ width: '200px', marginRight: '10px' }} />)}{' '}
          </FloatingLabel>
        )}

        {/* URL Input */}
        {uploadMethod === 'url' && (
          <FloatingLabel controlId="floatingInput4" className="mb-3">
            <Form.Control type="url" placeholder="Enter image URL" name="image" value={formInput.image} onChange={handleChange} required />
            {formInput.image && <img src={formInput.image} alt="" style={{ width: '200px' }} />}
          </FloatingLabel>
        )}

        {/* Type Selection */}
        <Form.Select aria-label="Type" name="type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} required>
          <option value="">Select a type</option>
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>

        {/* Favorite Checkbox */}
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

        {/* Submit Button */}
        <Button className="app-button" type="submit" variant="light">
          {photoObj.firebaseKey ? 'Update' : 'Create'} Photo
        </Button>
      </Form>
    </div>
  );
}

PhotoForm.propTypes = {
  photoObj: PropTypes.shape({
    image: PropTypes.arrayOf(PropTypes.string),
    firebaseKey: PropTypes.string,
    favorite: PropTypes.bool,
    type: PropTypes.oneOf(['wedding', 'lifestyle', 'graduation', 'business']),
    photographerId: PropTypes.string,
  }),
  photographerId: PropTypes.string.isRequired,
};

PhotoForm.defaultProps = {
  photoObj: {}, // Default empty object for photoObj
};

export default PhotoForm;
