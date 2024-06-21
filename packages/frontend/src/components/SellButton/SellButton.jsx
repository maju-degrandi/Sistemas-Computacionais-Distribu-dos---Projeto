import React, {useRef, useState} from 'react'
import './SellButton.css';
import { Toast } from 'primereact/toast';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import 'primereact/resources/themes/saga-green/theme.css';

export default function SellButton({id, quantity_in_stock, initialNumSell}) {
  const toast = useRef(null);
  const [numSell, setNumSell] = useState(initialNumSell);

  const newSell = async () => {
    fetch(`http://andromeda.lasdpc.icmc.usp.br:5027/api/products/${encodeURIComponent(id)}/sell`, {method:"PATCH", body:JSON.stringify({quantity:numSell}), headers:{"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(data => toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Venda Realizada' }))
    .catch(error => console.error(error));
};

  return (
    <>
    <QuantitySelector numStock={quantity_in_stock} numSell={numSell} setNumSell={setNumSell}/> 
    <div>
      <Toast ref={toast} />
      <button className='sell-button' onClick={newSell} >Vender</button>
    </div>
    </>
  )
}
