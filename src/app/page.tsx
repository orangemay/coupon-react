"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './page.module.css';

import Coupon from './page/Coupon';
import Input from './components/Input/Input';
import Modal from './components/Modal/Modal';
import Pagination from './components/Pagination/Pagination';

type Coupon = {
  id: string;
  name: string;
  brand?: string;
  count: string;
  expireAt?: string
}

type CouponResponse = {
  data: Coupon[]
}

export default function Home() {
               
  const [coupons, setCoupons] = useState<Coupon[]>([])
  useEffect(() => {
    getCoupons();
  }, [setCoupons])

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const lastPage = 8;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = coupons.slice(firstPostIndex, lastPostIndex);

  const [modal, setModal] = useState(false)
  const Toggle = () => {
    if (!modal) {
      setCoupon({
        brand: '',
        name: '',
        count: '',
        expireAt: '',
      });
    }
    setModal(prev => !prev);
  }

  const [coupon, setCoupon] = useState({
    brand: '',
    name: '',
    count: '',
    expireAt: '',
  })
  function handleInputChange(name: string, value: string) {
    let newValue: string | number = value;
    if (name === 'count' && value) {
      newValue = parseInt(value, 10);
    };
    setCoupon({
      ...coupon,
      [name]: newValue,
    });
  }

  async function createCoupon() {
    try {
      const requestData = {...coupon};
      if (requestData.expireAt) {
        requestData.expireAt = (new Date(requestData.expireAt)).toISOString();
      }
      await axios.post("https://bgmlist.com/coupon-api/coupons", requestData);
      getCoupons();
    } catch(e) {
      console.log(e);
    } finally {
      Toggle();
    }
  }

  async function getCoupons() {
    const { data } = await axios.get<CouponResponse>("https://bgmlist.com/coupon-api/coupons");
    setCoupons(data.data)
  };

  return (
    <div className={style.main}>
      <div className={style.header}>
        <h1>All Coupons</h1>
        <button onClick={Toggle}>
          Create
        </button>
      </div>
      <div className='modal'>
        <Modal
          title="Create"
          show={modal}
          close={Toggle}
          onClick={createCoupon}
        >
          <div className={style.modalContent}>
            <p>
              <label>Brand:</label>
              <Input type="string" placeholder='brand' value={coupon.brand} onChange={e => handleInputChange('brand', e.target.value)} />
            </p>
            <p>
              <label>Name:</label>
              <Input type="string" placeholder='name' value={coupon.name} onChange={e => handleInputChange('name', e.target.value)} />
            </p>
            <p>
              <label>Count:</label>
              <Input type="string" placeholder='0' value={coupon.count} onChange={e => handleInputChange('count', e.target.value)} />
            </p>
            <p>
              <label>Expired:</label>
              <Input type="date" value={coupon.expireAt} onChange={e => handleInputChange('expireAt', e.target.value)} />
            </p>
          </div>
        </Modal>
      </div>
      <div className={style.body}>
        <Coupon coupons={currentPosts} updateCoupons={getCoupons}/>
      </div>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        maxLength={7}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
