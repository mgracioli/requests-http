//CLASSE QUE PERMITE O ANGULAR CONECTAR COM O BACK-END SEM DAR PROBLEMA DE CROSS ORIGIN (RESULTADO DE ESTAR TENTANDO ACESSAR DADOS DO DOMÍNIO LOCALHOST:4200PELO DOMÍNIO LOCALHOST:8000) 
//Um proxy é um servidor que age como um intermediário para requisições de clientes solicitando recursos de outros servidores. 
//ESSA É UMA CONFIGURAÇÃO PADRÃO - PODE SER USADA EM OUTRAS APLICAÇÕES

const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:8000/',
        secure: false,  //se fosse https seria true, como é só http, é false
        logLevel: 'debug',
        pathRewrite: { '^/api': ''} //lá no upload-file.component eu tenho a URL '/api/upload' usada p fazer o upload de arquivos, esse comando aqui vai apagar o /api e deixar só o /upload
    }
];

module.exports = PROXY_CONFIG;