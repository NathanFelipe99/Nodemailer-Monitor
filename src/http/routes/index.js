const router = require('express')();
const axios = require('axios');


router.get('/', async (req, res) => {
    var wOptions = {
        url: 'https://chipeixao.com',
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await axios(wOptions).then(response => {
        if (response.status != 200) {
            
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