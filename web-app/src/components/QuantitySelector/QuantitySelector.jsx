import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import './QuantitySelector.css';

export default function QuantitySelector({num}) {
  return (
    <div className='quantity-box'>
        <button className='symbol-button'> <FaPlus /> </button>
        <p className='quantity-num'>{num}</p>
        <button className='symbol-button'> <FaMinus /> </button>
    </div>
  )
}
