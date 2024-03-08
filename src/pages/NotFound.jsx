// src/pages/NotFound.jsx

import React from 'react';
import notFoundImage from '../../public/not found.png'; // Replace with the actual path to your image

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={notFoundImage} alt="404 - Halaman tidak ditemukan" style={{ margin: 'auto', display: 'block' }} />
    </div>
  );
};

export default NotFound;
