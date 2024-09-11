import apiMercadoLibre from './services/apiMercadoLibre.js'
import carritoService from './services/carritoService.js'
import CardProducto from './components/cardProducto.js'

let categoriaTitle = "";
let categoriaParam = getParametroCategoria();
let listaProductos;

init();

function init(){
    getProductosCategoria(categoriaParam);
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
    // let elementCantidad = document.getElementById("select-cantidad_"+id); 
    // let cantidad = parseInt(elementCantidad.options[elementCantidad.selectedIndex].value);
    
    carritoService.SaveProduct(product, 1);
    //showCarrito();
}

function getParamsFromHref(){
    let href = window.location.href;
    return href.split('?')[1];
}

function getParametroCategoria(){
    let parametros = getParamsFromHref();
    if(parametros != undefined && parametros != ""){
        return parametros.replace("cat=", "");
    }
    else{
        return "";
    }
}

async function getProductosCategoria(categoria){
    if(categoria != ""){
        let itemsPorCategoria = await apiMercadoLibre.Get(categoria);
        let itemsId = itemsPorCategoria.results.map((item) => item.id);
        console.log(itemsPorCategoria);

        setTimeout(() => {
            categoriaTitle = itemsPorCategoria.filters[0].values[0].name;
            let categoriaTitleTag = document.getElementById("categoria-title");
            categoriaTitleTag.innerHTML = categoriaTitle;
            listaProductos = itemsPorCategoria.results;
            renderProductos(itemsPorCategoria.results);
        }, 100);
        //let itemsDetalle = await apiMercadoLibre.GetItems(itemsId);

        // let itemsFiltrados = itemsDetalle.map((item) => item.body);
        // let itemsResult = itemsFiltrados.map( ({title, price, pictures}) => ({title, price, pictures}));                
        // console.log(itemsResult);

        // itemsResult.forEach(element => {
        //     //downloadImage(element.pictures[0].secure_url, element.title);
        //     console.log(element)
        // });
    }

    
}

async function renderProductos(productos){
    console.log(productos)
    let productosContainer = document.getElementById("productos-container");
    productosContainer.innerHTML = '';
    productos.forEach(producto =>{ 
        productosContainer.innerHTML += CardProducto(producto);
    })  
    onCardClick(document.querySelectorAll(".product__card"));    
}
