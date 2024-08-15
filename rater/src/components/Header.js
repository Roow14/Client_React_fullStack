// src/components/Header.js
import React, { useState } from 'react';
import axios from 'axios';
import './Header.css'; // Importe o arquivo de estilos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSliders, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'; // Substitua pelo caminho da sua imagem
import FilterMenu from './FilterMenu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const toggleFilter = () => setShowFilter(prev => !prev);

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=bc60c2dc515b93fd83dde3c5fe6f3822&query=${searchTerm}`
        );
        setResults(response.data.results);
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }
  };

  const closeResults = () => {
    setShowResults(false);
    setResults([]);
  };

  return (
    <div className="header-container">
      <img
        className="logo"
        src={logo}
        alt="Logo"
        onClick={handleLogoClick}
      />
      <div className="search-container">
        <div className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <div className="filter-icon" onClick={toggleFilter}>
          <FontAwesomeIcon icon={faSliders} />
        </div>
        {showFilter && <FilterMenu onClose={toggleFilter} />}
      </div>
      <button className="login-button" onClick={() => navigate('/login')}>Login</button>

      {showResults && (
        <div className="results-container">
          <button className="close-button" onClick={closeResults}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {results.slice(0, 5).map((movie) => (
            <div className="result-item" key={movie.id}>
              <img
                className="result-image"
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <div>
                <div className="result-title">{movie.title}</div>
                <div className="result-date">{new Date(movie.release_date).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
