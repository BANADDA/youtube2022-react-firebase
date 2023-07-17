import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Data = () => {
  const [gallery, setGallery] = useState([]);

  const fetchPost = async () => {
    const querySnapshot = await getDocs(collection(db, 'Gallery'));
    const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setGallery(newData);
    // console.log(gallery, newData);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return { gallery, fetchPost };
};

export default Data;