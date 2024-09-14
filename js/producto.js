import carritoService from './services/carritoService.js'
import apiMercadoLibre from './services/apiMercadoLibre.js'
import ProductoDetalle from './components/producto-detalle.js';
import ProductoAtributo from './components/producto-atributo.js';
import ProductoPicture from './components/producto-picture.js';

let carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
let productoId = "";
let producto;

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
    producto = getProducto(productoId);
    setTimeout(() => { 
        console.log(producto)
    }, 500);
}

init();

function onCardClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            addProduct(element.id);
        })
    });
}

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

async function renderProducto(producto){
    //console.log(productos)
    let productoContainer = document.getElementById("producto-container");
    productoContainer.innerHTML = ProductoDetalle(producto);

    let productoPictures = producto.pictures.map(item => ProductoPicture(item))
    $("#producto-pictures").html(productoPictures);

    let atributos = producto.attributes.map(item => ProductoAtributo(item))
    $("#producto-atributos").html(atributos);
    onCardClick(document.querySelectorAll(".product__card"));
}
