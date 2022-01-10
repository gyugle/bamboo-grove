import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
function Posting({ userInfo }) {
  const [text, setText] = useState('');

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setText(value);
    console.log(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('submit');
    await addDoc(collection(db, 'postings'), {
      name: userInfo.email,
      text: text,
      createAt: Date.now(),
      createdId: userInfo.uid,
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
        ></input>
        <button>POST</button>
      </form>
    </div>
  );
}

export default Posting;
