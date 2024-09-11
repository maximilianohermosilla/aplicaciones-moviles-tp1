function renderCantidad(){
    let carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
    if (carritoStorage.length > 0){
        $("#cantidad-tooltip").css("display", "flex");
        $("#cantidad-tooltip").text(carritoStorage.length);
    }
}

const carritoCounter = { Show: renderCantidad };

export default carritoCounter;