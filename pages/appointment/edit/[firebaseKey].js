import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAppointment } from '../../../api/appointmentData';
import AppointmentForm from '../../../components/forms/AppointmentForm';

export default function EditAuthor() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleAppointment(firebaseKey).then(setEditItem);
  }, []);
  return (
    <div className="new-app-form">
      <div className="new-app-form fixed-at-side--l">
        <img className="new-app-img" alt="img" src="/dream2.png" />
      </div>
      <div className="app-form-right">
        <AppointmentForm appObj={editItem} />
      </div>
    </div>
  );
}
