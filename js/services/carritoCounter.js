function renderCantidad(){
    let carritoStorage = localStorage.getItem("mercaderias")? JSON.parse(localStorage.getItem("mercaderias")): [];
    if (carritoStorage.length > 0){
        var tooltip = document.getElementById("cantidad-tooltip");
        tooltip.style.display = "flex";    
        tooltip.textContent = carritoStorage.length;
    }
}

const carritoCounter = { Show: renderCantidad };

export default carritoCounter;