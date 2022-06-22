const router = require('express')();
const axios = require('axios');
const fSendEmail = require('../../services/cc.emailSend.js');
const scheduleService = require('node-schedule');
var wLogFile = require('./src/logs/logs.json');
var wJsonFile = require('jsonfile');
var fs = require('fs');

const wAtualizaServerStatus = scheduleService.scheduleJob('*/5 * * * *', async (req, res) => {
    try {
        var wOptions = {
            url: 'https://chipeixao.com',
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios(wOptions).then(async (response) => {
            console.log(typeof response.data);
            if (wMLogs.length) {
                if (response.status != wMLogs[wMLogs.length - 1].status) {
                    // wMLogs.push({
                    //     status: response.status,
                    //     data: new Date().toUTCString(),
                    //     response: response.data
                    // });
                    fs.readFileSync(wLogFile, async function (err, obj) {
                        if (err) {
                            console.log(err);
                        } else {
                            wMLogs = JSON.parse(obj);
                            wMLogs.push({
                                status: response.status,
                                data: new Date().toUTCString(),
                                response: response.data
                            });
                            wJsonFile.writeFileSync(wLogFile, wMLogs);
                        }
                    });
                    let wAssunto = `Retorno do servidor: ${response.data, response.status}`;
                    await fSendEmail(`${wAssunto}`, response.status, new Date().toUTCString(), response.data);
                } else {
                    console.log('Não houve alteração');
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            cnRetorno: 1,
            anMensagem: 'Erro Interno Node.js',
            data: {},
            anQuerys: "",
            anErro: error.message
        });
    }
});
router.get('/', async (req, res) => {
    var wOptions = {
        url: 'https://chipeixao.com',
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await axios(wOptions).then(async (response) => {
        console.log(typeof response.data);
        if (wMLogs.length) {
            if (response.status != wMLogs[wMLogs.length - 1].status) {
                wMLogs.push({
                    status: response.status,
                    data: new Date().toUTCString(),
                    response: response.data
                });
                let wAssunto = `Retorno do servidor: ${response.data, response.status}`;
                await fSendEmail(`${wAssunto}`, response.status, new Date().toUTCString(), response.data);
            } else {
                console.log('Não houve alteração');
            }
        }
        // if (response.status == 200) {
        //     await fSendEmail('Servidor Voltou', response.status, response.headers.date, response.statusText);
        // } else {
        //     await fSendEmail('Servidor Caiu', response.status, response.headers.date, response.statusText);
        // }
    }).catch((error) => {
        
    });
});

module.exports = router;