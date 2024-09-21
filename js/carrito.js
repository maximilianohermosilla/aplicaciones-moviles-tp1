import RenderCarrito from './components/carritoProductos.js'
import carritoService from './services/carritoService.js'

let carritoStorage = [];

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

        $("#carrito-clear").click(() => {
            if (confirm("¿Está seguro de que desea vaciar el carrito de compras?") == true) {
                carritoService.ClearCarrito();
                window.location.reload();            
            }
        });

        onButtonCloseClick(document.querySelectorAll(".button__close"));

    }
}

function onButtonCloseClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            if (confirm("¿Está seguro de que desea eliminar el producto del carrito de compras?") == true) {
                deleteProduct(element.id.replace("close_", ""));
            }
        })
    });
}

async function deleteProduct(idProduct){    
    await carritoService.ClearProduct(idProduct);
    init();
}

init();