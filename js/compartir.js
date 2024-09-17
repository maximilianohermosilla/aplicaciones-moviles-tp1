import apiMercadoLibre from './services/apiMercadoLibre.js'

let productoId = "";
let producto;

function getParamsFromHref(){
    let href = window.location.href;
    return href.split('?')[1];
}

function getParametro(){
    let parametros = getParamsFromHref();
    console.log(parametros)
    if(parametros != undefined && parametros != ""){
        return parametros.split('&')[0];
    }
    else{
        return "";
    }
}

const getProducto = async (param) => {
    producto = await apiMercadoLibre.GetItemPorId(param);
    console.log(producto)
    setTimeout(() => {
        //renderProducto(producto);
    }, 100);   
}

function init(){
    //getProductosCategoria(categoriaParam);
    productoId = getParametro();
    if(productoId == ""){
        renderNotFound();
    }
    else{
        producto = getProducto(productoId);
        setTimeout(() => {
            console.log(producto)
            if(producto == undefined){
                renderNotFound();
            }            
        }, 500);
    }
}


async function renderProducto(producto){
    //console.log(productos)
    // let productoContainer = document.getElementById("producto-container");
    // productoContainer.innerHTML = ProductoDetalle(producto);

    // let productoPictures = producto.pictures.map(item => ProductoPicture(item))
    // $("#producto-pictures").html(productoPictures);

    // let atributos = producto.attributes.map(item => ProductoAtributo(item))
    // $("#producto-atributos").html(atributos);

    // productoService.OnButtonClick(document.querySelectorAll("#button-agregar"), addProduct);
    // $("#button-compartir").on("click", function(event) {
    //     event.preventDefault();
    //     window.location.href = `../../pages/compartir.html?${productoId}`;        
    // }); 
}

function renderNotFound(){
    let compartirContainer = document.getElementById("compartir-container");
    compartirContainer.innerHTML = "<div class='home__container'><h1>No se encontraron resultados</h1></div>";
}

init();