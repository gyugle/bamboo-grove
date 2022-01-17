import { deleteUser, onAuthStateChanged, updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import bucket, { auth } from '../firebase';
import styles from '../css/profile.module.css';
import bambooIcon from '../icon/bamboo.png';
import defaultImage from '../img/default.png';
import Logo from '../components/Logo';
function Profile({ userInfo }) {
  const [prevName, setPrevName] = useState('');
  const [prevImgUrl, setPrevImgUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');

  const [newImgUrl, setNewImgUrl] = useState('');

  const imgRef = ref(bucket, `${uid}`);

  const callUser = () => {
    onAuthStateChanged(auth, (user) => {
      setPrevName(user.displayName);
      setNewName(user.displayName);
      setEmail(user.email);
      setUid(user.uid);
      setPrevImgUrl(user.photoURL);
      console.log(user);
    });
  };

  const onChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'nickname') {
      setNewName(value);
    }
  };
  const onChangeImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    await uploadBytes(imgRef, file);
    const url = await getDownloadURL(imgRef);

    setNewImgUrl(url);
    // console.log(`onchangeimage ${url}`);
  };
  const onSubmitUpdate = async (event) => {
    event.preventDefault();
    const ok = window.confirm('Are you sure update your profile?');
    if (ok) {
      if (newImgUrl && newName) {
        await updateProfile(userInfo, {
          displayName: newName,
          photoURL: newImgUrl,
        });
      } else if (newImgUrl && !newName) {
        await updateProfile(userInfo, {
          displayName: prevName,
          photoURL: newImgUrl,
        });
      } else if (!newImgUrl && newName) {
        await updateProfile(userInfo, {
          displayName: newName,
          photoURL: prevImgUrl,
        });
      }
      navigate('/');
    }
    // console.log(`after update : ${imgUrl}`);
  };

  const onClickLeave = async () => {
    console.log('Leave...');
    const ok = window.confirm('Are you sure delete your account?');
    if (ok) {
      await deleteUser(userInfo);
      navigate('/');
    }
  };

  const onClickDeleteImg = async () => {
    console.log('Delete image');
    const targetImg = ref(bucket, `${uid}`);
    await deleteObject(targetImg);
    setPrevImgUrl(null);
    setNewImgUrl(defaultImage);
  };
  const navigate = useNavigate();

  useEffect(() => {
    callUser();
  }, []);

  return (
    <div>
      <Logo />
      <hr />
      <div className={styles.body}>
        <div className={styles.photo}>
          {!newImgUrl && !prevImgUrl && (
            <img src={defaultImage} alt="profile" />
          )}
          {!newImgUrl && prevImgUrl && <img src={prevImgUrl} alt="profile" />}
          {newImgUrl && <img src={newImgUrl} alt="profile" />}
        </div>
        {prevImgUrl && <button onClick={onClickDeleteImg}>DELETE IMAGE</button>}
        <form onSubmit={onSubmitUpdate}>
          <ul className={styles.userinfo}>
            <li>
              <input
                onChange={onChangeImage}
                type="file"
                accept="image/*"
                name="avatar"
              />
            </li>
            <li>Email : {email}</li>
            <li>
              Nickname :&nbsp;
              <input
                type="text"
                name="nickname"
                onChange={onChange}
                value={newName}
              />
            </li>
          </ul>
          {(newImgUrl || prevName !== newName) && (
            <button id={styles.updateBtn}>UPDATE</button>
          )}
        </form>
      </div>
      <hr />
      <button className={styles.delete} onClick={onClickLeave}>
        DELETE MY ACCOUNT
      </button>
      <Navbar />
    </div>
  );
}

export default Profile;
