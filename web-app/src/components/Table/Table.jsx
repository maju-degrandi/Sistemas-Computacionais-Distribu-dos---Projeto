import React from 'react'
import './Table.css';
import SellButton from '../SellButton/SellButton';
import QuantitySelector from '../QuantitySelector/QuantitySelector';

export default function Table({data}) {
  return (
    <div className="table-container">
        <table>
            <tr class="title-row">
                <td>Substância</td>
                <td>Produto</td>
                <td>Laboratório</td>
                <td></td>
            </tr>
            {data.map((val, key) => {
                return (
                    <tr key={key}>
                        <td className='data-column'>{val.substance}</td>
                        <td className='data-column'>{val.product}</td>
                        <td className='data-column'>{val.lab}</td>
                        <td className='sell-column'><QuantitySelector num={val.numStock}/> <SellButton/></td>
                    </tr>
                )
            })}
        </table>
    </div>
  )
}
