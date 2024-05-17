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
                <p>Франкфурт, вы готовы? Впервые у вас пройдет масштабная русскоязычная тусовка, в одном из лучших ночных клубов вашего города.</p>
                <p>Поэтому с нетерпением ждём всех вас 24 Мая. Оторвемся под всеми знакомые хиты 90-00х, но и также не забудем о новинках.</p>
                <button onClick={handleBuyTickets}>Купить билет</button>
            </div>
        </div>
    );
}

export default Home;
