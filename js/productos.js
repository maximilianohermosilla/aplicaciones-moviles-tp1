import apiMercadoLibre from './services/apiMercadoLibre.js'
import carritoService from './services/carritoService.js'
import CardProducto from './components/cardProducto.js'

let carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
let busquedaTitle = "";
let busquedaParam = "";
let listaProductos;

init();

function init(){
    //getProductosCategoria(categoriaParam);
    busquedaParam = getParametroBusqueda();
    console.log(busquedaParam)
    setTimeout(() => {
        $("#productos-title").html("Resultados para: " + busquedaParam);        
    }, 500);
}

function onCardClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            addProduct(element.id);
        })
    });
}

function addProduct(id){
    const product = listaProductos.find((element) => id == element.id);  
    carritoService.SaveProduct(product, 1);
    getParametroBusqueda(categoriaParam);
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

async function getProductosCategoria(categoria){
    if(categoria != ""){
        let itemsPorCategoria = await apiMercadoLibre.Get(categoria);
        let itemsId = itemsPorCategoria.results.map((item) => item.id);
        //console.log(itemsPorCategoria);

        setTimeout(() => {
            categoriaTitle = itemsPorCategoria.filters[0].values[0].name;
            $("#productos-title").html(categoriaTitle);
            // let categoriaTitleTag = document.getElementById("categoria-title");
            // categoriaTitleTag.innerHTML = categoriaTitle;
            listaProductos = itemsPorCategoria.results;
            renderProductos(itemsPorCategoria.results);
        }, 100);       
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
