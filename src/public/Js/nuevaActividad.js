let nuevaActividad = document.getElementById("cambiar-actividad")

nuevaActividad.addEventListener("click", (e) => {

    let nuevoTitulo = document.getElementById("actividad-elegida").value;
    if(nuevoTitulo == "") {
        alert("Debes elegir un nombre para tu actividad");
    }else{
        let titulo = document.getElementById("titulo-actividad");
        titulo.textContent = nuevoTitulo;

        // fetch a la base de datos
        fetch("/nueva-actividad", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({actividad: nuevoTitulo})
        });
    };
});