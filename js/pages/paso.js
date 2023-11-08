//VARIABLES 

const tipoEleccion = 1;
const tipoRecuento = 1;
const periodosSelect = document.getElementById("anio");
const cargosSelect = document.getElementById("cargo");
const distritosSelect = document.getElementById("distrito");
const seccionSelect = document.getElementById("seccion");
const hdSeccionSelect = document.getElementById("hdSeccionProvincial");
var mesasEscrutadas = document.getElementById('mesas-escrutadas')
var electores = document.getElementById('electores')
var participacion = document.getElementById('participacion')
const mensajeVerde = document.getElementById('mensaje-usuario-verde1');
const mensajeAmarillo = document.getElementById('mensaje-usuario-amarillo1');
const mensajeRojo = document.getElementById('mensaje-usuario-rojo1');

mensajeAmarillo.style.display = 'block'
mensajeAmarillo.innerHTML += " Debe seleccionar los valores a filtrar y hacer clic en el botón FILTRAR"



//COMBO AÑOS

async function cargarAños() {
    const response = await fetch("https://resultados.mininterior.gob.ar/api/menu/periodos");
    const años = await response.json();

    años.forEach(año => {
        const option = document.createElement("option");
        option.value = año;
        option.text = año;
        periodosSelect.appendChild(option);
    });
}

//COMBO CARGOS

async function cargarCargos() {
    const añoSeleccionado = periodosSelect.value;

    if (añoSeleccionado) {
        const response = await fetch("https://resultados.mininterior.gob.ar/api/menu?año=" + añoSeleccionado);
        const datos = await response.json();

        cargosSelect.innerHTML = '<option value="">Cargo</option>';
            
            datos[tipoEleccion].Cargos.forEach(cargo => {
                const option = document.createElement("option");
                option.value = cargo.IdCargo;
                option.text = cargo.Cargo;
                cargosSelect.appendChild(option);
            
            });
        
    };
}

//COMBO DISTRITOS

async function cargarDistritos() {
    const cargoSeleccionado = cargosSelect.value;
    const añoSeleccionado = periodosSelect.value;

    if (cargoSeleccionado && añoSeleccionado) {
        const response = await fetch("https://resultados.mininterior.gob.ar/api/menu?año=" + periodosSelect.value);
        const datos = await response.json();

        distritosSelect.innerHTML = '<option value="">Distrito</option>';

            datos[tipoEleccion].Cargos.forEach(cargo => {
                if (cargo.IdCargo === cargoSeleccionado) {
                    cargo.Distritos.forEach(distrito => {
                        const option = document.createElement("option");
                        option.value = distrito.IdDistrito;
                        option.text = distrito.Distrito;
                        distritosSelect.appendChild(option);
                    });
                }
            });
    }
}

//COMBO SECCIONES

async function cargarSecciones() {
    const añoSeleccionado = periodosSelect.value;
    const cargoSeleccionado = cargosSelect.value;
    const distritoSeleccionado = distritosSelect.value;

    if (distritoSeleccionado && cargoSeleccionado && añoSeleccionado) {
        const response = await fetch("https://resultados.mininterior.gob.ar/api/menu?año=" + periodosSelect.value);
        const datos = await response.json();

        seccionSelect.innerHTML = '<option value="">Sección</option>';

            datos[tipoEleccion].Cargos.forEach(cargo => {
                if (cargo.IdCargo === cargoSeleccionado) {
                    cargo.Distritos.forEach(distrito => {
                        if (distrito.IdDistrito == distritoSeleccionado) {
                                distrito.SeccionesProvinciales.forEach(seccionesProvinciales => {
                                hdSeccionSelect.value = seccionesProvinciales.IDSeccionProvincial;
                                seccionesProvinciales.Secciones.forEach(seccion =>{
                                const option = document.createElement("option");
                                option.value = seccion.IdSeccion;
                                option.text = seccion.Seccion;
                                seccionSelect.appendChild(option);} );
                            });
                        }
                    });
                }
            });

        
    }
}

//COMBO EVENTOS

periodosSelect.addEventListener("change", cargarCargos);
cargosSelect.addEventListener("change", cargarDistritos);
distritosSelect.addEventListener("change", cargarSecciones);

//FUNCION CARGAR AÑOS
cargarAños();


//CAMBIO DE NUMEROS 

async function cambioPorcentaje() {
    document.getElementById("participacion-num").innerHTML = 'Participacion Sobre Escrutado <br>' + participacion + '%'
    document.getElementById("mesasEscrutadas-num").innerHTML = 'Mesas Escrutadas <br>' + mesasEscrutadas
    document.getElementById("electores-num").innerHTML = 'Electores <br>' + electores
}

//MENSAJES USUARIO

//function mostrarMensajeError(){}
//BOTON FILTRAR
async function filtrarDatos() {
  
  var anioEleccion = periodosSelect.value;
  var categoriaId = 2;
  var distritoId = distritosSelect.value;
  var seccionProvincialId = hdSeccionSelect.value == "null" ? "" : hdSeccionSelect.value;
  var seccionId = seccionSelect.value;
  var circuitoId = "";
  var mesaId = "";

  console.log(
    "Año:",
    anioEleccion,
    "Categoria:",
    categoriaId,
    "Tipo de elección:",
    tipoEleccion,
    "Tipo de recuento:",
    tipoRecuento,
    "ID Distrito:",
    distritoId,
    "ID Sección Provincial:",
    seccionProvincialId,
    "ID Sección:",
    seccionId
  );

  
  let url = `https://resultados.mininterior.gob.ar/api/resultados/getResultados?anioEleccion=${anioEleccion}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${categoriaId}&distritoId=${distritoId}&seccionProvincialId=${seccionProvincialId}&seccionId=${seccionId}&circuitoId=${circuitoId}&mesaId=${mesaId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const data = await response.json();

    
    mesasEscrutadas = data.estadoRecuento.mesasTotalizadas;
    electores = data.estadoRecuento.cantidadElectores;
    participacion = data.estadoRecuento.participacionPorcentaje;
    valoresTotalizadosPositivos = data.valoresTotalizadosPositivos;

    console.log(
      "Mesas totalizadas:",
      mesasEscrutadas,
      "Electores:",
      electores,
      "Participacion sobre escrutado:",
      participacion
    );
    
    mensaje = document.getElementById("mensaje-usuario-rojo1")
    mensaje2 = document.getElementById("mensaje-usuario-amarillo1")

    if (mensaje.classList.contains("display-none") && periodosSelect.value != 0 && cargosSelect.value != 0 && seccionSelect.value != 0 && distritosSelect.value != 0){
        mensaje.classList.remove("display-none")
        mensaje2.classList.add("display-none")
    }

    cambioPorcentaje()
    
    console.log("Resultados obtenidos: ", data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    //mostrarMensajeError()
  }
}



const filtrar = document.getElementById("filtrar");



