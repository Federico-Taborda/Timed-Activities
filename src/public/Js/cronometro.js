let iniciar_parar = document.getElementById("iniciar-parar");
let timeNum = 1;

// Escucha si el boton de iniciar/pausar tiempo es clickeado
iniciar_parar.addEventListener("click", () => {
    if(timeNum == 1) {
        contarTiempo(true);
        cambiarEstiloBoton("Parar", "#ff4d4d");
        timeNum = 0;
    }else if(timeNum == 0) {
        cambiarEstiloBoton("Iniciar", "#32ff7e");
        timeNum = 1;

        // fetch para guardar los datos
        guardarDatos();
    };
});

// Cambia el estilo del boton de iniciar/pausar
function cambiarEstiloBoton(text, color) {
    iniciar_parar.textContent = text;
    iniciar_parar.style.backgroundColor = color;
};

// Cronometro
function contarTiempo() {
    let segundos = 0;
    let minutos = 0;
    let horas = 0;
    
    let intervalo = setInterval(() => {
        segundos++;
        
        if(segundos >= 60) {
            segundos = 0;
            minutos += 1;
        }else if(minutos >= 60) {
            minutos = 0;
            horas += 1;
        };

        let tiempo = document.getElementById("tiempo");
        let arr = tiempo.textContent.split(":");

        if(segundos < 10) {
            arr[2] = `0${segundos}`;
        }else if(segundos >= 10) {
            arr[2] = `${segundos}`;
        };

        if(minutos < 10) {
            arr[1] = `0${minutos}`;
        }else if(minutos >= 10) {
            arr[1] = `${minutos}`;
        };

        if(horas < 10) {
            arr[0] = `0${horas}`;
        }else if(horas >= 10) {
            arr[0] = `${horas}`;
        };
        
        tiempo.innerHTML = arr.join(":");
        
        iniciar_parar.addEventListener("click", () => {
            clearInterval(intervalo);
        });
    }, 1000);
};

function guardarDatos() {
    let actividad = document.getElementById("titulo-actividad").textContent;
    let tiempo = document.getElementById("tiempo").textContent;
    let fechaActual = new Date();
    let hora = fechaActual.getHours() + ":" + fechaActual.getMinutes();
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth();
    let año = fechaActual.getFullYear();

    fetch("/ingresar-datos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            actividad: actividad,
            tiempo: tiempo, 
            hora: hora, 
            dia: dia,
            mes: mes, 
            año: año})
    });
};