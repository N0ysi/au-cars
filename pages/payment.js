import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';

export default function NewCars() {
    const router = useRouter();
    const { carId, price, userId } = router.query;
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [CVV, setCVV] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        var actualDate = new Date().toLocaleDateString();
        actualDate = actualDate.split('.')[1] + '/' + actualDate.split('.')[2].slice(3);
        if (cardDate < Date.parse(actualDate)) {
            setError("Wrong Card Date");
            return;
        }

        try {
            const res = await fetch('/api/cars/buyCar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ carId, userId }),
            });

            const data = await res.json();
            console.log('data', data);

            if (res.ok) {
                try {
                    const res = await fetch('/api/cars/removeFromFavorites', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ carId, userId }),
                    });
                } catch (error) {
                };
                if (res.ok) {
                    var button = document.getElementById('payBtn');
                    button.textContent = 'bought';
                    button.style.background = 'green';
                    setTimeout(100);
                    router.push('/profile')
                }
            } else {
                setError(`Error:  ${data.message}`);
            }
        } catch (error) {
            setError(`Error:  ${error}`);
        }
    }

    return (
        <div>
            <Header />
            <div className="paymentDiv">
                <img src='/img/payment.png' alt="Payment" />
                <h1 className="title">Payment</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>Price: {price}</label>
                <form className="paymentForm" onSubmit={handleSubmit}>
                    <input
                        type="cardNumber"
                        value={cardNumber}
                        minLength={16}
                        maxLength={16}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number"
                        required
                    />
                    <input
                        type="text"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        placeholder="Holder Name"
                        required
                    />
                    <input
                        type="text"
                        value={cardDate}
                        onChange={(e) => setCardDate(e.target.value)}
                        placeholder="Card Date"
                        required
                    />
                    <input
                        type="password"
                        value={CVV}
                        minLength={3}
                        maxLength={3}
                        onChange={(e) => setCVV(e.target.value)}
                        placeholder="CVV"
                        required
                    />
                    <div className='buttons'>
                        <button id='payBtn' className="btn" type="submit">
                            Pay
                        </button>
                        <button className="btn" type="submit"
                            onClick={() => { router.push('/') }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
