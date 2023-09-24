"use client";
import styles from '../app/page.module.css'
import {useEffect, useState} from "react";
import { gql, useMutation, useQuery } from '@apollo/client';
import ClickableElement from "@/app/ClickableElement";

interface User {
  id: number
  name: string
}
const GET_USERS = gql`
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

const EDIT_USERNAME = gql`
  mutation EditUser($id: Int!, $name: String!) {
    editUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`
function MyComponent() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [createUser] = useMutation(CREATE_USER);
  const [editUser] = useMutation(EDIT_USERNAME);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

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
    if (inputValue.trim() === '') {
      alert('名前は必須')
      return
    }

    const { data: d } = await createUser({
      variables: {
        name: inputValue,
      },
    });
    const _users = users === null ? [{id: d.createUser.id, name: d.createUser.name}] : [...users, {id: d.createUser.id, name: d.createUser.name}]
    setUsers(_users)
    setInputValue('')
  };

  const handleEditUser = async (id: number, e: any) => {
    if (e.target.value.trim() === '') {
      alert('名前は必須')
      return
    }
    const { data: d } = await editUser({
      variables: { id, name: e.target.value },
    });
    users?.forEach((user) => {
      if (user.id === d.editUser.id) user.name = e.target.value
    })
    setUsers(users)
  }

  const handleDeleteUser = async (id: number) => {
    const { data: d } = await deleteUser({
      variables: {
        id,
      },
    });
    const _users = users?.filter((user) => user.id !== d.deleteUser.id) ?? []
    setUsers(_users)
  }

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
        <div>
          {users?.map(({name, id}, index) => (
            <div style={{display: 'flex', height: '30px', width: '370px', alignItems: 'center', justifyContent: 'space-between'}}>
              <div onBlur={(e) => handleEditUser(id, e)}>
                <ClickableElement key={index} name={name} />
              </div>
              <button onClick={() => handleDeleteUser(id)}>削除</button>
            </div>
        ))}
        </div>
      </div>
    </main>
  )
}

export default MyComponent;
