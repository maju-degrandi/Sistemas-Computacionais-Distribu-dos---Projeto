import React, { useState } from 'react';
import './SearchBar.css';
import { IoMdSearch } from "react-icons/io";


export default function SearchBar({query, onInputChange, onButtonClick}) {

    const handleChange = (event) => {
        //atualiza o estado atual da busca ou reseta a tabela se o campo input for limpo
        onInputChange(event.target.value); 
    };

    const handleClick = () => {
        //Filtra a lista quando o botao é pressionado
        onButtonClick();
    };

    return (
        <div class="search-and-button">
            
            <div class="search-bar">
                <IoMdSearch />
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleChange}
                    class="search-input"
                />

            </div>
            <button class="search-button" onClick={handleClick}> Buscar</button>
        </div>
    );
}
