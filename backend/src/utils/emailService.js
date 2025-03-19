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

export async function sendSignupEmail(toEmail, userName) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toEmail,
        subject: "Welcome to Our Service!",
        text: `Hello ${userName},\n\nThank you for signing up! We're glad to have you.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Signup email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
