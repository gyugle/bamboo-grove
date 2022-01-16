import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import styles from '../css/posting.module.css';
function Posting({ userInfo }) {
  const [text, setText] = useState('');

  const onChange = (event) => {
    const value = event.target.value;
    setText(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('submit');
    await addDoc(collection(db, 'postings'), {
      name: userInfo.displayName,
      text: text,
      createdAt: Date.now(),
      createdBy: userInfo.uid,
      updatedAt: null,
      photoURL: userInfo.photoURL,
    });
    setText('');
  };
  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <textarea
          className={styles.posting}
          name="text"
          value={text}
          onChange={onChange}
          type="text"
          placeholder="What do you want to say?"
          maxLength="150"
        />
        <button>POST</button>
      </form>
    </div>
  );
}

export default Posting;
