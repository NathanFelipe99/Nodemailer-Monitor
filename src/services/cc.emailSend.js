const nodemailer = require('nodemailer');

async function fSendEmail(pRetorno, pHorario, pMotivo) {
    let wTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME || 'testeLogin' ,
            pass: process.env.EMAIL_PASSWORD || 'testeSenha'
        }
    });

    let wInfo = await wTransporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: 'felpsnathan@gmail.com',
        subject: 'Teste',
        text: 'Teste'
    });

    console.log('Message sent: %s', wInfo.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(wInfo));
}

module.exports = { fSendEmail };