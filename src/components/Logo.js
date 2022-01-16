import bambooIcon from '../icon/bamboo.png';
import styles from '../css/logo.module.css';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className={styles.main}>
      <img src={bambooIcon} alt="bamboo" />
      <Link to="/">
        <span>BAMBOO GROVE</span>
      </Link>
    </div>
  );
}
export default Logo;
