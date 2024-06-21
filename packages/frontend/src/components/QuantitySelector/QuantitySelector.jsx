import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './QuantitySelector.css';


export default function QuantitySelector({numStock, numSell, setNumSell}) {
    

    const handleClickPlus = () => {
        if (numSell < numStock) {
            setNumSell(numSell + 1);
        }
    };

    const handleClickMinus = () => {
        if (numSell > 0) {
            setNumSell(numSell - 1);
        }
    };

    return (
        <div className='quantity-box'>
            <button className='symbol-button' onClick={handleClickMinus}>
                <FaMinus />
            </button>
            <p className='quantity-num'>{numSell}</p>
            <button className='symbol-button' onClick={handleClickPlus}>
                <FaPlus />
            </button>
        </div>
    );
}
