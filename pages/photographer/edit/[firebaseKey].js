import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../../api/userData';
import PhotographerForm from '../../../components/forms/PhotographerForm';

export default function EditPhotographer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleUser(firebaseKey).then(setEditItem);
  }, []);
  return (<PhotographerForm obj={editItem} />);
}
