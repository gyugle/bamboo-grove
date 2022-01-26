# **BAMBOO-GROVE**

## **1. 개요**

프로젝트 시작일 2022.1.10

React와 Firebase를 이용하여 각 사용자가 글을 Posting 할 수 있는 페이지를 만들었습니다. 기본적인 React를 이해하고 Firebase의 사용방법을 익히기 위해 제작하였습니다.

---

## **2. 주요기술**

### 사용언어

- HTML
- CSS
- JavaScript

### 주요 라이브러리 및 프레임워크

- React
- React-router-dom
- Firebase
- gh-pages

---

## **3. 페이지 및 기능 설명**

#### (1) 로그인 전

<img src='https://user-images.githubusercontent.com/42715840/151131744-18376245-3e04-4c75-ada0-ec912142a2d0.png' alt='home' width="50%"/>

로그인 페이지와 계정이 없는 경우, sign up 페이지로 이동할 수 있는 링크를 만들었습니다.

- sign up page

  <img src='https://user-images.githubusercontent.com/42715840/151131868-9777fb68-9ba0-4025-b8ec-8df242016c4d.png' alt='signup' width='50%'/>

#### (2) 로그인 후

<img src='https://user-images.githubusercontent.com/42715840/151131797-9cacead8-2eb4-4427-b77f-4e0bdfc5c8c4.png' alt='home2' width='50%'/>

포스팅된 모든 사용자들의 글을 확인할 수 있습니다.
글을 작성하여 제출하면 작성자의 이름, 내용, 생성날짜, 수정날짜, 유저id, 유저photo 값을 가지고 생성되어 포스팅 되는 동시에 Firebase database에 저장됩니다.

로그인된 유저와 작성자가 동일한 경우, 포스팅 된 글에 수정,삭제 버튼이 표시됩니다.

#### (3) 업데이트

<img src='https://user-images.githubusercontent.com/42715840/151131872-5536eb5c-a05b-46ad-8665-21a4626a60a9.png' alt='updateModal' />
모달창을 이용하여 글을 수정할 수 있으며, 업데이트된 내용과 수정된 시간을 함께 저장합니다.

삭제버튼의 경우 window.confirm 을 이용하여 재차 확인 후 글을 삭제합니다.

#### (4) MyPostings

<img src='https://user-images.githubusercontent.com/42715840/151131833-13dbecd7-31ee-4f9c-aa41-6d6a3fc82ddd.png' alt='mypostings' width='50%'/>

사용자가 작성한 포스팅만 필터하여 보여지며 수정 및 삭제가 가능합니다.

#### (5) Profile

<img src='https://user-images.githubusercontent.com/42715840/151131860-570f5efc-cc96-4f00-b4ba-604306b8e2c8.png' alt='profile' width='50%'/>
<img src='https://user-images.githubusercontent.com/42715840/151131620-83085977-5075-4348-b4ce-03860ee6575b.png' alt='changephoto' width='50%'/>

사용자의 프로필 사진과 닉네임을 수정할 수 있습니다.
기존에 있던 사진이나 닉네임이 변경되었을 때, 업데이트 버튼이 활성화 됩니다.

---

## **4. 개선해야 될 사항**

- 로그인 인증 방법 추가(구글, 깃허브 등)
- Posting 댓글 기능
- 작성자 정보 노출 선택기능
- Redux로 최적화 및 코드 정리
