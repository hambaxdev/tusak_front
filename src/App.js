import React from 'react';
import "./App.css";
import Payment from "./Payment";
import Completion from "./Completion";
import BuyTicket from './Tickets/BuyTicket'; // Импортируем новый компонент
import Home from './Home/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/completion" element={<Completion />} />
          <Route path="/buy-ticket" element={<BuyTicket />} /> 
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
