let historialStorage = localStorage.getItem("productos_historial")? JSON.parse(localStorage.getItem("productos_historial")): [];

//Functions
async function gethistorialStorage(){
    historialStorage = await localStorage.getItem("productos_historial")? JSON.parse(localStorage.getItem("productos_historial")): [];  
    console.log(historialStorage)  
    return historialStorage;
}

async function renderizarhistorial(){    
    historialStorage = await gethistorialStorage();    
}

function addProduct(id){ 
    const product = historialStorage.find((element) => id == element.id);
    saveProduct(product, 1);
}

function saveProduct(product){
    console.log(product)
    let date = new Date();
    let fecha = date.toLocaleString("es-AR");
    const repeat = historialStorage.some((repeatProduct) => repeatProduct.id === product.id);
    console.log(repeat);
    if(repeat){
        clearProduct(product.id)
    } 
    console.log(historialStorage)

    saveLocalStorage(historialStorage);
    gethistorialStorage();

    historialStorage.push({
        id: product.id,
        thumbnail: product.thumbnail,
        title: product.title,
        price: product.price,
        fecha: fecha
    });
    
    console.log(historialStorage)
    saveLocalStorage(historialStorage);    
}

function removeProduct(id){
    historialStorage.map((prod) => {
        if(prod.cantidad == 1 && prod.id == id){
            clearProduct(id);
        }
        if (prod.id == id && prod.cantidad > 1){
            prod.cantidad--;
        }            
    });
    saveLocalStorage(historialStorage);
}

function clearProduct(id){
    const productoId = historialStorage.find((element) => element.id == id);

    historialStorage = historialStorage.filter((historial) => {
        return historial !== productoId;
    });

    saveLocalStorage(historialStorage);   
}

function saveLocalStorage(historialStorage){    
    localStorage.setItem("productos_historial", JSON.stringify(historialStorage));        
    renderizarhistorial();  
}

function clearhistorial(){    
    localStorage.removeItem("productos_historial");   
    renderizarhistorial();   
}

setTimeout(() => {    
    renderizarhistorial();
}, 200);

const historialService = {
    Gethistorial: gethistorialStorage,
    Sethistorial: saveLocalStorage,
    RenderhistorialView: renderizarhistorial,
    Clearhistorial: clearhistorial,
    AddProduct: addProduct,
    SaveProduct: saveProduct,
    RemoveProduct: removeProduct,
    ClearProduct: clearProduct,      
};

export default historialService;


