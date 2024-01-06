"use client";

import React, { useState } from 'react';
import axios from 'axios';
import style from './page.module.css';

import Coupon from './page/Coupon';
import Input from './components/Input/Input';
import Modal from './components/Modal/Modal';

type Coupon = {
  id: string;
  name: string;
  brand?: string;
  count: string;
  expireAt?: string
}

export default function Home() {
  const [modal, setModal] = useState(false)
  const Toggle = () => setModal(prev => !prev)

  const [coupons, setCoupons] = useState({
    brand: '',
    name: '',
    count: '',
    expireAt: '',
  })
  const handleInputChange = (name: string, value: string | number) => {
    setCoupons({
      ...coupons,
      [name]: value,
    });
  }

  async function createCoupon(coupon: Coupon) {
    console.log(coupons)
    const data = await axios.post("https://bgmlist.com/coupon-api/coupons", coupons)
    return data
  }

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
          onClick={createCoupon}
        >
          <label>
            Brand:
            <Input type="string" placeholder='brand' value={coupons.brand} onChange={e => handleInputChange('brand', e.target.value)} />
          </label>
          <label>
            Name:
            <Input type="string" placeholder='name' value={coupons.name} onChange={e => handleInputChange('name', e.target.value)} />
          </label>
          <label>
            Count:
            <Input type="string" placeholder='0' value={coupons.count} onChange={e => handleInputChange('count', parseInt(e.target.value))} />
          </label>
          <label>
            Expired:
            <Input
              type="date"
              value={coupons.expireAt}
              onChange={e => handleInputChange('expireAt', (new Date(e.target.value).toISOString()))}
            />
          </label>
        </Modal>
      </div>
      <div className='body'>
        <Coupon />
      </div>
    </div>
  )
}
