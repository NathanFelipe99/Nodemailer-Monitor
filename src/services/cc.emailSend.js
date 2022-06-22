const nodemailer = require('nodemailer');

async function fSendEmail(pAssunto, pStatus, pHorario, pStatusText) {
    const wTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SEND_EMAIL_USER,
            pass: process.env.SEND_EMAIL_PASS 
        }
    });

    wTransporter.verify((error) => {
        if (error) {
            console.log('aqui',error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    const wInfo = wTransporter.sendMail({
        from: 'nathanfguerlando@gmail.com',
        to: process.env.SEND_EMAIL_USER,
        subject: `${pAssunto}`,
        html: `<p> Status: ${pStatus} </p>
               <p> Horário: ${pHorario} </p>
               <p> Status Text: ${pStatusText} </p>`
    }, (error, res) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + res);
        }
    });
    
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(wInfo));
}

module.exports = fSendEmail;