import { asyncHandler } from "../utils/asyncHandler.js";
import twilio from "twilio";
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;   
const client = new twilio(accountSid, authToken);

export const sendSms = asyncHandler(async (req, res) => {
    const { to, message } = req.body;

    try {
        const smsResponse = await client.messages.create({
            body: message,
            to: to,  
            from: process.env.TWILIO_PHONE_NUMBER
        });

        return res.status(200).json({ success: true, messageId: smsResponse.sid });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    } finally {
        console.log(process.env.TWILIO_ACCOUNT_SID);
    }
});
