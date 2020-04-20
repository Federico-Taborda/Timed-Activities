let botonBarra = document.getElementById("closebtn");
let barraNum = 1;

// Escucha si el boton de la barra es clickeado
botonBarra.addEventListener("click", () => {

    if(barraNum == 1) {
        openNav();
        barraNum = 0;
    }else if(barraNum == 0){
        closeNav();
        barraNum = 1;
    };
});

// Abre la barra  lateral
function openNav() {
    document.getElementById("barra-lateral").style.width = "250px";
    document.getElementById("contenido-principal").style.marginLeft = "100px";
    document.getElementById("actividad-elegida").style.display = "initial";
    document.getElementById("cambiar-actividad").style.display = "initial";
    document.getElementById("titulo-cambiar").style.display = "initial";
    document.getElementById("listar").style.display = "initial";
    document.getElementById("listado").style.display = "initial";
};

// Cierra la barra lateral
function closeNav() {
    document.getElementById("barra-lateral").style.width = "5%";
    document.getElementById("contenido-principal").style.marginLeft = "0px";
    document.getElementById("actividad-elegida").style.display = "none";
    document.getElementById("cambiar-actividad").style.display = "none";
    document.getElementById("titulo-cambiar").style.display = "none";
    document.getElementById("listar").style.display = "none";
    document.getElementById("listado").style.display = "none";
};

