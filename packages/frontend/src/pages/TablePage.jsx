import React, {useEffect, useState} from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Table from '../components/Table/Table';
import './TablePage.css';
import { useNavigate } from "react-router-dom";

const TablePage = () => {

      const [query, setQuery] = useState('');
      const [filteredData, setFilteredData] = useState([]);
      
      const navigate = useNavigate();

      useEffect(() => {
          fetchProducts();
      }, []);

      const handleSearch = () => {
        console.log('Search query:', query);
        fetchProducts(query);
      };
    
      const handleInputChange = (value) => {
        setQuery(value);
        if (value === '') {
            fetchProducts();
        }
      };
    
      const fetchProducts = async (query = '') => {
          fetch(`http://andromeda.lasdpc.icmc.usp.br:5027/api/products?substanceName=${encodeURIComponent(query)}`)
          .then(response => response.json())
          .then(data => setFilteredData(data))
          .catch(error => console.error(error));
      };

      const goToLogPage=()=>{
          navigate("/log");
      }
    
      return (
        <div className="App">
          <header className="App-header">
            <div className='header-log-page'>
                <button className='table-page-button' onClick={goToLogPage}>Tela de Log</button>
                <h3>Consulta de medicamentos</h3>
            </div>
            <div class="search-field">
              <SearchBar query={query} onInputChange={handleInputChange} onButtonClick={handleSearch}/>
            </div>
    
            <Table data={filteredData}/>
          </header>
        </div>
      );
};

export default TablePage;
