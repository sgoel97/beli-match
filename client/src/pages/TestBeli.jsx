import { useState } from 'react';
import Layout from '../components/Layout';
import Heading from '../components/Heading';

import { getFirestore, collection, addDoc } from "firebase/firestore";
import app from '../../firebase-config'; // Path to your Firebase config

// Get a reference to the Firestore service
const db = getFirestore(app);

const TestBeli = () => {
  const [data, setData] = useState('');

  const handleInputChange = (e) => {
    setData(e.target.value);
  };

  const addDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, "beli"), {
        // your document fields
        data: data,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  

  const handleSubmit = () => {
    db.collection('beli').add({ data })
      .then(() => {
        console.log('Data added to Firestore successfully!');
      })
      .catch((error) => {
        console.error('Error adding data to Firestore: ', error);
      });
  };

  return (
        <Layout>
            <Heading title="Test Beli" subtitle="test" />
            <input type="text" value={data} onChange={handleInputChange} />
            <button onClick={addDocument}>Submit</button>
        </Layout>
        );
};

export default TestBeli;
