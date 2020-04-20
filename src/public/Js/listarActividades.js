let listar  = document.getElementById("listar");

listar.addEventListener("click", () => {
    let listado  = document.getElementById("listado");
    
    if(listado.childElementCount <= 0) {
        // Lista las actividades en el lateral
        mostrarActividades()

        // Una vez listados se le aplicara listeners a los elementos
        .then(() => {
            listado.childNodes.forEach(element => {
                // Cambiara los estilos
                element.addEventListener("mouseover", () => {
                    element.style.cursor = "pointer"
                    element.style.color = "#fffa65";
                });
                
                element.addEventListener("mouseout",  () => element.style.color = "#fff");

                // Pintara los datos del elemento en la tabla
                element.addEventListener("click", () => {

                    // Consulta a la DB los datos de la respectiva actividad
                    fetch(`/actividades/${element.textContent}`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({actividad: element.textContent})
                    })
                    .then((data) => data.json())
                    .then((json) => {
                        const { data } = json;
                        imprimirDatos(element.textContent, data);
                    });
                });
            });
        });
    };

    // Iterar sobre los elementos agregados
});

// Lista las actividades realizadas en la barra lateral
async function mostrarActividades() {
    let peticion = await fetch("/actividades", {method: "GET"});
    let json = await peticion.json();

    json.tables.map((element, index) => {
        if(index > 0) {
            let listado = document.getElementById("listado");
            listado.innerHTML += `<h2>${element.name}</h2>`;
        };
    });
};

// Imprimir datos en la tabla
function imprimirDatos(title, data) {
    let cronometro = document.getElementById("cronometro");
    let tabla = document.getElementById("tabla");
    let tituloTabla = document.getElementById("titulo-tabla");
    let contenidoTabla = document.getElementById("cuerpo-tabla");
                            
    tituloTabla.innerHTML = title;
    contenidoTabla.innerHTML = "";
    cronometro.style.display = "none";
    tabla.style.display = "initial";

    data.forEach(data => {
        contenidoTabla.innerHTML += `
        <tr>
            <td class="tiempo">${data.tiempo}</td>
            <td class="hora">${data.hora}</td>
            <td class="dia">${data.dia}</td>
            <td class="mes">${data.mes}</td>
            <td class="año">${data.año}</td>
        </tr>
        `
    });
};