import apiMercadoLibre from './services/apiMercadoLibre.js'
import carritoService from './services/carritoService.js'
import CardProducto from './components/cardProducto.js'

let listaProductos = [];

async function getProductosCategoria(categoria){
    if(categoria != ""){
        let itemsPorCategoria = await apiMercadoLibre.Get(categoria, "4");
        console.log(itemsPorCategoria);

        setTimeout(() => {
            listaProductos.push(...itemsPorCategoria.results);
            renderProductos(itemsPorCategoria.results, categoria);
        }, 100);
        
        onButtonClick(document.querySelectorAll(".button__agregar"));
    }    
}

async function renderProductos(productos, categoria){
    let productosContainer = document.getElementById(`categoria_${categoria}`);
    productosContainer.innerHTML = '';
    productos.forEach(producto =>{ 
        productosContainer.innerHTML += CardProducto(producto);        
    })  
    onCardClick(document.querySelectorAll(".product__card"));
}

function onCardClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            window.location.href = `../../pages/producto.html?${element.id}`;
        })
    });
}

function onButtonClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            //window.location.href = `../../pages/producto.html?${element.id}`;
            event.stopPropagation();
            console.log("Button pressed");
            addProduct(element.id.replace("button_", ''));
        })
    });
}

function addProduct(id){
    console.log(id)
    console.log(listaProductos)
    const product = listaProductos.find((element) => id == element.id);  
    carritoService.SaveProduct(product, 1);
    //getProductosCategoria(categoriaParam);
}

async function downloadImage(imageSrc, imageName) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = imageName;
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

getProductosCategoria("MLA1692");
setTimeout(() => {
    getProductosCategoria("MLA1693");    
}, 100);
setTimeout(() => {
    getProductosCategoria("MLA1694");    
}, 100);
setTimeout(() => {
    getProductosCategoria("MLA1672");    
}, 100);