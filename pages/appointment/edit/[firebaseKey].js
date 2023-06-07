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
  return (<AppointmentForm appObj={editItem} />);
}
