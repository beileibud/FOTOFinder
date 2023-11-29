import React from 'react';
import AppointmentForm from '../../components/forms/AppointmentForm';

export default function AddAppointment() {
  return (
    <div className="new-app-form">
      <div className="new-app-form fixed-at-side--l">
        <img className="new-app-img" alt="" src="/dream2.png" />
      </div>
      <div className="app-form-right">
        <AppointmentForm />
      </div>
    </div>
  );
}
