import apiMercadoLibre from './services/apiMercadoLibre.js'
import carritoService from './services/carritoService.js'
import CardProducto from './components/cardProducto.js'

let carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
let busquedaParam = "";
let listaProductos;

const getProductos = async (param) => {
    let productos = await apiMercadoLibre.GetItems(param);
    console.log(productos)
    setTimeout(() => {
        listaProductos = productos.results;
        renderProductos(productos.results);
    }, 100);   
}

function init(){
    //getProductosCategoria(categoriaParam);
    busquedaParam = getParametroBusqueda();
    console.log(busquedaParam)
    listaProductos = getProductos(busquedaParam);
    setTimeout(() => {
        $("#productos-title").html("Resultados para: " + busquedaParam.replaceAll("%20", " "));        
        console.log(listaProductos)
    }, 500);
}

function onCardClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            window.location.href = `../../pages/producto.html?${element.id}`;
        })
    });
}

function getParamsFromHref(){
    let href = window.location.href;
    return href.split('?')[1];
}

function getParametroBusqueda(){
    let parametros = getParamsFromHref();
    console.log(parametros)
    if(parametros != undefined && parametros != ""){
        return parametros.replace("search=", "");
    }
    else{
        return "";
    }
}

async function renderProductos(productos){
    //console.log(productos)
    let productosContainer = document.getElementById("productos-container");
    productosContainer.innerHTML = '';
    productos.forEach(producto =>{ 
        productosContainer.innerHTML += CardProducto(producto);
        //getProductoEnCarrito(producto);
    })  
    onCardClick(document.querySelectorAll(".product__card"));
}

function getProductoEnCarrito(product){
    carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
    const repeat = carritoStorage.some((repeatProduct) => repeatProduct.id == product.id);
    if(repeat){
        let articleId = `#${product.id.toString()}`;
        $(articleId).addClass("product__card__selected");
    }
}

init();
