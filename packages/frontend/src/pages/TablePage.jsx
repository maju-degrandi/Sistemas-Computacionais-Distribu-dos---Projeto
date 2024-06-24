import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Table from "../components/Table/Table";
import "./TablePage.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const TablePage = () => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

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

  const fetchProducts = async (query = "", page = 1) => {
    api
      .get("/products", { params: { name: query, page } })
      .then((response) => {
        setFilteredData(response.data.products);
        setMaxPage(response.data.pages);
        setCurrentPage(response.data.page);
      })
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
        <div class="pagination">
          <button
            onClick={() => fetchProducts(query, Math.max(currentPage - 1, 1))}
            className="page-button"
          >
            Anterior
          </button>
          <span className="page-text">
            Página {currentPage} de {maxPage}
          </span>
          <button
            onClick={() =>
              fetchProducts(query, Math.min(currentPage + 1, maxPage))
            }
            className="page-button"
          >
            Próxima
          </button>
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
