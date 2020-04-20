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
                
                element.addEventListener("mouseout",  () => {
                    element.style.color = "#fff";
                });

                // Pintara los datos del elemento en la tabla
                element.addEventListener("click", () => {
                    fetch(`/actividades/${element.textContent}`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({actividad: element.textContent})
                    })
                    .then((data) => {
                        return data.json()
                    })
                    .then((json) => {
                        console.log(json)
                    })
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