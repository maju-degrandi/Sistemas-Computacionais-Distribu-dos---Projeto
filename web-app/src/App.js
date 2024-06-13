import React, { useState } from 'react';
import Table from './components/Table/Table';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

function App() {
  const dataList = [
    { substance: "Cloridrato de Metilfenidato", product: "Ritalina", lab: "Eurofarma" },
    { substance: "Amoxilina", product: "Amoxilina", lab: "Medley" },
    { substance: "Cloridrato de Sertralina", product: "Zoloft", lab: "EMS" },
    { substance: "Acebrofilina", product: "Filinar G", lab: "Bayer" },
    { substance: "Acetato de Abiraterona", product: "Acetato de Abiraterona", lab: "Teva Farmacêutica" },
    { substance: "Albendazol", product: "Monozol", lab: "Sanofi" },
    { substance: "Brexpiprazol", product: "Rexulti", lab: "Lundbeck Brasil" },
    { substance: "Cabergolina", product: "Caberedux", lab: "EMS" },
    { substance: "Dipirona", product: "Maxalgina", lab: "EMS" },
    { substance: "Dipirona", product: "Dipirona Monoidratada", lab: "Geolab" },
    { substance: "Dipirona", product: "Diprin", lab: "Geolab" },
    { substance: "Docetaxel", product: "Dobeven", lab: "Sanofi" },
  ];

  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(dataList); 

  const handleSearch = () => {
    //filtrando a lista
    const filtered = dataList.filter(item =>
      item.substance.toLowerCase().includes(query.toLowerCase()) ||
      item.product.toLowerCase().includes(query.toLowerCase()) ||
      item.lab.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleInputChange = (value) => {
    setQuery(value);
    // Reseta a tabela se o input for limpo
    if (value === '') {
      setFilteredData(dataList); 
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 className='title'>Consulta de medicamentos</h2>
        <div class="search-field">
          <SearchBar query={query} onInputChange={handleInputChange} onButtonClick={handleSearch}/>
        </div>

        <Table data={filteredData}/>

      </header>
    </div>
  );
}

export default App;
