import nodemailer from 'nodemailer';

export async function sendEmail(email,subject ,message, attachments=[]) {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDER_EMAIL,
                pass:  process.env.nodeMailerPassword,
            },
        });
        let info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject,
            html: message,
            attachments
        });
        return info
    }
