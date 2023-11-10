const mensajeVerde = document.getElementById('mensaje-usuario-verde1');
const mensajeAmarillo = document.getElementById('mensaje-usuario-amarillo1');
const mensajeRojo = document.getElementById('mensaje-usuario-rojo1');

mensajeRojo.classList.add("display-none")
mensajeVerde.classList.add("display-none")
mensajeAmarillo.classList.add("display-none")

async function informes(){
    const response = await fetch(`https://resultados.mininterior.gob.ar/api/resultados/getResultados?anioEleccion=${anioEleccion}&tipoRecuento=${tipoRecuento}&tipoEleccion=${tipoEleccion}&categoriaId=${categoriaId}&distritoId=${distritoId}&seccionProvincialId=${seccionProvincialId}&seccionId=${seccionId}&circuitoId=${circuitoId}&mesaId=${mesaId}`);
    const info = await response.json();

    if (!informesGuardados) {
        informesGuardados = [];
        mensajeAmarillo.classList.remove("display-none")
        mensajeAmarillo.innerHTML += "No hay informes guardados para mostrar";
    } else {
        // Si hay informes guardados, convertir la cadena a un array
        var i = 0
        informesGuardados.informesGuardados.forEach(informes => {
            var informe1 = informes[i].split('|')
            var anio = informe1[0]
            var TipoRecuento = informe1[1]
            var TipoEleccion = informe1[2]
            var CategoriaId = informe1[3]
            var Distrito = informe1[4]
            var SeccionProvincial = informe1[5]
            var SeccionID = informe1[6]

            i += 1
        });
        // informesGuardados = informesGuardados.split(';');
    }
}

async function cambiarTitulo() {
    var titulo = document.getElementById("titulo")
    var anio = periodosSelect.value
    titulo.innerText = Elecciones ${anio} | Paso
}

async function cambiarSubtitulo() {
    var subtitulo = document.getElementById("subtitulo")
    var anio = periodosSelect.value
    var distrito = distritosSelect.options[distritosSelect.selectedIndex].text
    var cargo = cargosSelect.options[cargosSelect.selectedIndex].text
    var seccion = seccionSelect.options[seccionSelect.selectedIndex].text
    subtitulo.innerText = ${anio} > Paso > Definitivo > ${cargo} > ${distrito} > ${seccion}
}