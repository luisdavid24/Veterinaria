const http = require('http');
const url=require('url');
const StringDecoder= require('string_decoder').StringDecoder;
//Aqui estamos importando el enrutador creado

//importamos la request
const requestHandler=require('./request-handler');

const enrutador=require('./enrutador');

const server = http.createServer(requestHandler);
server.listen(6000,()=>{
    console.log("El servidor esta trabajando en el puesto 6000");
});