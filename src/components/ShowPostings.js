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
    <div>
      <div>
        {postings.map((posting) => (
          <div key={posting.id}>
            <h6>{posting.name}</h6>
            <h4>{posting.text}</h4>
            <span>Create at {convertTime(posting.createdAt)}</span>
            {posting.updatedAt && (
              <div>Update at {convertTime(posting.updatedAt)}</div>
            )}
            {userInfo.uid === posting.createdBy && (
              <div>
                {!openModal && (
                  <button onClick={(event) => onClickOpenModal(posting, event)}>
                    Edit
                  </button>
                )}
                {openModal && select === posting.id && (
                  <UpdateModal
                    setOpenModal={setOpenModal}
                    setSelect={setSelect}
                    posting={posting}
                  />
                )}
                {!openModal && (
                  <button
                    onClick={(event) => {
                      onClickDelete(posting.id, event);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ShowPostings;
