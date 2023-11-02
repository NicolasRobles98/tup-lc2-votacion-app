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
const Carg = document.getElementById("cargo");
const Distrito = document.getElementById("distrito");
const Seccion = document.getElementById("seccion");

//Tambien podemos usar Onload para que se actualize al seleccionar todos los campos
//Solo se actualizara al seleccionar todos
//Si usamos onchange al seleccionar el año el subtitulo de color azul nos muestra el indice 0 en todos los campos incompletos
//Ej: 2019 > Paso > 0 > 0 > 0 > 

Anio.addEventListener("change", actualizarDatos);
Carg.addEventListener("change", actualizarDatos);
Distrito.addEventListener("change", actualizarDatos);
Seccion.addEventListener("change", actualizarDatos);


function actualizarDatos() {


    const anio = Anio.value;
    const tipoEleccion = "Paso";
    const cargo = Carg.text;
    const distrito = Distrito.value;
    const seccion = Seccion.value;


    const titulo = document.getElementById("titulo");
    const subtitulo = document.getElementById("subtitulo");

    titulo.innerText = `Elecciones ${anio} | ${tipoEleccion}`;
    subtitulo.innerText = `${anio} > ${tipoEleccion} > ${cargo} > ${distrito} > ${seccion}`;
}