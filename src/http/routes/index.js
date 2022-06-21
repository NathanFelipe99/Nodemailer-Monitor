const router = require('express')();
const axios = require('axios');
const fSendEmail = require('../../services/cc.emailSend.js');

router.get('/', async (req, res) => {
    var wOptions = {
        url: 'https://chipeixao.com',
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await axios(wOptions).then(async (response) => {
        if (response.status == 200) {
            await fSendEmail('Servidor Voltou', response.status, response.headers.date, response.statusText);
        } else {
            await fSendEmail('Servidor Caiu', response.status, response.headers.date, response.statusText);
        }
    }).catch((error) => {
        res.status(500).json({
            cnRetorno: 1,
            anMensagem: 'Erro Interno Node.js',
            data: {},
            anQuerys: "",
            anErro: error.message
        });
    });
});

module.exports = router;