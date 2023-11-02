const tipoEleccion = 1;

const tipoRecuento = 1;

const periodosSelect = document.getElementById("anio");
const cargosSelect = document.getElementById("cargo");
const distritosSelect = document.getElementById("distrito");
const seccionSelect = document.getElementById("seccion");
let seccionesTotales = []

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


async function cargarDistritos() {
    const cargoSeleccionado = cargosSelect.value;

    if (cargoSeleccionado) {
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


async function cargarSecciones() {
    const cargoSeleccionado = cargosSelect.value;
    const distritoSeleccionado = distritosSelect.value;

    if (distritoSeleccionado) {
        const response = await fetch("https://resultados.mininterior.gob.ar/api/menu?año=" + periodosSelect.value);
        const datos = await response.json();

        seccionSelect.innerHTML = '<option value="">Sección</option>';

            datos[tipoEleccion].Cargos.forEach(cargo => {
                if (cargo.IdCargo === cargoSeleccionado) {
                    cargo.Distritos.forEach(distrito => {
                        if (distrito.IdDistrito == distritoSeleccionado) {
                                distrito.SeccionesProvinciales.forEach(seccionProvincial => {
                                seccionProvincial.Secciones.forEach(seccion =>{
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


periodosSelect.addEventListener("change", cargarCargos);
cargosSelect.addEventListener("change", cargarDistritos);
distritosSelect.addEventListener("change", cargarSecciones);


cargarAños();








const Anio = document.getElementById("anio");
const Cargo = document.getElementById("cargo");
const Distrito = document.getElementById("distrito");
const Seccion = document.getElementById("seccion");

//Tambien podemos usar Onload para que se actualize al seleccionar todos los campos
//Solo se actualizara al seleccionar todos
//Si usamos onchange al seleccionar el año el subtitulo de color azul nos muestra el indice 0 en todos los campos incompletos
//Ej: 2019 > Paso > 0 > 0 > 0 > 

Anio.addEventListener("change", actualizarDatos);
Cargo.addEventListener("change", actualizarDatos);
Distrito.addEventListener("change", actualizarDatos);
Seccion.addEventListener("change", actualizarDatos);


function actualizarDatos() {

    const anio = Anio.value;
    const tipoEleccion = "Paso";
    const cargo = Cargo.value;
    const distrito = Distrito.value;
    const seccion = Seccion.value;


    const titulo = document.getElementById("titulo");
    const subtitulo = document.getElementById("subtitulo");

    titulo.innerText = `Elecciones ${anio} | ${tipoEleccion}`;
    subtitulo.innerText = `${anio} > ${tipoEleccion} > ${cargo} > ${distrito} > ${seccion}`;
}



/*async function solicitarDatosApi() {
    try { 
        const response = await fetch("https://resultados.mininterior.gob.ar/api/menu/periodos");
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
        const años = await response.json();
        return años; 
    } catch (error) {
        console.error("Error en fetchDatos:", error);
        throw error; 
    }
}

function cargarAños(años) {
    var selectElement = document.getElementById("anio");

    let selectHTML = '<option value="0">Año</option>';

    selectHTML += años.map(año => {
        return `<option value="${año}">${año}</option>`;
    }).join('');

    selectElement.innerHTML = selectHTML;
}


solicitarDatosApi()
    .then(años => {
        cargarAños(años);
    })
    .catch(error => {
        console.error("Error:", error);
    });



function seleccionAño() {
    var selectElement = document.getElementById("anio");
    var selectedValue = selectElement.value;

    console.log(selectedValue);

    if (selectedValue && selectedValue != 0) { 
        fetchCargos(selectedValue); 
    }
}



async function fetchCargos(selectedValue) {
    console.log(tipoEleccion);
    try {
        const response = await fetch("https://resultados.mininterior.gob.ar/api/menu?año=" + selectedValue);
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }

        var data = await response.json();  
        data = data[tipoEleccion] 

        cargarCargos(data);

    } catch (error) {
        console.error("Error en fetchCargos:", error);
    }
}

var datosCargosYDistritos;


function cargarCargos(data) {
    var selectElement = document.getElementById("cargo");
    let selectHTML = '<option value="0">Cargo</option>';

    datosCargosYDistritos = data 
    var cargosAMostrar = [] 

    cargosAMostrar = data.Cargos.map((dato) => { 
        return dato.Cargo;
    })
    console.log(cargosAMostrar)

    selectHTML += cargosAMostrar.map(cargo => {
        return `<option value="${cargo}">${cargo}</option>`;
    }).join('');

    selectElement.innerHTML = selectHTML;
}


var arrayAñoMasCargo;

function cargoSeleccionado() {
    
    arrayAñoMasCargo = datosCargosYDistritos.Cargos;
    console.log(arrayAñoMasCargo);
    var selectElement = document.getElementById("cargo");
    var selectedValue = selectElement.value;

    console.log(selectedValue)
    if (selectedValue != 0 && selectedValue) {
        var arrayFiltrado = arrayAñoMasCargo.filter(obj => obj.Cargo === selectedValue);
        arrayAñoMasCargo = arrayFiltrado
        console.log(arrayAñoMasCargo)

        var arrayDistritos = arrayFiltrado[0].Distritos.map(obj => obj.Distrito);

        console.log(arrayDistritos);

        mostrarDistritos(arrayDistritos);

    }

}


function mostrarDistritos(arrayDistritos) {

    var selectElement = document.getElementById("distrito");

    let selectHTML = '<option value="Distrito">Distrito</option>';

    selectHTML += arrayDistritos.map(distrito => {
        return `<option value="${distrito}">${distrito}</option>`;
    }).join('');

    selectElement.innerHTML = selectHTML;

}

var seccionesAMostrar;

function distritoSeleccionado() {
    
    var selectElement = document.getElementById("distrito");
    var selectedValue = selectElement.value;
    console.log(selectedValue);

    console.log(arrayAñoMasCargo);

    seccionesAMostrar = arrayAñoMasCargo[0].Distritos.find(obj => obj.Distrito === selectedValue);

    if (seccionesAMostrar) {
        seccionesAMostrar = seccionesAMostrar.SeccionesProvinciales[0].Secciones;
    }

    mostrarSecciones(seccionesAMostrar);
}



function mostrarSecciones(seccionesAMostrar) {
    var selectElement = document.getElementById("seccion");

    let selectHTML = '<option value="Sección">Sección</option>';

    selectHTML += seccionesAMostrar.map(seccion => {
        return `<option value="${seccion.IdSeccion}">${seccion.Seccion}</option>`;
    }).join('');

    selectElement.innerHTML = selectHTML;
}

function seccionSeleccionada() {
    var selectElement = document.getElementById("seccion");
    var selectedValue = selectElement.value;
    console.log(selectedValue);


    if (selectedValue != 0 && selectedValue) {
        var distritoSeleccionado = arrayAñoMasCargo[0].Distritos.find(obj => obj.Distrito === selectedValue);

        if (distritoSeleccionado) {
            var seccionesFiltradas = distritoSeleccionado.SeccionesProvinciales[0].Secciones;
            mostrarSecciones(seccionesFiltradas);

            console.log(seccionesFiltradas);
        }
    }
}*/

