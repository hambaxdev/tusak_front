import React, { useEffect, useState } from 'react';

function Completion() {
  const [qrCodePath, setQrCodePath] = useState(null);
  const [pdfPath, setPdfPath] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const queryParams = new URLSearchParams(window.location.search);
  const paymentIntentId = queryParams.get('payment_intent');

  useEffect(() => {
    const checkTicketStatus = async () => {
      try {
        const response = await fetch('/api/ticket-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ paymentIntentId })
        });

        if (!response.ok) {
          console.log('Error');
          console.log(response.statusText);
          throw new Error(`Failed to check ticket status: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.isActive) {
          fetchTicketInfo();
        } else {
          setTimeout(checkTicketStatus, 2000); // Повторить через 3 секунды
        }
      } catch (error) {
        console.error('Error checking ticket status:', error);
        setTimeout(checkTicketStatus, 2000); // Повторить через 3 секунды
      }
    };

    const fetchTicketInfo = async () => {
      try {
        const response = await fetch('/api/ticket-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ paymentIntentId })
        });

        if (!response.ok) {
          console.log('Error');
          console.log(response.statusText);
          throw new Error(`Failed to fetch ticket info: ${response.statusText}`);
        }

        const data = await response.json();
        setQrCodePath(data.qrCodePath);
        setPdfPath(`${window.location.origin}/tickets/${data.pdfPath.split('/').pop()}`);
        setIsChecking(false);
      } catch (error) {
        console.error('Error fetching ticket info:', error);
        setIsChecking(false);
      }
    };

    if (paymentIntentId) {
      checkTicketStatus();
    }
  }, [paymentIntentId]);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      textAlign: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '50px'
    }}>
      <h1>Спасибо! Оплата прошла успешно!</h1>
      <p>Ваш билет был отправлен на указанный вами E-Mail</p>
      {isChecking && <p>Подождите, ваш билет создается...</p>}
      {qrCodePath && (
        <div>
          <h2>Ваш QR-код</h2>
          <img src={qrCodePath} alt="QR Code" style={{ maxWidth: '200px' }} />
        </div>
      )}
      {pdfPath && (
        <div>
          <a href={pdfPath} download="Ваш_билет.pdf" style={{ marginTop: '20px', display: 'block', textDecoration: 'none', backgroundColor: '#FF5722', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>Скачать билет (PDF)</a>
        </div>
      )}
      <p>Если у вас возникли проблемы, напишите нам: <a href="https://www.instagram.com/tusa_koeln" target="_blank" rel="noopener noreferrer">instagram @tusa_koeln</a></p>
    </div>
  );
}

export default Completion;
