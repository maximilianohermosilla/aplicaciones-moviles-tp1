import RenderHistorial from './components/historialProductos.js'
import historialService from './services/historialService.js'

let historialStorage = [];

function init(){
    historialStorage = localStorage.getItem("productos_historial")? JSON.parse(localStorage.getItem("productos_historial")): [];
    let historialContainer = document.getElementById("historial-container");
    historialContainer.innerHTML = '';

    let historialTitle = historialStorage.length > 0? "Historial": "El historial se encuentra vacío";    
    $("#historial-title").html(historialTitle);

    if(historialStorage.length == 0){
        $("#historial-container").css("display", "none");
        $("#historial-acciones").css("display", "none");
    }
    else{
        let historialOrdered = historialStorage.sort((a, b) => { return parsearFecha(b.fecha) - parsearFecha(a.fecha) });
    
        historialOrdered.forEach(producto =>{ 
            historialContainer.innerHTML += RenderHistorial(producto);
        }) 
    
        $("#historial-clear").click(() => {
            if (confirm("¿Está seguro de que desea vaciar el historial?") == true) {
                historialService.Clearhistorial();
                window.location.reload();            
            }
        });

        onButtonCloseClick(document.querySelectorAll(".button__close"));
    }    
}

function parsearFecha(fechaProducto){
    const [fecha, hora] = fechaProducto.split(', ');
    const [dia, mes, anio] = fecha.split('/').map(Number);
    return new Date(anio, mes -1, dia, ...hora.split(':').map(Number));
}


function onButtonCloseClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            if (confirm("¿Está seguro de que desea eliminar el producto del historial?") == true) {
                deleteProduct(element.id.replace("close_", ""));
            }
        })
    });
}

async function deleteProduct(idProduct){    
    await historialService.ClearProduct(idProduct);
    init();
}


init();