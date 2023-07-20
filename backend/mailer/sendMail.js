const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    host: '',
    port: '',
    secure: true,
    auth: {
        user: '',
        pass: ''
    }
});

const info = await transporter.sendMail({
    from: '',
    to: '',
    subject: '',
    text: ''
})