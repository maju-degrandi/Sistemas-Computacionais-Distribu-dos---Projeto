import {React, useState, useEffect} from 'react';
import './LogPage.css';
import { useNavigate } from "react-router-dom";

export default function LogPage() {

    const [logList, setLogList] = useState([]);
      
    useEffect(() => {
        fetchLog();
    }, []);

    const fetchLog = async () => {
        fetch(`http://andromeda.lasdpc.icmc.usp.br:5027/api/sale-logs`)
        .then(response => response.json())
        .then(data => setLogList(data))
        .catch(error => console.error(error));
    };

    const navigate = useNavigate()

    const goToTablePage=()=>{
        navigate("/");
    }
      
    return (
        <div className='main-container'>
            <div className='header-log-page'>
                <button className='table-page-button' onClick={goToTablePage}>Tela de Consulta</button>
                <h3>Monitoramento de Venda de Medicamentos</h3>
            </div>

            <div className='table-container-log'>
                <table>
                    {logList.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td className='data-column-log'>{val.time_of_sale}{" | Produto: "}{val.product_sold}{" | Quantidade vendida: "}{val.quantity_sold}</td>
                                </tr>
                            )
                        })}
                </table>
            </div>
        </div>
    )
}
