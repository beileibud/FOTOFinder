import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createAppointments, updateAppointments } from '../../api/appointmentData';
import { getPhotographers } from '../../api/photographerData';

const initialState = {
  firebaseKey: '',
  date: '',
  client_name: '',
  client_address: '',
  client_phone: '',
  client_email: '',
  type: 'wedding',
  photographer_id: '',
};

function AppointmentForm({ appObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [selectedType, setSelectedType] = useState(null);
  const [photographers, setPhotographers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPhotographers(user.uid).then(setPhotographers);

    if (appObj.firebaseKey) {
      setFormInput(appObj);
      setSelectedType(appObj.type || '');

      const dateObject = new Date(appObj.date); // Convert the date string to a Date object
      const localDate = new Date(dateObject.getTime() - dateObject.getTimezoneOffset() * 60000); // Adjust the date to the local time zone
      setSelectedDate(localDate);
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
      updateAppointments(formInput).then(() => router.push('/appointments'));
    } else {
      const payload = {
        ...formInput,
        uid: user.uid,
        date: selectedDate, // Include the selected date in the payload
      };
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
    <div
      className="appointment-form"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        fontFamily: 'Mont-ExtraLightDEMO',
        fontSize: '18px',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <h2 className="mt-5">{appObj.firebaseKey ? 'Update' : 'Create'} Appointment</h2>
        <br />
        <h5>User: {user.displayName}</h5>

        <div className="row mb-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="col">
            <FloatingLabel
              controlId="floatingSelect"
              style={{
                borderBottom: '1px solid gray',
                fontFamily: 'Mont-ExtraLightDEMO',
                fontSize: '16px',
              }}
            >
              <Form.Select
                aria-label="Photographer"
                name="photographer_id"
                style={{
                  color: 'gray',
                  backgroundColor: 'transparent',
                  borderBottom: '1px solid gray',
                  border: 'none',
                  fontFamily: 'Mont-ExtraLightDEMO',
                  fontSize: '18px',
                }}
                onChange={handleChange}
                value={formInput.photographer_id}
                required
              >
                <option value="">Select a Photographer</option>
                {photographers.map((photographer) => (
                  <option key={photographer.firebaseKey} value={photographer.firebaseKey}>
                    {photographer.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </div>
          <div className="col mb-2" style={{ color: 'gray', fontFamily: 'Mont-ExtraLightDEMO', fontSize: '18px' }}>
            <FloatingLabel style={{ borderBottom: '1px solid gray' }} controlId="floatingType" label="">
              <Form.Select
                aria-label=""
                name="type"
                style={{
                  backgroundColor: 'transparent',
                  borderBottom: '1px solid gray',
                  border: 'none',
                  fontFamily: 'Mont-ExtraLightDEMO',
                  fontSize: '18px',
                }}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                required
              >
                <option value="">Select a Type</option>
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </div>
        </div>
        <div className="col date-pick" style={{ color: 'gray' }}>
          <FloatingLabel controlId="floatingInput6" label="">
            <DatePicker aria-label="date" selected={selectedDate} onChange={(date) => setSelectedDate(date)} style={{ fontSize: '10px' }} dateFormat="MM/dd/yyyy" placeholderText="Select a Date" name="date" required className="form-control" />
          </FloatingLabel>
        </div>
        {/* TITLE INPUT  */}

        <FloatingLabel controlId="floatingInput1" label="Please enter your name here" className="" style={{ backgroundColor: 'transparent', borderBottom: '1px solid gray' }}>
          <Form.Control type="text" placeholder="Enter your name" name="client_name" style={{ backgroundColor: 'transparent', border: 'none' }} value={formInput.client_name} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Please enter address" className="" style={{ backgroundColor: 'transparent', borderBottom: '1px solid gray' }}>
          <Form.Control type="text" placeholder="Address" name="client_address" style={{ backgroundColor: 'transparent', border: 'none' }} value={formInput.client_address} onChange={handleChange} required />
        </FloatingLabel>

        {/* BUSINESS_TITLE INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Please enter your phone number" className="" style={{ backgroundColor: 'transparent', borderBottom: '1px solid gray' }}>
          <Form.Control type="tel" placeholder="###-###-####" name="client_phone" style={{ backgroundColor: 'transparent', border: 'none' }} value={formInput.client_phone} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput4" label="Email" className="mb-1" style={{ backgroundColor: 'transparent', borderBottom: '1px solid gray' }}>
          <Form.Control type="text" placeholder="Email" name="client_email" style={{ backgroundColor: 'transparent', border: 'none' }} value={formInput.client_email} onChange={handleChange} required />
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button className="app-button" type="submit" variant="light" style={{ margin: '20px' }}>
          {appObj.firebaseKey ? 'Update' : 'Create'} Appointment
        </Button>
      </Form>
    </div>
  );
}

AppointmentForm.propTypes = {
  appObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    date: PropTypes.string,
    client_name: PropTypes.string,
    client_address: PropTypes.string,
    client_phone: PropTypes.string,
    client_email: PropTypes.string,
    type: PropTypes.oneOf(['wedding', 'lifestyle', 'graduation', 'business']),
    photographer_id: PropTypes.string,
  }),
};

AppointmentForm.defaultProps = {
  appObj: initialState,
};

export default AppointmentForm;
