"use client";

import React, { useState } from 'react';
import style from './page.module.css';

import Coupon from './page/Coupon';
import Input from './components/Input/Input';
import Modal from './components/Modal/Modal';

export default function Home() {
  const [modal, setModal] = useState(false)
  const Toggle = () => setModal(prev => !prev)

  const [brand, setBrand] = useState("")
  const [name, setName] = useState("")
  const [count, setCount] = useState("")
  const [expired, setExpired] = useState("")



  return (
    <div className={style.main}>
      <div className='header'>
        <p>All Coupons</p>
        <button className={style.button} onClick={Toggle}>
          Create
        </button>
        <Modal
          title="modal"
          show={modal}
          close={Toggle}
        >
          <label>
            Brand:
            <Input type="string" placeholder='brand' value={brand} onChange={(e) => setBrand(e.target.value)}/>
          </label>
          <label>
            Name:
            <Input type="string" placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
          </label>
          <label>
            Count:
            <Input type="string" placeholder='0' value={count} onChange={(e) => setCount(e.target.value)}/>
          </label>
          <label>
            Expired:
            <Input type="string" placeholder='11' value={expired} onChange={(e) => setExpired(e.target.value)}/>
          </label>
        </Modal>
      </div>
      <div className='body'>
        <Coupon />
      </div>
    </div>
  )
}
