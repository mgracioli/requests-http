const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const corsOptions ={
    origin: '*',
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const multipartMiddleware = multipart({uploadDir: './uploads'}) //./uploads é onde vão ser guardados os arquivos que eu fizer upload lá no componente upload-file.component
app.post('/upload', multipartMiddleware, (req, res) => {    //upload é a url que será consumida
    const files = req.files; //armazena na variável files o resultado da requisição  que foi feita ao servidor (nesse caso, vai armazenar os arquivos que foram feitos upload)
    console.log(files);
    res.json({message: files}); //res é a resposta que será enviada para o servidor. Pode ser uma mensagem de sucesso, ou o propio conteudo que foi feito o upload, como foi feito aqui
});

//menasgem a ser enviada ao servidor caso dê algum erro
app.use((err, req, res, next) => {
    res.json({error: err.message});
})

app.listen(8000, () => {
    console.log("Servidor porta 8000");
})

