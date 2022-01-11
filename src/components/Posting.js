import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
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
      name: userInfo.email,
      text: text,
      createdAt: Date.now(),
      createdBy: userInfo.uid,
      updatedAt: null,
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
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
