import apiMercadoLibre from './services/apiMercadoLibre.js'
import carritoService from './services/carritoService.js'
import productoService from './services/productoService.js'
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
    productoService.OnCardClick(document.querySelectorAll(".product__card"));
    productoService.OnButtonClick(document.querySelectorAll(".button__agregar"), addProduct);
}

function addProduct(id){
    console.log("producto agregado en main")
    const product = listaProductos.find((element) => id == element.id);  
    carritoService.SaveProduct(product, 1);
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