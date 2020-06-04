const recursos=require('./recursos');
const mascotas=require('./rutas/mascotas');
const veterinarias=require('./rutas/veterinarias');
const duenos=require('./rutas/duenos');
const consultas=require('./rutas/consultas');
module.exports={
    ruta:(data,callback)=>{
        callback(200,{mensaje:'esta es /ruta'});
    },
    mascotas:mascotas(recursos.mascotas),
    duenos:duenos(recursos.duenos),
    consultas:consultas(recursos.consultas),
    veterinarias:veterinarias(recursos.veterinarias),
    noEcontrado:(data,callback)=>{
      callback(404,{mensaje:'no encontrado'});
    }
};