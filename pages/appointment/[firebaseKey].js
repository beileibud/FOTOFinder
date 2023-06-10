/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleAppointment } from '../../api/appointmentData';

export default function ViewAppointment() {
  const router = useRouter();
  const [appDetails, setAppDetails] = useState({});

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleAppointment(firebaseKey).then(setAppDetails);
  }, [firebaseKey]);

  return (
    <div className="single-question">
      <h1>{appDetails.client_name}</h1>
      <h3>{appDetails.type}</h3>
      <h3>{appDetails.client_phone}</h3>
      <h3>{appDetails.client_address}</h3>
    </div>
  );
}
