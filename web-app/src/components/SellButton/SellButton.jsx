import React, {useRef} from 'react'
import './SellButton.css';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-green/theme.css';

export default function SellButton() {
  const toast = useRef(null);

  const newSell = () => {
    toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Venda Realizada' });
  };

  return (
    <div>
      <Toast ref={toast} />
      <button className='sell-button' onClick={newSell} >Vender</button>
    </div>
  )
}
