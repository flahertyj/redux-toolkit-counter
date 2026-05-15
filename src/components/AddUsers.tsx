import { useState } from 'react'

import styles from './AddUsers.module.css'
import { useAppDispatch, useAppSelector } from '../hooks'
import { AddUser, RemoveUser } from '../store/slices/exampleSlice'

const COLORS = [
  {
    label: 'Red', value: 'red',
  },
  {
    label: 'Orange', value: 'orange',
  },
  {
    label: 'Blue', value: 'blue',
  },
  {
    label: 'Purple', value: 'purple',
  },
];

export default function AddUsers() {
  const [localText, setLocalText] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [page, setPage] = useState('addUserPage');
  const example = useAppSelector(state => state.example);
  const dispatch = useAppDispatch();
  const onChangeColor = (e) => {
    setColor(e.target.value);
  };
  // On submit, pass new user info over to redux.
  const submittedForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    dispatch(AddUser(data));
  };
  const togglePages = () => {
    if (page === 'listUsersPage') {
      setPage('addUserPage');
    } else {
      setPage('listUsersPage');
    }
  };
  const removeUser = (userName: string) => {
    dispatch(RemoveUser(userName));
  };
  

  return (
    <>
    {/* TODO: break these into their own components. */}
    {page === 'listUsersPage' &&
      <div className={styles.listUsersContent}>
        {example.map(user => {
          return (
            <div className={styles.userBox} style={{ borderColor: user.color }}>
              <div>{user.name}</div>
              <button onClick={() => removeUser(user.name)}>Delete</button>
            </div>
          );
        })
      }
      <button type="button" onClick={togglePages}>Add Users</button>
      </div>
    }
    {page !== 'listUsersPage' &&
      <form onSubmit={submittedForm}>
        <div className={styles.addUserContent}>
          <input
            name="name"
            type="text"
            className={styles.inputBox}
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            placeholder='Enter user Name'
          />
          <select value={color} name="color" onChange={onChangeColor}>
            {COLORS.map(color => {
              return <option key={color.value} value={color.value}>{color.label}</option>
            })}
          </select>
          <button type="submit">Submit</button>
          <button type="button" onClick={togglePages}>View UserList</button>
        </div>
      </form>
}
    </>
  )
}
