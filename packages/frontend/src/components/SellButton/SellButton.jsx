import React, { useRef, useState } from "react";
import "./SellButton.css";
import { Toast } from "primereact/toast";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import api from "../../services/api";
import "primereact/resources/themes/saga-green/theme.css";

export default function SellButton({
  id,
  quantity_in_stock,
  initialNumSell,
  onSuccessfulSell,
}) {
  const toast = useRef(null);
  const [numSell, setNumSell] = useState(initialNumSell);

  const newSell = async () => {
    api
      .patch(`/products/${id}/sell`, { quantity: numSell })
      .then((response) => {
        toast.current?.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Venda Realizada",
        });
        onSuccessfulSell();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <QuantitySelector
        numStock={quantity_in_stock}
        numSell={numSell}
        setNumSell={setNumSell}
      />
      <div>
        <Toast ref={toast} />
        <button className="sell-button" onClick={newSell}>
          Vender
        </button>
      </div>
    </>
  );
}
