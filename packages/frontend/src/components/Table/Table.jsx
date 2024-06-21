import React from "react";
import "./Table.css";
import SellButton from "../SellButton/SellButton";
import QuantitySelector from "../QuantitySelector/QuantitySelector";

export default function Table({ data, onSuccessfulSell }) {
  return (
    <div className="table-container">
      <table>
        <tr class="title-row">
          <td>Nome</td>
          <td>Substância</td>
          <td>Laboratório</td>
          <td>Laboratório CNPJ</td>
          <td>Qtd. em Estoque</td>
          <td></td>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td className="data-column">{val.name}</td>
              <td className="data-column">{val.substance_name}</td>
              <td className="data-column">{val.laboratory_name}</td>
              <td className="data-column">{val.laboratory_cnpj}</td>
              <td className="data-column">{val.quantity_in_stock}</td>
              <td className="sell-column">
                <SellButton
                  id={val.id}
                  quantity_in_stock={val.quantity_in_stock}
                  initialNumSell={0}
                  onSuccessfulSell={onSuccessfulSell}
                />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
