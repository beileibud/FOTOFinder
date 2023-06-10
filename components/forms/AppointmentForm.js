/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAppointments, updateAppointments } from '../../api/appointmentData';


const initialState = {
  client_name: '',
  firebaseKey: '',
  date: '',
  client_address: '',
  client_phone: '',
  client_email: '',
  type: 'wedding',
  photographer: '',
  photographer_uid: '',
  client_id: '',
};

function AppointmentForm({ appObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectedType, setSelectedType] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (appObj.firebaseKey) {
      setFormInput(appObj);
      setSelectedType(appObj.type || '');
    }
  }, [appObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appObj.firebaseKey) {
      updateAppointments (formInput).then(() => router.push(`/appointments`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAppointments(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAppointments(patchPayload).then(() => {
          router.push('/appointments');
        });
      });
    }
  };

  const typeOptions = ['wedding', 'lifestyle', 'graduation', 'business', 'all'];
  
  return (
    <div className="appointment-form">
      <Form onSubmit={handleSubmit}>
        <h2 className="mt-5">{appObj.firebaseKey ? 'Update' : 'Create'} Appointment</h2>

        <FloatingLabel controlId="floatingInput2" label="Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter your name" name="client_name" value={formInput.client_name} onChange={handleChange} required />
        </FloatingLabel>

        {/* TITLE INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Please enter address" className="mb-3">
          <Form.Control type="text" placeholder="address" name="client_address" value={formInput.client_address} onChange={handleChange} required />
        </FloatingLabel>

        {/* BUSINESS_TITLE INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Please enter your phone number" className="mb-3">
          <Form.Control type="phone" placeholder="phone number" name="client_phone" value={formInput.client_phone} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="email" className="mb-3">
          <Form.Control type="text" placeholder="email" name="client_email" value={formInput.client_email} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label=" photographer" className="mb-3">
          <Form.Control type="text" placeholder="photographer" name="photographer" value={formInput.photographer} onChange={handleChange} required />
        </FloatingLabel>

        <Form.Select
          aria-label="Type"
          name="type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          required
        >
          <option value="">Select a type</option>
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Select>

        {/* SUBMIT BUTTON  */}
        <Button className="app-button" type="submit" variant="light">{appObj.firebaseKey ? 'Update' : 'Create'} Appointment</Button>
      </Form>
    </div>
  );
}

AppointmentForm.propTypes = {
  appObj: PropTypes.shape({
    client_name: PropTypes.string,
    firebaseKey: PropTypes.string,
    date: PropTypes.string,
    client_address: PropTypes.string,
    client_phone: PropTypes.string,
    client_email: PropTypes.string,
    type: PropTypes.oneOf(['wedding', 'lifestyle', 'graduation', 'business']),
    photographer: PropTypes.string,
    photographer_uid: PropTypes.string,
    client_id: PropTypes.string,
  }).isRequired,
};

AppointmentForm.defaultProps = {
  appObj: initialState,
};

export default AppointmentForm;