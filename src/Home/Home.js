import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Добавим стили для компонента

function Home() {
    const navigate = useNavigate();

    const handleBuyTickets = () => {
        navigate('/payment'); // Перенаправляем на страницу регистрации для покупки билетов
    };

    return (
        <div className="home-container">
            <div className="content">
                <h1>Тусовка 24.05.24</h1>
                <p>Успей купить билеты</p>
                <button onClick={handleBuyTickets}>Купить билеты пока мамка не видит</button>
            </div>
        </div>
    );
}

export default Home;
