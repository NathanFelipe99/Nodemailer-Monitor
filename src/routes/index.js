// const router = require('express')();
const axios = require('axios');
const fSendEmail = require('../services/cc.emailSend.js');
const scheduleService = require('node-schedule');
var wJsonFile = require('jsonfile');
var fs = require('fs');
const logger = require('../services/log.js');
const wReadFile = './src/logs/logs.json';
// var wLogFile = require('../../logs/logs');


let wUltimoStatus = '';
let wScheduleTime = '5';
const wAtualizaServerStatus = scheduleService.scheduleJob(`*/${wScheduleTime} * * * *`, async (req, res) => {
    console.log('Schedule', wScheduleTime)
    try {
        var wOptions = {
            url: 'https://chipeixao.com',
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios(wOptions).then(async (response) => {
            var wAssunto = `Retorno do servidor: ${response.status}`;
            var wJsonData = {
                url: wOptions.url,
                status: response.status,
                statusText: response.statusText,
                data: new Date().toUTCString()
            }
            
            wUltimoStatus = response.status;
            if (response.status != wUltimoStatus) {
                wScheduleTime = response.status == 200 ? '5' : '30';
                await fSendEmail(wAssunto, response.status, new Date().toUTCString(), response.statusText);
                logger.info('[ATUALIZAÇÃO SERVIDOR STATUS]', wJsonData);
            } else {
                console.log('Não houve alteração');
            }
           
        });
    } catch (error) {
        logger.error('[ERRO NA APLICAÇÃO]', { cnRetorno: 1, anMensagem: 'Erro Interno Node.js', data: {}, anQuerys: "", anErro: error.message });
    }
});