import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BuyTicket = ({ price, onPayment }) => {
    price = 25;
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePayment = () => {
        if (!isValidEmail(email)) {
            setError('Пожалуйста, введите действительный адрес электронной почты.');
        } else {
            navigate('/payment');
            setError('');
            onPayment();
            
        }
    };

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div style={styles.card}>
            <div style={styles.container}>
                <h2 style={styles.desctiption}>1 проходка на вечеринку 24.05.2025</h2>
                <h3 style={styles.price}>Сумма: {price} Euro</h3>
                <input
                    type="email"
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={handleChangeEmail}
                    style={styles.input}
                />
                {error && <p style={styles.error}>{error}</p>}
                <button
                    style={styles.button}
                    onClick={handlePayment}
                >
                    К оплате
                </button>
            </div>
        </div>
    );
};

const styles = {
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    container: {
        width: 400,
        textAlign: 'center',
        backgroundColor: '#f6f9fc',
        padding: 20,
        borderRadius: 10,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    price: {
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '80%',
        height: 40,
        marginBottom: 20,
        border: '1px solid #ccc',
        borderRadius: 5,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#635bff',
        color: 'white',
        padding: '10px 20px',
        borderRadius: 5,
        border: 'none',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
};

export default BuyTicket;