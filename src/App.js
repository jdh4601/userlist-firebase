import { useState, useEffect, useId } from 'react';
import { db } from './firebase';
// db에 접근 도와주는 것들
import { collection, getDocs, addDoc } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newAge, setNewAge] = useState(0);

  // db에 들어있는 users라는 collection에 접근
  const usersCollectionRef = collection(db, 'users');
  const uniqueId = useId();

  // 1. Read user data from firebase
  useEffect(() => {
    const getUsers = async () => {
      // person이라는 Doc에 접근해서 컬렉션 내 데이터 가져오기
      const person = await getDocs(usersCollectionRef);
      // users state 배열 객체 안에 person 하나씩 id 데이터 추가
      setUsers(person.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  // 2. Create user data into firebase
  const createUsers = async () => {
    await addDoc(usersCollectionRef, {
      firstname: newFirstName,
      lastname: newLastName,
      age: newAge,
    });
  };

  // 표시할 데이터 key값에 map으로 고유한 ID 하나씩 넣어준다
  const showUsers = users.map(value => (
    <div key={uniqueId}>
      <p className="profile">
        🙋‍♂️ {value.firstname} {value.lastname} ({value.age})
      </p>
    </div>
  ));

  // db에 데이터 추가하고 input 텍스트 비워주기
  const onAddBtnHandler = () => {
    createUsers();
    setNewFirstName('');
    setNewLastName('');
    setNewAge('');
  };

  // 3. Updata user data from firebase

  // 4. Delete user data

  return (
    <div className="App">
      <form className="container" onSubmit={e => e.preventDefault()}>
        <div className="input-text">
          <label htmlFor="first-name">First Name: </label>
          <input
            value={newFirstName}
            type="text"
            placeholder="Enter your first name"
            onChange={e => setNewFirstName(e.target.value)}
          />
        </div>
        <div className="input-text">
          <label htmlFor="last-name">Last Name: </label>
          <input
            value={newLastName}
            type="text"
            placeholder="Enter your last name"
            onChange={e => setNewLastName(e.target.value)}
          />
        </div>
        <div className="input-text">
          <label htmlFor="age">Age: </label>
          <input
            value={newAge}
            type="number"
            onChange={e => setNewAge(e.target.value)}
          />
        </div>
        <button onClick={onAddBtnHandler}>Add +</button>
      </form>
      <p>{showUsers}</p>
    </div>
  );
}

export default App;
