import RenderCarrito from '../components/carritoProductos.js'
import carritoCounter from './carritoCounter.js'

let carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];

//Functions
async function getCarritoStorage(){
    carritoStorage = await localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];    
    carritoCounter.Show();
    return carritoStorage;
}

async function renderizarCarrito(){
    carritoStorage = await getCarritoStorage();
    let carritoContainer = document.getElementById("carrito-container");
    carritoContainer.innerHTML = '';
    // carritoStorage.forEach(producto =>{ 
    //     carritoContainer.innerHTML += RenderCarrito(producto);
    // })
    // onButtonAddClick(document.querySelectorAll(".btnAgregarCantidad"));
    // onButtonRemoveClick(document.querySelectorAll(".btnQuitarCantidad"));
    // onButtonDeleteElementClick(document.querySelectorAll(".delete-icon"));
    // getPrecioTotal();
}

function onButtonAddClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            addProduct(element.id);
        })
    });
}

function onButtonRemoveClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            removeProduct(element.id);
        })
    });
}

function onButtonDeleteElementClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            clearProduct(element.id);
        })
    });
}

function addProduct(id){ 
    const product = carritoStorage.find((element) => id == element.id);
    saveProduct(product, 1);
}

function saveProduct(product, cantidad){
    const repeat = carritoStorage.some((repeatProduct) => repeatProduct.id === product.id);
    console.log(carritoStorage);
    if(repeat){
        carritoStorage.map((prod) => {
            if (prod.id == product.id){
                prod.cantidad += cantidad;
            }            
        });
    } else{
        carritoStorage.push({
            id: product.id,
            thumbnail: product.thumbnail,
            title: product.title,
            price: product.price,
            cantidad: cantidad
        });
    }
    saveLocalStorage(carritoStorage);    
}

function removeProduct(id){
    carritoStorage.map((prod) => {
        if(prod.cantidad == 1 && prod.id == id){
            clearProduct(id);
        }
        if (prod.id == id && prod.cantidad > 1){
            prod.cantidad--;
        }            
    });
    saveLocalStorage(carritoStorage);
}

function clearProduct(id){
    const productoId = carritoStorage.find((element) => element.id == id);

    carritoStorage = carritoStorage.filter((carrito) => {
        return carrito !== productoId;
    });

    saveLocalStorage(carritoStorage);
    if (!carritoStorage.length > 0){ 
        window.location.reload();
    }
}

function saveLocalStorage(carritoStorage){    
    localStorage.setItem("productos", JSON.stringify(carritoStorage));    
    carritoCounter.Show();
    renderizarCarrito();
}

function clearCarrito(){    
    localStorage.removeItem("productos");    
}

function getPrecioTotal(){    
    let precioTotal = 0;
    carritoStorage.map((prod) => {
        precioTotal += (prod.precio * prod.cantidad);
    });
    const precioElement = document.getElementById("precio-total");
    precioElement.textContent = '$' + precioTotal;
}

setTimeout(() => {    
    renderizarCarrito();
}, 200);

const carritoService = {
    GetCarrito: getCarritoStorage,
    SetCarrito: saveLocalStorage,
    RenderCarritoView: renderizarCarrito,
    ClearCarrito: clearCarrito,
    AddProduct: addProduct,
    SaveProduct: saveProduct,
    RemoveProduct: removeProduct,
    ClearProduct: clearProduct,      
};

export default carritoService;


