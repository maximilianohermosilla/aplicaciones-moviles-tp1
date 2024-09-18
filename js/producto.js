import carritoService from './services/carritoService.js'
import historialService from './services/historialService.js'
import productoService from './services/productoService.js'
import apiMercadoLibre from './services/apiMercadoLibre.js'
import ProductoDetalle from './components/producto-detalle.js';
import ProductoAtributo from './components/producto-atributo.js';
import ProductoPicture from './components/producto-picture.js';

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
        renderProducto(producto);
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
        
        if(producto == undefined){
            renderNotFound();
        }
    }
}


async function renderProducto(producto){
    //console.log(productos)
    let productoContainer = document.getElementById("producto-container");
    productoContainer.innerHTML = ProductoDetalle(producto);

    let productoPictures = producto.pictures.map(item => ProductoPicture(item))
    $("#producto-pictures").html(productoPictures);

    let atributos = producto.attributes.map(item => ProductoAtributo(item))
    $("#producto-atributos").html(atributos);

    productoService.OnButtonClick(document.querySelectorAll("#button-agregar"), addProduct);
    $("#button-compartir").on("click", function(event) {
        event.preventDefault();
        window.location.href = `../../pages/compartir.html?${productoId}`;        
    }); 

    addProductoHistorial(producto)
    onImageClick(document.querySelectorAll(".producto__picture"));
}

function renderNotFound(){
    let productoContainer = document.getElementById("producto-container");
    productoContainer.innerHTML = "<div class='home__container'><h1>No se encontraron resultados</h1></div>";
}

function addProduct(){
    carritoService.SaveProduct(producto, 1);
}

function addProductoHistorial(){
    historialService.SaveProduct(producto);
}

function onImageClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            $("#producto-picture").attr("src", element.src);
        })
    });
}


init();