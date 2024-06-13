import React from 'react'
import './Table.css';


export default function Table({data}) {
  return (
    <div className="table-container">
        <table>
            <tr class="title-row">
                <td>Substância</td>
                <td>Produto</td>
                <td>Laboratório</td>
            </tr>
            {data.map((val, key) => {
                return (
                    <tr key={key}>
                        <td>{val.substance}</td>
                        <td>{val.product}</td>
                        <td>{val.lab}</td>
                    </tr>
                )
            })}
        </table>
    </div>
  )
}
