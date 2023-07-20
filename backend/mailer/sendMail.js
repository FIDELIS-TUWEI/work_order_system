const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    secure: true,
    auth: {
        user: 'fideliofidel9@gmail.com',
        pass: '37369573Fi*'
    }
});

const info = await transporter.sendMail({
    from: 'fideliofidel9@gmail.com',
    to: '',
    subject: 'Task Added',
    text: ''
})