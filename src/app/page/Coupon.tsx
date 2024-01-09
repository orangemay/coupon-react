"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

import style from '../page.module.css'

type Coupon = {
  id: string;
  name: string;
  brand?: string;
  count: string;
  expireAt?: string
}

type CouponProps = {
  coupons: Coupon[];
  updateCoupons: () => void;
}

export default function Coupon({ coupons, updateCoupons }: CouponProps) {

  const handleDelete = async (couponId: string) => {
    try {
      await axios.delete(`https://bgmlist.com/coupon-api/coupons/${couponId}`)
      updateCoupons();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <table>
        <caption>Coupons</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Counts</th>
            <th>Expire Time</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.name}</td>
              <td>{coupon.brand || ''}</td>
              <td>{coupon.count}</td>
              <td>{coupon.expireAt ? (new Date(coupon.expireAt)).toLocaleString() : ''}</td>
              <td>
                <button
                  className={style.button}
                  onClick={() => handleDelete(coupon.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}