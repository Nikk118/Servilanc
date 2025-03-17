import express from 'express';
import { sendSms } from '../controller/sms.controller.js';

const router = express.Router();


router.post('/send-sms', sendSms);

export default router;