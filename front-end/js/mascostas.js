const listaMascotas=document.getElementById("lista-mascotas");
const tipo=document.getElementById("tipo");
const nombre=document.getElementById("nombre");
const indice=document.getElementById("indice");
const dueno=document.getElementById("dueno");
const form=document.getElementById("form");
const btnGuardar=document.getElementById("btnGuardar");
const url='http://localhost:5000/mascotas';
let mascotas= [];
async function listarMascotas(){
    try{
        const respuesta=await fetch(url,{mode:'cors'})
        const mascotasDelServer=await respuesta.json();
        if(Array.isArray(mascotasDelServer)&& mascotasDelServer.length>0){
            mascotas=mascotasDelServer;
        }
        const htmlMascotas=mascotas.map((mascota,index)=>`
        <tr>
            <th scope="row">${index}</th>
            <td>${mascota.tipo}</td>
            <td>${mascota.nombre}</td>
            <td>${mascota.dueno}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info editar"data-toggle="modal" data-target="#exampleModal" >Editar</button>
                    <button type="button" class="btn btn-danger eliminar">Eliminar</button>
                </div>
            </td>
  </tr>`).join("");
  listaMascotas.innerHTML=htmlMascotas;
  Array.from(document.getElementsByClassName("editar")).forEach((botonEditar,index)=>botonEditar.onclick=editar(index));
  Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar,index)=>botonEliminar.onclick=eliminar(index));
    }catch(error){
        throw error;
    }
}
async function enviarDatos(evento){
    evento.preventDefault();
    try{
        const datos={
            tipo: tipo.value,
            nombre:nombre.value,
            dueno:dueno.value,
        };
        let method='POST';
        let urlEnvio=url;
        const accion=btnGuardar.innerHTML;
        if(accion==="Editar"){
            method='PUT';
            mascotas[indice.value]=datos;
            urlEnvio=`${url}/indice.value`; 
        }
        const respuesta=await fetch(urlEnvio,{
            method,
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(datos),
        })
        if(respuesta.ok){
            listarMascotas();
            resetModal();
        }
    }catch(error){
        throw error;
    }
    
}
function editar(index){
    return function cuandoCliqueo(){
        btnGuardar.innerHTML="Editar";
        $('#exampleModalCenter').modal("toggle");
        const mascota= mascotas[index];
        nombre.value=mascota.nombre;
        dueno.value=mascota.dueno;
        tipo.value=mascota.tipo;
        indice.value=index;
    } 
}
function resetModal(){
    nombre.value='';
    dueno.value='';
    tipo.value='';
    indice.value='';
    btnGuardar.innerHTML="Crear";
}
function eliminar(index){
    return function clickEnEliminar(){
        console.log(index);
        mascotas=mascotas.filter((mascota,indiceMascota)=>indiceMascota!==index);
        listarMascotas();
    }
}
listarMascotas();

 

btnGuardar.onclick=enviarDatos;
form.onsubmit=enviarDatos;