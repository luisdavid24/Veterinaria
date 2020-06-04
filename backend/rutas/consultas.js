module.exports=function consultasHandler(consultas){
    return {
        get:(data,callback)=>{
            if(typeof data.indice !=='undefined') {
                if(consultas[data.indice]){
                    return  callback(200,consultas[data.indice]);
                }
                return  callback(404,{mensaje: `consultas con el indice ${data.indice} no encontrada ` });
            }
            callback(200,consultas);
        },
        
        post:(data,callback)=>{
            let nuevaConsulta=data.payload;
            nuevaConsulta.fechaCreacion=new Date();
            nuevaConsulta.fechaEdicion=null;
            consultas=[...consultas,nuevaConsulta]
            callback(201,nuevaConsulta);
        },
        put:(data,callback)=>{
            if(typeof data.indice !=='undefined') {
                if(consultas[data.indice]){
                    const { fechaCreacion }=consultas[data.indice];
                    consultas[data.indice]={
                        ...data.payload,
                        fechaCreacion,
                        fechaEdicion:new Date(),
                    };
                    return  callback(200,consultas[data.indice]);
                }
                return  callback(404,{mensaje: `consultas con el indice ${data.indice} no encontrada ` });
            }
            callback(400,{mensaje:'indice no enviado'});
        },
        delete: (data,callback)=>{
            if(typeof data.indice !=='undefined') {
                if(consultas[data.indice]){
                    consultas=consultas.filter(
                        (_consulta,indice)=>indice !=data.indice
                    );
                    return  callback(204,{mensaje:`elemento con indice ${data.indice} eliminado`});
                }
                return  callback(404,{mensaje: `consulta con el indice ${data.indice} no encontrada ` });
            }
            callback(400,{mensaje:'indice no enviado'});
        },
        
    };
}
