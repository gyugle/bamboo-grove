import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import bucket, { auth } from '../firebase';

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
    const ok = window.confirm('Are you sure to update?');
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
    }
    // console.log(`after update : ${imgUrl}`);
    navigate(-1);
  };

  const navigate = useNavigate();

  useEffect(() => {
    callUser();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={() => navigate(-1)}>BACK</button>
      <div>
        {!newImgUrl && prevImgUrl && (
          <img src={prevImgUrl} width="120px" height="90px" alt="profile" />
        )}
        {newImgUrl && (
          <img src={newImgUrl} width="120px" height="90px" alt="profile" />
        )}
      </div>
      <form onSubmit={onSubmitUpdate}>
        <ul>
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
        {(newImgUrl || prevName !== newName) && <button>UPDATE</button>}
      </form>
      <div>My postings list</div>

      <hr />
      <Navbar />
    </div>
  );
}

export default Profile;
