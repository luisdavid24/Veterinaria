const url=require('url');
const StringDecoder= require('string_decoder').StringDecoder;
const enrutador=require('./enrutador');

module.exports=(req, res) => {
    //1 obtener url desde el objeto request
    const urlActual=req.url;
    const urlParseada=url.parse(urlActual, true);
    // console.log({urlActual,urlParseada});
    
    //2 obtener la ruta
    const ruta=urlParseada.pathname; 
    
    //3 quitar slash
    const rutaLimpia=ruta.replace(/^\/+|\/+$/g, '');
    //3.1 obtener el metodo http
    const metodo=req.method.toLowerCase();
    
    //3.1.1 dar permisos de CORS escribiendo los headers
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Request-Method", 
        "OPTIONS,GET,PUT,DELETE,POST"
        );
    res.setHeader("Access-Control-Allow-Headers","*");
    //3.1.2 dar respuesta inmediata cuando  el metodo sea options
    if(metodo==='options'){
        res.writeHeader(200);
        res.end();
        return;
    }
    //3.2 obtener variables de query url
    const {query={}}=urlParseada;
   
    //3.3 obtener headers
    const {headers={}}=req;
    //3.4 obtener payload, en el caso de haber uno
    const decoder=new StringDecoder('utf-8');
    let buffer=''; 
    //3.4.1 ir acomulando la data cuando el request reciba un payload   
    req.on('data',(data)=>{
        buffer +=decoder.write(data);
    });
    //3.4.2 terminar de acomular datos y decirle al decoder que finalice   
    req.on('end',()=>{
        buffer +=decoder.end();

        if(headers["content-type"]==='application/javascript'){
            buffer=JSON.parse(buffer)
        }
        //3.4.3 revisar si tiene subrutas en este caso es el indice del array
        // let indice=null;
        if(rutaLimpia.indexOf("/")>=-1){
            var [rutaPrincipal, indice]=rutaLimpia.split("/");
        }
        //3.5 ordenar la data del request
        const data={
            indice,
            ruta:rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        }
        
        console.log(data);
        //3.6 elegir el manejador dependiendo de la ruta y asignarle  la funcion que el enrutador tiene
        let handler;
        if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]){
            handler=enrutador[data.ruta][metodo];
        }else{
            handler=enrutador.noEcontrado;
        }

        //4 ejecutar handler (manejador) para envir la respuesta
        if(typeof handler==='function'){
            handler(data, (statusCode=200,mensaje)=>{
                const respuesta=JSON.stringify(mensaje);
                res.setHeader("Content-Type","application/json");
                res.writeHeader(statusCode);
                //linea donde realmente  ya estamos respodiendo a la aplicacion cliente
                res.end(respuesta);
            })
        }
       
    });
};