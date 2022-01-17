import { useState, useEffect } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import Posting from './Posting';
import UpdateModal from './UpdateModal';
import styles from '../css/showpostings.module.css';
import editIcon from '../icon/edit.png';
import deleteIcon from '../icon/delete.png';
import defaultImage from '../img/default.png';

function ShowPostings({ userInfo }) {
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

  const convertTime = (msTime) => {
    const timeStamp = msTime;
    const date = new Date(timeStamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')} ${String(
      date.getHours()
    ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const onClickDelete = async (id, event) => {
    const ok = window.confirm('Are you sure to delete?');
    if (ok) {
      await deleteDoc(doc(db, 'postings', id));
    }
  };

  const onClickOpenModal = (posting, event) => {
    setSelect(posting.id);

    setOpenModal(true);
  };

  return (
    <div className={styles.main}>
      <div>
        {postings.map((posting) => (
          <div className={styles.post} key={posting.id}>
            {console.log(posting.photoURL)}
            <div className={styles.user}>
              {posting.photoURL ? (
                <img src={posting.photoURL} alt="userImage" />
              ) : (
                <img src={defaultImage} alt="userImage" />
              )}
              <span className={styles.name}>{posting.name}</span>
            </div>
            <p className={styles.content}>{posting.text}</p>

            <div className={styles.postBtns}>
              {userInfo.uid === posting.createdBy && (
                <div>
                  {!openModal && (
                    <img
                      src={editIcon}
                      onClick={(event) => onClickOpenModal(posting, event)}
                      width="20px"
                      height="20px"
                      alt="edit"
                    />
                  )}
                  {openModal && select === posting.id && (
                    <UpdateModal
                      setOpenModal={setOpenModal}
                      setSelect={setSelect}
                      posting={posting}
                    />
                  )}
                  {!openModal && (
                    <img
                      onClick={(event) => {
                        onClickDelete(posting.id, event);
                      }}
                      src={deleteIcon}
                      width="20px"
                      height="20px"
                      alt="delete"
                    />
                  )}
                </div>
              )}
            </div>

            <div className={styles.time}>
              <span>Created at {convertTime(posting.createdAt)}</span>
              {posting.updatedAt && (
                <div>Updated at {convertTime(posting.updatedAt)}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ShowPostings;
