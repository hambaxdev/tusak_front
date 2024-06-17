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
                    <h1>VPIKSA</h1>
                    <h2>Offenbach am Main, уже 28 Июня!</h2>
                    <p>Двойная тематическая вечеринка в двухэтажном клубе.</p>
                    <p>На первом этаже вас ожидают лучшие хиты 2017, а на втором вы полностью окунетесь в атмосферу 90-00ых</p>
                    <button onClick={handleBuyTickets}>Купить билет</button>
                </div>
            </div>
        </div>
    );
}

export default Home;