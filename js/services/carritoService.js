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
    getPrecioTotal();
}


function addProduct(id){ 
    const product = carritoStorage.find((element) => id == element.id);
    saveProduct(product, 1);
}

function saveProduct(product, cantidad){
    console.log(product)
    const repeat = carritoStorage.some((repeatProduct) => repeatProduct.id === product.id);
    if(repeat){
        removeProduct(product.id);        
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
        $("#precio-tooltip").css("display", "none");
        $("#cantidad-tooltip").css("display", "none");
    }
}

function saveLocalStorage(carritoStorage){    
    localStorage.setItem("productos", JSON.stringify(carritoStorage));    
    carritoCounter.Show();  
    renderizarCarrito();  
}

function clearCarrito(){    
    localStorage.removeItem("productos");   
    renderizarCarrito();   
}

function getPrecioTotal(){    
    let precioTotal = 0;

    carritoStorage.map((prod) => {
        precioTotal += (prod.price * prod.cantidad);
    });

    if(precioTotal>0){
        $("#precio-tooltip").css("display", "flex");
        $("#precio-tooltip").html('$' + precioTotal.toLocaleString("es-AR"));
    }
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


