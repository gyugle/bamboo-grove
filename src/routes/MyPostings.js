import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import styles from '../css/showpostings.module.css';
import PostingForm from '../components/PostingForm';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';

function MyPostings({ userInfo }) {
  const [openModal, setOpenModal] = useState(false);
  const [select, setSelect] = useState('');

  const [postings, setPostings] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, 'postings'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setPostings(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
  }, []);

  return (
    <div className={styles.main}>
      <div>
        <Logo />
        <hr />
        <h3 className={styles.title}>MY POSTINGS</h3>
        {postings.map((posting) => {
          if (userInfo.uid !== posting.createdBy) {
            return null;
          }
          return (
            <PostingForm
              key={posting.id}
              posting={posting}
              openModal={openModal}
              setOpenModal={setOpenModal}
              select={select}
              setSelect={setSelect}
              userInfo={userInfo}
            />
          );
        })}
      </div>

      <Navbar />
    </div>
  );
}
export default MyPostings;
