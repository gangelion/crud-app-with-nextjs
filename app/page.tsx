"use client";
import styles from './page.module.css'
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('送信された値:', inputValue);
  };

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
      </div>
    </main>
  )
}
