import apiMercadoLibre from './services/apiMercadoLibre.js'
import carritoService from './services/carritoService.js'
import productoService from './services/productoService.js'
import CardProducto from './components/cardProducto.js'
import SelectOption from './components/select-option.js'
import Link from './components/link.js'
import LinkFilter from './components/link-filter.js'

let categoriaPrincipal = 'MLA1648';
let carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
let busquedaParam = "";
let filters = "";
let filtrosSeleccionados = [];
let listaProductos;

const getProductos = async (param) => {
    let productos = await apiMercadoLibre.GetItems(categoriaPrincipal, param, 10, '', filters);
    console.log(productos)
    setTimeout(() => {
        listaProductos = productos.results;
        renderProductos(productos.results);
        getFilters(productos);
        $("#productos-title").html("Resultados para: " + busquedaParam.replaceAll("%20", " "));
        $("#input-busqueda").val(busquedaParam.replaceAll("%20", " "));
        if(filtrosSeleccionados.length > 0){
            $("#productos-filters").html("Filtros: " + filtrosSeleccionados.map(x => " " + x));
        }
        console.log(listaProductos)
    }, 100);   
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

async function init(){
    busquedaParam = getParametroBusqueda();
    console.log(busquedaParam)
    listaProductos = await getProductos(busquedaParam);    
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

function getFilters(productos){
    $("#filter-category-title").html("")    
    $("#filter-category").html("");
    $("#filter-brand-title").html("")    
    $("#filter-brand").html("");
    $("#filter-price-title").html("")    
    $("#filter-price").html("");
    if(productos.available_filters && productos.available_filters.length > 0){
        let categoryFilter = productos.available_filters.find(x => x.id == "category");
        let brandFilter = productos.available_filters.find(x => x.id == "BRAND");
        let priceFilter = productos.available_filters.find(x => x.id == "price");

        console.log(categoryFilter)
        console.log(brandFilter)
        console.log(priceFilter)

        if(categoryFilter){
            $("#filter-category-title").html(categoryFilter.name)
            let linksOrdenados = categoryFilter.values.slice(0, 10);
            let links = linksOrdenados.map(item => LinkFilter(item, categoryFilter.id));
            setTimeout(() => {
                $("#filter-category").html(links);
            }, 500);
        }
        
        if(brandFilter){
            $("#filter-brand-title").html(brandFilter.name)
            let linksOrdenados = brandFilter.values.slice(0, 10);
            let links = linksOrdenados.map(item => LinkFilter(item, brandFilter.id));
            setTimeout(() => {
                $("#filter-brand").html(links);
            }, 500);
        }
        
        if(priceFilter){
            $("#filter-price-title").html(priceFilter.name)
            let linksOrdenados = priceFilter.values.slice(0, 10);
            let links = linksOrdenados.map(item => LinkFilter(item, priceFilter.id));
            setTimeout(() => {
                $("#filter-price").html(links);
            }, 500);
        }

        setTimeout(() => {
            onFilterClick(document.querySelectorAll(".link__filter"));            
        }, 1000);
    }
}

function onFilterClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', async () =>{            
            filters += element.id;
            filtrosSeleccionados.push(element.innerHTML)
            //console.log(filters)
            console.log(filtrosSeleccionados)
            listaProductos = await getProductos(busquedaParam);    
        })
    });
}

init();
