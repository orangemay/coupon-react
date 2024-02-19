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
  data: Coupon[];
}

export default function Home() {
               
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [modal, setModal] = useState(false)
  const Toggle = () => {
    if (!modal) {
      setCoupon({
        brand: '',
        name: '',
        count: '',
        expireAt: '',
      });
      setFormErrors({});
    }
    setModal(prev => !prev);
  }

  const [coupon, setCoupon] = useState({
    brand: '',
    name: '',
    count: '',
    expireAt: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const validate = (values: any) => {
    const errors: Record<string, string> = {};
    if (!coupon.name) {
      errors.name = "Name is required!";
    }
    if (!coupon.brand) {
      errors.brand = "Brand is required!";
    }
    if (!coupon.count) {
      errors.count = "Count is required!"
    }
    if (!coupon.expireAt) {
      errors.expireAt = "Expired is required!"
    }
    console.log(errors, "errors")
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    getCoupons();
  }, [])

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
      const valid = validate(requestData);
      if (valid) {
        if (requestData.expireAt) {
          requestData.expireAt = (new Date(requestData.expireAt)).toISOString();
        }
        await axios.post("https://bgmlist.com/coupon-api/coupons", requestData);
        Toggle();
        getCoupons();
      }
    } catch(e) {
      console.log(e);
    }
  }

  async function getCoupons() {
    const { data } = await axios.get<CouponResponse>("https://bgmlist.com/coupon-api/coupons");
    setCoupons(data.data)
  }

  const [currentPage, setCurrentPage] = useState(1);
  const totalPosts = coupons.length
  const lastPage = Math.ceil(totalPosts / postsPerPage);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = coupons.slice(firstPostIndex, lastPostIndex);

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
          onSubmit={createCoupon}
        >
          <div className={style.modalContent}>
            <div>
              <label>Brand:</label>
              <Input type="string" placeholder='brand' value={coupon.brand} onChange={e => handleInputChange('brand', e.target.value)} />
              <p>{formErrors.brand}</p>
            </div>
            <div>
              <label>Name:</label>
              <Input type="string" placeholder='name' value={coupon.name} onChange={e => handleInputChange('name', e.target.value)} />
              <p>{formErrors.name}</p>
            </div>
            <div>
              <label>Count:</label>
              <Input type="string" placeholder='0' value={coupon.count} onChange={e => handleInputChange('count', e.target.value)} />
              <p>{formErrors.count}</p>
            </div>
            <div>
              <label>Expired:</label>
              <Input type="date" value={coupon.expireAt} onChange={e => handleInputChange('expireAt', e.target.value)} />
              <p>{formErrors.expireAt}</p>
            </div>
          </div>
        </Modal>
      </div>
      <div className={style.body}>
        <Coupon coupons={currentPosts} updateCoupons={getCoupons} />
      </div>
      <Pagination
        totalPosts={totalPosts}
        postPerPage={postsPerPage}
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

const postsPerPage = 10;
