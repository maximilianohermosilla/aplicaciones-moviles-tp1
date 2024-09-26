import RenderCarrito from './components/carritoProductos.js'
import carritoService from './services/carritoService.js'

let carritoStorage = [];
const dialog = document.getElementById("dialog-clear");


function init(){    
    carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
    let carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = '';

    let carritoTitle = carritoStorage.length > 0? "Detalle Carrito": "El carrito se encuentra vacío";    
    $("#carrito-title").html(carritoTitle);

    if(carritoStorage.length == 0){
        $("#carrito-container").css("display", "none");
        $("#carrito-acciones").css("display", "none");
    }

    if(carritoStorage.length > 0){
        carritoStorage.forEach(producto =>{ 
            carritoContainer.innerHTML += RenderCarrito(producto);
        }) 

        const dialog = document.getElementById("dialog-clear");
        const cancelButton = document.getElementById("modal-cancel-clear");
        const confirmButton = document.getElementById("modal-confirm-clear");
        
        confirmButton.addEventListener("click", () => {
            carritoService.ClearCarrito();
            window.location.reload();   
        });
        
        cancelButton.addEventListener("click", () => {        
            dialog.close();
        });

        $("#carrito-clear").click(() => {
            dialog.showModal();
        });

        onButtonCloseClick(document.querySelectorAll(".button__close"));

    }
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
    await carritoService.ClearProduct(idProduct);
    init();
}

init();