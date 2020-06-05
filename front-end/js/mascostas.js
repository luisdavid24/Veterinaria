const listaMascotas=document.getElementById("lista-mascotas");
const tipo=document.getElementById("tipo");
const nombre=document.getElementById("nombre");
const indice=document.getElementById("indice");
const dueno=document.getElementById("dueno");
const form=document.getElementById("form");
const btnGuardar=document.getElementById("btnGuardar");
let mascotas= [
    {
        tipo: "Gato", 
        nombre: "manchas",
        dueno: "Esteban"
    },
    {
        tipo: "Perro", 
        nombre: "Lucas",
        dueno: "Jhon"
    },
    {
        tipo: "Perro", 
        nombre: "Javier",
        dueno: "Edgar"
    }
];
function listarMascotas(){
    solicitarMascotas();
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
}
function enviarDatos(evento){
    evento.preventDefault();
    const datos={
        tipo: tipo.value,
        nombre:nombre.value,
        dueno:dueno.value,
    };
    const accion=btnGuardar.innerHTML;
    switch(accion){
        case "Editar":
            mascotas[indice.value]=datos;
            break;
        default:
            mascotas.push(datos);
            break;
    }
   
    listarMascotas();
    resetModal();
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

function solicitarMascotas(){
    fetch('http://localhost:5000/mascotas',{mode:"cors"})
    .then((respuesta)=>{
        if(respuesta.ok) {
            return respuesta.join();
        }
    }).then(mascotasDelServer=>{
        console.log({mascotasDelServer});
    });
}

form.onsubmit=enviarDatos;
btnGuardar.onclick=enviarDatos;