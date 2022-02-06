# Bamboo Grove

https://gyugle.github.io/bamboo-grove


## 1. 개요

- 실시간으로 메세지를 전달할 수 있는 웹프로그램입니다.

- 본인의 프로필(사진, 닉네임)을 구성할 수 있습니다.

- 각자가 포스팅하고 싶은 메세지를 작성할 수 있는 공간입니다.

## 2. 사용방법

1. 로그인
현재는 이메일 형태의 아이디와 패스워드를 사용하여 로그인할 수 있습니다.
(실제 이메일 계정인지 인증하는 과정과 구글계정 로그인 등을 추가할 예정입니다.)

   <img src="https://user-images.githubusercontent.com/42715840/152682536-3004f27f-9373-40bf-8b1b-e0bdfb1bb1ad.png" height="640px" alt="auth"/>
<br/>

2. 개인 설정 화면
   사용자의 프로필 사진, 이메일, 닉네임을 확인할 수 있습니다. 원하는 사진이나 닉네임으로 변경할 수 있습니다. 또한, 계정정보를 삭제할 수 있는 버튼도 구성하였습니다.

   <img src="https://user-images.githubusercontent.com/42715840/152682533-87437b8b-8d42-4404-8367-ff21cc41456b.png" height="640px" alt="profile"/>

<br/>

3. 홈 화면
   포스팅을 할 수 있는 입력창과 이전에 올라왔던 포스트를 확인할 수 있습니다.

   <img src="https://user-images.githubusercontent.com/42715840/152682527-cc897fa4-7237-4385-b73f-b7e5250042f0.png" height="640px" alt="home"/>

<br/>

4. 개인 포스팅 화면
   현재 로그인 되어 있는 사용자가 올렸던 포스트만 필터링하여 보여지는 공간입니다.

   <img src="https://user-images.githubusercontent.com/42715840/152682530-c89daffd-f098-45aa-95d2-fa8f94756ebe.png" height="640px"  alt="mypostings"/>

<br/>

## 3. 프로젝트 기술 목록

- React (Client)

- React-router-dom (Router)

- Firebase (Server, Database and so on...)

<br/>

## 4. 웹프로그램 구조

### - 기본적인 웹페이지 구조

웹페이지 주소로 접속하면 Auth 화면이 보여지고, 사용자의 이메일과 패스워드를 입력하여 로그인 할 수 있습니다.
계정이 없는 경우, SignUp버튼을 클릭하여 SignUp페이지로 이동하여 계정을 만들 수 있습니다.
사용자 인증을 마친 후, 하단의 Navbar(Home,MyPostings,Profile,Feedback,LogOut) 어디서든 원하는 페이지로 이동이 가능하며 로그아웃도 할 수 있습니다.

<img src="https://user-images.githubusercontent.com/42715840/152682543-346447e7-1914-4617-b3c3-851e20a8d495.png"  alt="basic-structure"/>

### - 프로필 변경 처리 구조

`<textarea>`에서 Posting할 내용을 입력 받습니다.
Submit 이벤트가 실행되면 Firebase의 addDoc 메소드를 이용하여 사용자의 정보(이름, 프로필사진, 유저고유id), 포스팅될 글의 정보(내용, 작성일, 수정일)을 데이터베이스에 저장합니다.

<img src="https://user-images.githubusercontent.com/42715840/152682540-f14eb990-3cb5-4949-850f-f768d8cd8719.png" width="90%" alt="profile_logic"/>

### - 포스팅 처리 구조

해당페이지로 이동했을 때 useEffect hook을 이용하여 데이터베이스에서 모든 데이터를 불러옵니다. Firebase의 snapshot 메소드를 이용하며, 내림차순으로 State에 저장합니다. 이렇게 불러온 데이터를 정해진 폼으로 보여지게 됩니다.

<br/>

## 5. 처리하기 어려웠던 부분

사용자 정보를 여러 component에서 재사용시 지연으로 인한 오류

- React-redux 적용하여 코드를 좀 더 간결하게 작성하며, 해당 부분을 해결할 수 있을 것으로 보여집니다.

중복되는 함수를 재사용 하는 방법에 대한 어려움

- 중복되는 부분은 많지만 사용하는 곳에 따라 달라지는 파라미터의 수와 조금씩 변형하여 사용할 수 있어야 하는데 아직까지 상속에 대한 개념이 부족하여 공부하여 해결해 볼 생각입니다.

<br/>

## 6. 개선사항

- 이메일 인증 처리와 구글계정 로그인 기능 추가
- Redux로 State 최적화 및 코드 정리
- 포스팅 댓글 기능 추가하기
- 작성자 익명 기능 추가하기
