import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';

function UpdateModal({ setOpenModal, setSelect, posting }) {
  const [newPost, setNewPost] = useState(posting.text);
  const onChange = (event) => {
    setNewPost(event.target.value);
  };
  const onSubmitUpdate = async (event) => {
    event.preventDefault();
    const ok = window.confirm('Are you sure to update?');
    const postRef = doc(db, 'postings', posting.id);
    if (ok) {
      await updateDoc(postRef, { text: newPost, updatedAt: Date.now() });
      setOpenModal(false);
      setSelect('');
    }
  };
  return (
    <div>
      <h3>Modal Updating...</h3>
      <div>
        <form onSubmit={onSubmitUpdate}>
          <input onChange={onChange} value={newPost} />

          <button>UPDATE</button>
        </form>
        <button onClick={() => setOpenModal(false)}>CANCEL</button>
      </div>
    </div>
  );
}

export default UpdateModal;
