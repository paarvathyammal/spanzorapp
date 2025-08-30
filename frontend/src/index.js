import { initGA } from './ga-boot';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize Google Analytics 4
initGA('G-VYMWSN2S5W');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
