import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import "./index.css"; // Импортируйте ваш CSS файл

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Введите корректный адрес электронной почты.');
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
        receipt_email: email,
      },
    });

    if (error) {
      setMessage(error.type === "card_error" || error.type === "validation_error" ? error.message : "Произошла неожиданная ошибка.");
      setIsProcessing(false);
    } else {
      setMessage(paymentIntent.status === 'succeeded' ? 'Платёж успешно выполнен.' : 'Платёж не выполнен.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      <div className="info-form">
        <h2>Информация о покупке</h2>
        <div className="event-details small-bold-text">
          <p>Frankfurt am Main</p>
          <p>SCALA CLUB</p>
          <p>Дата: 24 июня 2024</p>
          <p>Цена билета: 25 Euro.</p>
        </div>
        <p>Пожалуйста, введите ваш адрес электронной почты:</p>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Введите ваш email" />
      </div>
      <div className="card">
        <div className="payment-container">
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit">
              <span id="button-text">
                {isProcessing ? "Обработка ..." : "Оплатить сейчас"}
              </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
