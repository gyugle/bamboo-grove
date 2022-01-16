import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../firebase';
import styles from '../css/modal.module.css';
import cancelIcon from '../icon/cancel.png';

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
    <div className={styles.modal}>
      <div className={styles.body}>
        <img
          id={styles.cancel}
          src={cancelIcon}
          onClick={() => setOpenModal(false)}
          alt="cancel"
        />
        <h4 id={styles.title}>EDIT POSTING</h4>
        <div className={styles.form}>
          <form onSubmit={onSubmitUpdate}>
            <textarea onChange={onChange} value={newPost} />

            <div>
              <button>UPDATE</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
