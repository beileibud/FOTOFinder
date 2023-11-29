import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PhotographerForm from '../../../components/forms/PhotographerForm';
import { getSinglePhotographer } from '../../../api/photographerData';

export default function EditPhotographer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePhotographer(firebaseKey).then(setEditItem);
  }, []);
  return (<PhotographerForm obj={editItem} />);
}
