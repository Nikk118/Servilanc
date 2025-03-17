import React, { useState } from 'react';
import axios from 'axios';

const SendSms = () => {
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');

    const handleSendSms = async () => {
        try {
            const response = await axios.post('/api/sms/send-sms', { to, message });
            alert('SMS sent successfully: ' + response.data.messageId);
        } catch (error) {
            console.error('Error details:', error); // Log the entire error object
            const errorMessage = error.response ? error.response.data.error : 'An unexpected error occurred';
            alert('Error sending SMS: ' + errorMessage);
        }
    };

    return (
        <div>
            <h2>Send SMS</h2>
            <input type="text" placeholder="Phone Number" value={to} onChange={(e) => setTo(e.target.value)} />
            <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSendSms}>Send SMS</button>
        </div>
    );
};

export default SendSms;