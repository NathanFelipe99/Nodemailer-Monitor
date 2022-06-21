const app = require('express')();
const bodyParser = require('body-parser');
const router = require('./routes/index');
const debugApp = true;

app.use(bodyParser.json());

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

app.use(router);

const PORT = 3030;
app.listen(process.env.PORT || PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
});