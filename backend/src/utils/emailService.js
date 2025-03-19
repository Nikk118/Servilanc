import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendEmail(toEmail, subject, message) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to: ${toEmail}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

