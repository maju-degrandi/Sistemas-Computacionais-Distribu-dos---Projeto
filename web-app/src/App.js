import React, { useState } from 'react';
import Table from './components/Table/Table';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

function App() {
  const dataList = [
    { substance: "Cloridrato de Metilfenidato", product: "Ritalina", lab: "Eurofarma", numStock: 11},
    { substance: "Amoxilina", product: "Amoxilina", lab: "Medley", numStock: 41 },
    { substance: "Cloridrato de Sertralina", product: "Zoloft", lab: "EMS", numStock: 17 },
    { substance: "Acebrofilina", product: "Filinar G", lab: "Bayer", numStock: 9 },
    { substance: "Acetato de Abiraterona", product: "Acetato de Abiraterona", lab: "Teva Farmacêutica", numStock: 0 },
    { substance: "Albendazol", product: "Monozol", lab: "Sanofi", numStock: 7 },
    { substance: "Brexpiprazol", product: "Rexulti", lab: "Lundbeck Brasil", numStock: 21000 },
    { substance: "Cabergolina", product: "Caberedux", lab: "EMS", numStock: 1 },
    { substance: "Dipirona", product: "Maxalgina", lab: "EMS", numStock: 35 },
    { substance: "Dipirona", product: "Dipirona Monoidratada", lab: "Geolab", numStock: 6 },
    { substance: "Dipirona", product: "Diprin", lab: "Geolab", numStock: 22 },
    { substance: "Docetaxel", product: "Dobeven", lab: "Sanofi", numStock: 18 },
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
