"use client";

import React, { useState } from 'react';
import style from './page.module.css';

import Input from './components/Input';
import Modal from './components/Modal';

import styles from './page.module.css'

export default function Home() {
  const [modal, setModal] = useState(false)
  const Toggle = () => setModal(!modal)

  return (
    <div className={style.main}>
      <Input
        type="string"
        onChange={()=>console.log('success')}
      />
      <button className={style.button} onClick={Toggle}>
        Modal
      </button>
      <Modal
        title="My Modal"
        show={modal}
        close={Toggle}
      >
        <Input type="string" placeholder='11' onChange={()=>console.log('111')}/>
      </Modal>
    </div>
  )
}
