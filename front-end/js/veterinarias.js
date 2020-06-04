const listaVeterinarias=document.getElementById("lista-veterinarias");
const pais=document.getElementById("pais");
const nombre=document.getElementById("nombre");
const indice=document.getElementById("indice");
const apellido=document.getElementById("apellido");
const identificacion=document.getElementById("identificacion");
const form=document.getElementById("form");
const btnGuardar=document.getElementById("btnGuardar");
let veterinarias= [
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
function listarVeterinarias(){
    const htmlVeterinarias=veterinarias.map((veterinaria,index)=>`
        <tr>
            <th scope="row">${index}</th>
            <td>${veterinaria.identificacion}</td>
            <td>${veterinaria.pais}</td>
            <td>${veterinaria.nombre}</td>
            <td>${veterinaria.apellido}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info editar"data-toggle="modal" data-target="#exampleModal" >Editar</button>
                    <button type="button" class="btn btn-danger eliminar">Eliminar</button>
                </div>
            </td>
  </tr>`).join("");
  listaVeterinarias.innerHTML=htmlVeterinarias;
  Array.from(document.getElementsByClassName("editar")).forEach((botonEditar,index)=>botonEditar.onclick=editar(index));
  Array.from(document.getElementsByClassName("eliminar")).forEach((botonEliminar,index)=>botonEliminar.onclick=eliminar(index));
}
function enviarDatos(evento){
    evento.preventDefault();
    const datos={
        nombre: nombre.value,
        apellido : apellido.value,
        pais:pais.value,
        identificacion:identificacion.value,
    };
    const accion=btnGuardar.innerHTML;
    switch(accion){
        case "Editar":
            veterinarias[indice.value]=datos;
            break;
        default:
            veterinarias.push(datos);
            break;
    }
   
    listarVeterinarias();
    resetModal();
}
function editar(index){
    return function cuandoCliqueo(){
        btnGuardar.innerHTML="Editar";
        $('#exampleModalCenter').modal("toggle");
        const veterinaria= veterinarias[index];
        indice.value=index;
        nombre.value=veterinaria.nombre;
        apellido.value=veterinaria.apellido;
        pais.value=veterinaria.pais;
        identificacion.value=veterinaria.identificacion;
        
    } 
}
function resetModal(){
    indice.value='';
    nombre.value='';
    apellido.value='';
    pais.value='';
    identificacion.value='';
    btnGuardar.innerHTML="Crear"
}
function eliminar(index){
    return function clickEnEliminar(){
        console.log(index);
        veterinarias=veterinarias.filter((veterinaria,indiceVeterinaria)=>indiceVeterinaria!==index);
        listarVeterinarias();
    }
}
listarVeterinarias();
form.onsubmit=enviarDatos;
btnGuardar.onclick=enviarDatos;