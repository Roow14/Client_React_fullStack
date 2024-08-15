import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Row from './components/Row';
import Banner from './components/Banner';
import categories from './api';
import Actors from './components/Actors';
import ActorDetail from './components/ActorDetail';
import MovieDetailPage from './pages/MovieDetailPage';
import LoginPage from './components/LoginPage';
import Modal from './components/modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div className="App">
        <Header />

        {/* Botão para abrir o modal */}
        <button className="login-button" onClick={openModal}>Login</button>

        {/* Modal com LoginPage */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <LoginPage />
        </Modal>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                {categories.map((category) => (
                  <Row
                    key={category.name}
                    title={category.title}
                    path={category.path}
                    isLarge={category.isLarge}
                  />
                ))}
                <Actors />
              </>
            }
          />
          <Route path="/actor/:id" element={<ActorDetail />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
