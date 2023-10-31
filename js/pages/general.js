const tipoEleccion = 2;

const tipoRecuento = 1;

document.getElementById("boton-informe").addEventListener("click", function agregarInforme() {
    
    var vAnio = "poner algo"; 
    var vTipoRecuento = 1; 
    var vTipoEleccion = 1; 
    var vCategoriaId = "1"; 
    var vDistrito = "Buenos Aires"; 
    var vSeccionProvincial = "poner algo"; 
    var vSeccionID = "poner algo"; 

    
    var nuevoRegistro = `${vAnio}|${vTipoRecuento}|${vTipoEleccion}|${vCategoriaId}|${vDistrito}|${vSeccionProvincial}|${vSeccionID}`;

    
    var informes = localStorage.getItem("INFORMES");

    if (informes) {
        
        informes = informes.split(";");
        
        if (informes.includes(nuevoRegistro)) {
            mostrarMensaje("mensaje-usuario-amarillo", "La operación no se pudo completar.");
        } else {
            informes.push(nuevoRegistro);
            
            localStorage.setItem("INFORMES", informes.join(";"));
            mostrarMensaje("mensaje-usuario-verde", "Se agregó con éxito el resultado al informe.");
        }
    } else {
        
        localStorage.setItem("INFORMES", nuevoRegistro);
        mostrarMensaje("mensaje-usuario-verde", "Se agregó con éxito el resultado al informe.");
    }
});


function mostrarMensaje(claseMensaje, mensaje) {
    var mensajeElement = document.querySelector(`.${claseMensaje}`);
    if (mensajeElement) {
        mensajeElement.style.display = "block";
        mensajeElement.querySelector("p").textContent = mensaje;
    }
}