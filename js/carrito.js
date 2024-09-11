import RenderCarrito from './components/carritoProductos.js'
import carritoService from './services/carritoService.js'

let carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];

function init(){
    let carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = '';

    let carritoTitle = carritoStorage.length > 0? "Detalle Carrito": "El carrito se encuentra vacío";    
    $("#carrito-title").html(carritoTitle);

    carritoStorage.forEach(producto =>{ 
        carritoContainer.innerHTML += RenderCarrito(producto);
    }) 

    if(carritoStorage.length == 0){
        $("#carrito-container").css("display", "none");
        $("#carrito-acciones").css("display", "none");
    }

    $("#carrito-clear").click(() => {
        if (confirm("¿Está seguro de que desea vaciar el carrito de compras?") == true) {
            carritoService.ClearCarrito();
            window.location.reload();            
        }
    });
}

init();