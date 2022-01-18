import homeIcon from '../icon/home.png';
import mypostIcon from '../icon/mypost.png';
import profileIcon from '../icon/profile.png';
import logoutIcon from '../icon/logout.png';
import questionIcon from '../icon/question.png';
import styles from '../css/navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Navbar() {
  const navigate = useNavigate();
  const logOut = async () => {
    const ok = window.confirm('Are you sure?');
    if (ok) {
      await signOut(auth);
      navigate('/');
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.list}>
        <div>
          <Link to="/">
            <img src={homeIcon} className={styles.icon} alt="home" />
          </Link>
        </div>
        <div>
          <Link to="/mypostings">
            <img src={mypostIcon} className={styles.icon} alt="mypost" />
          </Link>
        </div>
        <div>
          <Link to="/profile">
            <img src={profileIcon} className={styles.icon} alt="profile" />
          </Link>
        </div>
        <div>
          <Link to="/QnA">
            <img src={questionIcon} className={styles.icon} alt="QnA" />
          </Link>
        </div>
        <div>
          <img
            src={logoutIcon}
            className={styles.icon}
            onClick={logOut}
            alt="logout"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
