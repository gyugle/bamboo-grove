import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
function ShowPostings() {
  const [postings, setPostings] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, 'postings'), (snapshot) => {
      setPostings(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      postings.sort((a, b) => b[3] - a[3]);
    });
  }, []);

  postings.map((posting) => console.log(posting.createAt));
  return (
    <div>
      <div>
        {postings.map((posting) => (
          <div key={posting.id}>
            {posting.text} {posting.createAt}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ShowPostings;
