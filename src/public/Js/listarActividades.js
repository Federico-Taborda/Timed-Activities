let listar  = document.getElementById("listar");

listar.addEventListener("click", () => {
    let listado  = document.getElementById("listado");
    
    if(listado.childElementCount <= 0) {
        mostrarActividades();
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