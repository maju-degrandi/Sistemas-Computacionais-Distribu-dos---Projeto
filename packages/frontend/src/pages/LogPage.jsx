import { React, useState, useEffect } from "react";
import "./LogPage.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function LogPage() {
  const [logList, setLogList] = useState([]);

  useEffect(() => {
    fetchLog();
  }, []);

  const fetchLog = async () => {
    api
      .get("/sale-logs")
      .then((response) => setLogList(response.data))
      .catch((error) => console.error(error));
  };

  const navigate = useNavigate();

  const goToTablePage = () => {
    navigate("/");
  };

  return (
    <div className="main-container">
      <style>
        {`
          .table-container tr {
            padding: 10px;
          }
          `}
      </style>

      <div className="header-log-page">
        <button className="table-page-button" onClick={goToTablePage}>
          Tela de Consulta
        </button>
        <h3>Monitoramento de Venda de Medicamentos</h3>
      </div>

      {logList.length === 0 ? (
        <h5>Nenhum log de venda encontrado</h5>
      ) : (
        <div className="table-container">
          <table>
            <tr class="title-row">
              <th>Data da venda</th>
              <th>ID do produto</th>
              <th>Nome do produto</th>
              <th>Quantidade vendida</th>
            </tr>
            {logList.map((val, key) => {
              return (
                <tr key={key} className="data-row-log">
                  <td>{new Date(val.time_of_sale).toISOString()}</td>
                  <td title={val.product_id}>{`${val.product_id.substring(
                    0,
                    5
                  )}...`}</td>
                  <td>{val.product_name}</td>
                  <td>{val.quantity_sold}</td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
}
