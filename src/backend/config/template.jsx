"use client"
import React from "react"

const EmailTemplate = ({ userEmail, verificationCode }) => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#333' }}>
            <p>Hi {userEmail},</p>
            <p>Thank you for registering to Teem.ai.</p>
            <p>Here is your verification code:</p>
            <h1 style={{ fontSize: '32px', color: '#007bff' }}>{verificationCode}</h1>
            <p>Regards,</p>
            <p>Teem.ai Team</p>
        </div>
    );
};

module.exports = EmailTemplate;
