const listaDuenos=document.getElementById("lista-duenos");
const pais=document.getElementById("pais");
const nombre=document.getElementById("nombre");
const indice=document.getElementById("indice");
const apellido=document.getElementById("apellido");
const identificacion=document.getElementById("identificacion");
const form=document.getElementById("form");
const btnGuardar=document.getElementById("btnGuardar");
let duenos= [
    {
        nombre: "manchas",
        apellido : "Esteban",
        pais:"Colombia",
        identificacion:"21233",
    },
    {
        nombre: "Lucas",
        apellido: "Lopera",
        pais:"Ecuador",
        identificacion:"21929",
    }
];
function listarDuenos(){
    const htmlDuenos=duenos.map((dueno,index)=>`
        <tr>
            <th scope="row">${index}</th>
            <td>${dueno.identificacion}</td>
            <td>${dueno.pais}</td>
            <td>${dueno.nombre}</td>
            <td>${dueno.apellido}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info editar"data-toggle="modal" data-target="#exampleModal" >Editar</button>
                    <button type="button" class="btn btn-danger eliminar">Eliminar</button>
                </div>
            </td>
  </tr>`).join("");
  listaDuenos.innerHTML=htmlDuenos;
  Array.from(document.getElementsByClassName("editar")).forEach((botonEditar,index)=>botonEditar.onclick=editar(index));
  Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar,index)=>botonEliminar.onclick=eliminar(index));
}
function enviarDatos(evento){
    evento.preventDefault();
    const datos={
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        identificacion:identificacion.value,
    };
    const accion=btnGuardar.innerHTML;
    switch(accion){
        case "Editar":
            duenos[indice.value]=datos;
            break;
        default:
            duenos.push(datos);
            break;
    }
   
    listarDuenos();
    resetModal();
}
function editar(index){
    return function cuandoCliqueo(){
        btnGuardar.innerHTML="Editar";
        $('#exampleModalCenter').modal("toggle");
        const dueno= duenos[index];
        nombre.value=dueno.nombre;
        apellido.value=dueno.apellido;
        pais.value=dueno.pais;
        identificacion.value=dueno.identificacion;
        indice.value=index;
    } 
}
function resetModal(){
    nombre.value='';
    apellido.value='';
    pais.value='';
    identificacion.value='';
    indice.value='';
    btnGuardar.innerHTML="Crear"
}

function eliminar(index){
    return function clickEnEliminar(){
        console.log(index);
        duenos=duenos.filter((dueno,indiceDueno)=>indiceDueno!==index);
        listarDuenos();
    }
}
listarDuenos();
form.onsubmit=enviarDatos;
btnGuardar.onclick=enviarDatos;