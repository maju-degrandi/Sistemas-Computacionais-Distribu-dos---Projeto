import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Table from "../components/Table/Table";
import "./TablePage.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const TablePage = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    console.log("Search query:", query);
    fetchProducts(query);
  };

  const handleInputChange = (value) => {
    setQuery(value);
    if (value === "") {
      fetchProducts();
    }
  };

  const fetchProducts = async (query = "") => {
    api
      .get("/products", { params: { name: query } })
      .then((response) => setFilteredData(response.data))
      .catch((error) => console.error(error));
  };

  const goToLogPage = () => {
    navigate("/log");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-log-page">
          <button className="table-page-button" onClick={goToLogPage}>
            Tela de Log
          </button>
          <h3>Consulta de medicamentos</h3>
        </div>
        <div class="search-field">
          <SearchBar
            query={query}
            onInputChange={handleInputChange}
            onButtonClick={handleSearch}
          />
        </div>

        {filteredData.length === 0 ? (
          <h5>Nenhum medicamento encontrado</h5>
        ) : (
          <Table data={filteredData} onSuccessfulSell={fetchProducts} />
        )}
      </header>
    </div>
  );
};

export default TablePage;
