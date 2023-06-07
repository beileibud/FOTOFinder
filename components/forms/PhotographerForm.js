/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createUser, updateUser } from '../../api/userData';

const initialState = {
  firebaseKey: '',
  image: '',
  name: '',
  zipcode: '',
  phone: '',
  about: '',
  email: '',
  type: '',
  photographer_uid: '',
};

function PhotographerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateUser(formInput).then(() => router.push(`/photographers`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createUser(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateUser(patchPayload).then(() => {
          router.push(`/photographers`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Photographer</h2>

      {/* NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name" // Updated name attribute
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Image Url" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ZIP CODE INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Zip code" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter zip code"
          name="zipcode" // Updated name attribute
          value={formInput.zipcode}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ABOUT ME TEXTAREA */}
      <FloatingLabel controlId="floatingTextarea" label="About me" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="About me"
          style={{ height: '100px' }}
          name="about" // Updated name attribute
          value={formInput.about}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Photographer</Button>
    </Form>
  );
}

PhotographerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    zipcode: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    type: PropTypes.string,
    photographer_uid: PropTypes.string,
  }).isRequired,
};

PhotographerForm.defaultProps = {
  obj: initialState,
};

export default PhotographerForm;