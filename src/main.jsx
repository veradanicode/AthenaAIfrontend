import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import './main.css'; // this should include your Tailwind setup
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
