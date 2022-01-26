import Logo from '../components/Logo';
import Navbar from '../components/Navbar';

function Feedback() {
  return (
    <div>
      <Logo />
      <h2>Introduction</h2>
      <p>
        실시간으로 게시글을 작성하는 페이지입니다. 사용자가 설정한 이름, 프로필
        사진, 작성글이 게시됩니다.
      </p>
      <h2>추가할 기능</h2>
      <ul>
        <li>구글 인증 추가하기</li>
        <li>Posting 댓글 기능 추가하기</li>
        <li>작성자 정보 노출 선택기능</li>
        <li>Redux로 최적화 및 코드 정리</li>
      </ul>
      <Navbar />
    </div>
  );
}

export default Feedback;
