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
        <li>구글 인증으로 가입하기</li>
        <li>작성자 정보 노출 선택기능</li>
        <li>사용자가 작성한 글 한 곳에 모아보기</li>
      </ul>
      <Navbar />
    </div>
  );
}

export default Feedback;
