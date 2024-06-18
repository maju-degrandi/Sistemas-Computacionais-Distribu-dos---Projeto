import React from 'react';
import './LogPage.css';
import { useNavigate } from "react-router-dom";

export default function LogPage() {
    const logList = [
        { logLine: "03/22 08:51:01 INFO   : Venda efetuada 15 Cloridrato de Metilfenidato | EMS" },
        { logLine: "03/23 09:20:15 INFO   : Venda efetuada 20 Ibuprofeno | Medley" },
        { logLine: "03/24 10:35:42 INFO   : Venda efetuada 5 Paracetamol | Neo Química" },
        { logLine: "03/25 11:10:05 INFO   : Venda efetuada 8 Omeprazol | Sandoz" },
        { logLine: "03/26 12:55:30 INFO   : Venda efetuada 12 Loratadina | Aché" },
        { logLine: "03/22 08:51:01 INFO   : Venda efetuada 13 Cloridrato de Metilfenidato | EMS" },
        { logLine: "03/23 09:22:05 INFO   : Venda efetuada 10 Cloridrato de Paracetamol | Medley" },
        { logLine: "03/24 10:33:10 INFO   : Venda efetuada 5  Ibuprofeno | Bayer" },
        { logLine: "03/25 11:44:15 INFO   : Venda efetuada 20 Dipirona | Novartis" },
        { logLine: "03/26 12:55:20 INFO   : Venda efetuada 27 Omeprazol | EMS" },
    ];

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
                                    <td className='data-column-log'>{val.logLine}</td>
                                </tr>
                            )
                        })}
                </table>
            </div>
        </div>
    )
}
