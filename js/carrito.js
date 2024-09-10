import carritoService from '/src/services/carritoService.js'

let pages = [];
let precio = 0;
pages.push({ html: '/pages/components/carritoDetalle.html', into: 'carrito-container'});
loaderHtml.Get(pages);

//Variables
let carritoStorage = await carritoService.GetCarrito();

//Functions
function checkCarrito(){    
    if (!carritoStorage.length > 0){
        const carritoContainer = document.getElementById("carrito-container");                
        carritoContainer.style.display = "none";
        
        var titleEmpty = document.getElementById("title-empty");
        if(titleEmpty){
            titleEmpty.textContent = "  El carrito está vacío";
            titleEmpty.className = "bi bi-cart-dash title divTituloCarrito";
        }
    }
}

function domSettings(){
    const pedidoContainer = document.getElementById("carrito-container");
    const btnConfirmar = document.getElementById("btnConfirmarPedido");
    const btnCancelar = document.getElementById("btnCancelarPedido");
    pedidoContainer.style.display = "block";    

    btnConfirmar.addEventListener('click', () =>{
        let title = "Confirmar Pedido";
        let text = "Usted está a punto de confirmar el pedido. ¿Desea continuar?";
        showConfirmModal(title, text, confirmCarrito);
    })    
    
    btnCancelar.addEventListener('click', () =>{   
        let title = "Cancelar Pedido";
        let text = "Usted está a punto de cancelar el pedido. ¿Desea continuar?";
        showConfirmModal(title, text, clearCarrito);
    })
}

function clearCarrito(){ 
    carritoService.ClearCarrito();
    window.location.reload();
}

function showPopUp(title, text, callback){
    const popUpContainer = document.getElementById("popUpContainer");
    popUpContainer.innerHTML = RenderPopUp(title, text);    

    const popupModal = new bootstrap.Modal(document.getElementById('popupModal'));    
    popupModal.show();        
    
    const popup = document.getElementById('popupModal');        
    popup.addEventListener('hidden.bs.modal', function (event) {
        clearCarrito();
    })
}

setTimeout(() => {  
    domSettings();
    checkCarrito();    
}, 500);



