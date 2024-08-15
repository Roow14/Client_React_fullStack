// src/components/Modal.js
import React from 'react';
import './modal.css'; // Adicione o CSS necessário para o modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default Modal;
