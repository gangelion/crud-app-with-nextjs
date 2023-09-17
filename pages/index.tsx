"use client";
import styles from '../app/page.module.css'
import {useEffect, useState} from "react";
import { gql, useMutation, useQuery } from '@apollo/client';

interface User {
  id: number
  name: string
}
const GET_ARTICLES = gql`
  query {
    getUsers {
      id
      name
    }
  }
`
const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`
function MyComponent() {
  const { loading, error, data } = useQuery(GET_ARTICLES);
  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [users, setUsers] = useState<User[] | null>(null);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    if (data) {
      setUsers(data.getUsers.map(({id, name}: User) => ({id, name}))); // データの一部を選択してセット
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { data: d } = await createUser({
      variables: {
        name: inputValue,
      },
    });
    const _users = users === null ? [{id: d.createUser.id, name: d.createUser.name}] : [...users, {id: d.createUser.id, name: d.createUser.name}]
    setUsers(_users)
    setInputValue('')
  };

  const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    'border-radius': '4px',
    'font-size': '16px',
    width: '300px',
    height: '45px',
    'box-sizing': 'border-box'
  }
  const buttonStyle = {
    padding: '10px 20px',
    'font-size': '16px',
    border: 'none',
    'border-radius': '4px',
    cursor: 'pointer',
    'background-color': '#007bff',
    height: '45px',
    color: '#fff',
  }

  return (
    <main className={styles.main}>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="名前を入力してください"
            style={inputStyle}
          />
          <button style={buttonStyle} type="submit">送信</button>
        </form>
        <ul>
          {users?.map(({name, id}, index) => (
            <li key={index}>{name}</li>
        ))}
        </ul>
      </div>
    </main>
  )
}

export default MyComponent;
