import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import djImage from '../assets/dj.png'; // Импортируем изображение DJ

function Home() {
    const navigate = useNavigate();

    const handleBuyTickets = () => {
        navigate('/payment');
    };

    return (
        <div className="home-container">
            <div className="background"></div>
            <div className="overlay"></div>
            <div className="content-container">
                <div className="content">
                    <h1>TUSA KOELN DORTMUND 14.06</h1>
                    <h2>Успей купить билеты</h2>
                    <p>Дортмунд, впервые тематическая тусовка в вашем городе, поэтому с нетерпением ждём всех вас 14 Июня.</p>
                    <p>Оторвемся под всеми знакомые хиты 90-00х, но и также не забудем о новинках.</p>
                    <button onClick={handleBuyTickets}>Купить билет</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
