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

        const dialog = document.getElementById("dialog-clear");
        const cancelButton = document.getElementById("modal-cancel-clear");
        const confirmButton = document.getElementById("modal-confirm-clear");
        
        confirmButton.addEventListener("click", () => {
            historialService.Clearhistorial();
            window.location.reload();   
        });
        
        cancelButton.addEventListener("click", () => {        
            dialog.close();
        });
    
        $("#historial-clear").click(() => {
            dialog.showModal();           
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

        let idProducto = element.id.replace("close_", "");
        const dialog = document.getElementById("dialog-"+idProducto);
        const cancelButton = document.getElementById("modal-cancel-"+idProducto);
        const confirmButton = document.getElementById("modal-confirm-"+idProducto);

        element.addEventListener('click', () =>{
            dialog.showModal();
        });    
        
        confirmButton.addEventListener("click", () => {
            deleteProduct(idProducto)
            dialog.close();
        });
        
        cancelButton.addEventListener("click", () => {        
            dialog.close();
        });
    });
}

async function deleteProduct(idProduct){    
    await historialService.ClearProduct(idProduct);
    init();
}


init();