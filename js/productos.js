import apiMercadoLibre from './services/apiMercadoLibre.js'
import carritoService from './services/carritoService.js'
import productoService from './services/productoService.js'
import CardProducto from './components/cardProducto.js'

let categoriaPrincipal = 'MLA1648';
let carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
let busquedaParam = "";
let listaProductos;

const getProductos = async (param) => {
    let productos = await apiMercadoLibre.GetItems(categoriaPrincipal, param, 10, '', '');
    console.log(productos)
    setTimeout(() => {
        listaProductos = productos.results;
        renderProductos(productos.results);
    }, 100);   
}

async function init(){
    busquedaParam = getParametroBusqueda();
    console.log(busquedaParam)
    listaProductos = await getProductos(busquedaParam);
    setTimeout(() => {
        $("#productos-title").html("Resultados para: " + busquedaParam.replaceAll("%20", " "));
        $("#input-busqueda").val(busquedaParam.replaceAll("%20", " "));
        console.log(listaProductos)
    }, 500);
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
    productoService.OnCardClick(document.querySelectorAll(".product__card"));
    productoService.OnButtonClick(document.querySelectorAll(".button__agregar"), addProduct);
    productoService.OnButtonCompartirClick(document.querySelectorAll(".button__compartir"));
}

function getProductoEnCarrito(product){
    carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
    const repeat = carritoStorage.some((repeatProduct) => repeatProduct.id == product.id);
    if(repeat){
        let articleId = `#${product.id.toString()}`;
        $(articleId).addClass("product__card__selected");
    }
}

function addProduct(id){
    console.log("add product de productos")
    const product = listaProductos.find((element) => id == element.id);  
    carritoService.SaveProduct(product, 1);
}

init();
