import { deleteDoc, doc } from 'firebase/firestore';
import UpdateModal from '../components/UpdateModal';
import editIcon from '../icon/edit.png';
import deleteIcon from '../icon/delete.png';
import defaultImage from '../img/default.png';
import styles from '../css/postingform.module.css';
import { db } from '../firebase';
function PostingForm({
  posting,
  openModal,
  setOpenModal,
  select,
  setSelect,
  userInfo,
}) {
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
    <div className={styles.post} key={posting.id}>
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
  );
}
export default PostingForm;
