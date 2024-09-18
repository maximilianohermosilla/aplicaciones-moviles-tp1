import RenderHistorial from './components/historialProductos.js'
import historialService from './services/historialService.js'

let historialStorage = localStorage.getItem("productos_historial")? JSON.parse(localStorage.getItem("productos_historial")): [];

function init(){
    let historialContainer = document.getElementById("historial-container");
    historialContainer.innerHTML = '';

    let historialTitle = historialStorage.length > 0? "Historial": "El historial se encuentra vacío";    
    $("#historial-title").html(historialTitle);

    let historialOrdered = historialStorage.sort((a, b) => { return parsearFecha(b.fecha) - parsearFecha(a.fecha) });

    historialOrdered.forEach(producto =>{ 
        historialContainer.innerHTML += RenderHistorial(producto);
    }) 

    if(historialStorage.length == 0){
        $("#historial-container").css("display", "none");
        $("#historial-acciones").css("display", "none");
    }

    $("#historial-clear").click(() => {
        if (confirm("¿Está seguro de que desea vaciar el historial?") == true) {
            historialService.Clearhistorial();
            window.location.reload();            
        }
    });
}

function parsearFecha(fechaProducto){
    const [fecha, hora] = fechaProducto.split(', ');
    const [dia, mes, anio] = fecha.split('/').map(Number);
    return new Date(anio, mes -1, dia, ...hora.split(':').map(Number));
}

init();