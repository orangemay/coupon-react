"use client";

import React, { useState } from 'react';
import style from './page.module.css';

import Coupon from './page/Coupon';
import Create from './page/Create/Create'
import Input from './components/Input/Input';
import Modal from './components/Modal/Modal';

export default function Home() {
  const [modal, setModal] = useState(false)
  const Toggle = () => setModal(prev => !prev)

  return (
    <div className={style.main}>
      <div className="header">
        <Create />
      </div>
      <Coupon />
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
