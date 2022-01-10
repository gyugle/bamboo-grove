import { useNavigate } from 'react-router-dom';

function Profile({ userInfo }) {
  console.log(userInfo);
  const navigate = useNavigate();

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={() => navigate(-1)}>BACK</button>
      <div>ser Image</div>
      <ul>
        <li>Nickname : {userInfo.displayName}</li>
        <li>Email : {userInfo.email}</li>
      </ul>
      <div>My postings list</div>
      <hr />
    </div>
  );
}

export default Profile;
