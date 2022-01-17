import loading from '../img/loading.gif';
import styles from '../css/loading.module.css';
function Loading() {
  return (
    <div className={styles.img_area}>
      <img src={loading} alt="loading" />
    </div>
  );
}
export default Loading;
