const app = require('express')();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const debugApp = true;
dotenv.config({ path: './.env.local' });
app.use(bodyParser.json());

require('../routes/index');

app.use((error, req, res, next) => {

    debugApp ? res.status(500).json({
        cnRetorno: 1,
        anMensagem: 'Erro Interno Node.js',
        data: {},
        anQuerys: "",
        anErro: error.message
    }) : res.status(500).json({
        cnRetorno: 1,
        anMensagem: "Erro Interno! Contate a equipe de suporte para mais informações!",
        anErro: null,
        data: null,
        anQuerys: "",
        obs: "Erro Node.js"
    });
});

const PORT = 3030;
app.listen(process.env.PORT || PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
});