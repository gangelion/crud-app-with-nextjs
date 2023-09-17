"use client";
import styles from '../app/page.module.css'
import { useState } from "react";
import { gql, useQuery } from '@apollo/client';

const GET_ARTICLES = gql`
  query {
    getArticles {
      id
      title
      content
    }
  }
`;

function MyComponent() {
  const { loading, error, data } = useQuery(GET_ARTICLES);
  const [inputValue, setInputValue] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('送信された値:', inputValue);
  };

  const itemList = data.getArticles.map((item: any, index: number) => (
    <li key={index}>{item.title}</li>
  ));
  return (
    <main className={styles.main}>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="入力してください"
          />
          <button type="submit">送信</button>
        </form>
        <ul>
          {itemList}
        </ul>
      </div>
    </main>
  )
}

export default MyComponent;
