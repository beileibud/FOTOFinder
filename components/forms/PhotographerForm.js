import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPhotographers, updatePhotographer } from '../../api/photographerData';

const typeOptions = ['wedding', 'lifestyle', 'graduation', 'business', 'all'];

const initialState = {
  image: '',
  name: '',
  zipcode: '',
  checkUser: false,
  phone: '',
  about: '',
  email: '',
  type: [],
  uid: '',
};

function PhotographerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [, setShowUser] = useState(obj?.checkUser || false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj && obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  useEffect(() => {
    setShowUser(formInput.checkUser);
  }, [formInput.checkUser]);

  const handleBooleanChange = (event) => {
    const { name, value } = event.target;
    // Convert the value to a boolean and update the form input state using the setFormInput function and the previous state
    const newValue = value === 'null' ? null : value === 'true';
    setFormInput((prevState) => ({ ...prevState, [name]: newValue }));
  };
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'type') {
      if (checked) {
        setFormInput((prevState) => ({
          ...prevState,
          [name]: [...prevState[name], value],
        }));
      } else {
        setFormInput((prevState) => ({
          ...prevState,
          [name]: prevState[name].filter((type) => type !== value),
        }));
      }
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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
    if (obj && obj.firebaseKey) {
      updatePhotographer(formInput).then(() => router.push('/photographers'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPhotographers(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePhotographer(patchPayload).then(() => {
          router.push('/photographers');
        });
      });
    }
  };

  return (
    <Form className="photographer-form" onSubmit={handleSubmit}>
      <h2 className="text mt-5">{obj && obj.firebaseKey ? 'Update' : 'Create'} Photographer</h2>

      {/* NAME INPUT */}
      <div>
        <Form.Check
          className="text-form-check mb-3"
          type="checkbox"
          id="checkUser"
          name="checkUser"
          label="Become a photographer?"
          checked={formInput.checkUser}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              checkUser: e.target.checked,
              handleBooleanChange,
            }));
          }}
          onClick={() => setShowUser(true)}
        />
      </div>
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control type="file" placeholder="Upload your image" name="image" accept="image/*" onChange={handleImageChange} required />
        {formInput.image && <img src={formInput.image} alt="Preview" style={{ width: '200px' }} />}
      </FloatingLabel>

      {/* ZIP CODE INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Zip code" className="mb-3">
        <Form.Control type="text" placeholder="Enter zip code" name="zipcode" value={formInput.zipcode} onChange={handleChange} required />
      </FloatingLabel>

      {/* ABOUT ME TEXTAREA */}
      <FloatingLabel controlId="floatingTextarea" label="About me" className="mb-3">
        <Form.Control as="textarea" placeholder="About me" style={{ height: '100px' }} name="about" value={formInput.about} onChange={handleChange} required />
      </FloatingLabel>

      {/* TYPE CHECKBOXES */}
      <FloatingLabel controlId="floatingInput4" label="" className="mb-3">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ marginBottom: '0.5rem' }}>Type</span>
          <div className="checkbox-list" style={{ display: 'flex', flexDirection: 'row' }}>
            {typeOptions.map((option) => (
              <Form.Check name="type" key={option} type="checkbox" id={option} label={option} value={option} checked={formInput.type.includes(option)} onChange={handleChange} />
            ))}
          </div>
        </div>
      </FloatingLabel>

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        style={{
          backgroundColor: ' rgb(103, 94, 82, 0.7)',
          fontFamily: 'Mont-ExtraLightDEMO',
          fontSize: '17px',
          border: 'none',
        }}
      >
        {obj && obj.firebaseKey ? 'Update' : 'Create'} Photographer
      </Button>
    </Form>
  );
}

PhotographerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    zipcode: PropTypes.string,
    checkUser: PropTypes.bool,
    phone: PropTypes.string,
    email: PropTypes.string,
    type: PropTypes.arrayOf(PropTypes.oneOf(['wedding', 'lifestyle', 'graduation', 'business'])),
    photographer_id: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default PhotographerForm;
