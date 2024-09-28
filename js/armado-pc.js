import componentes from '../js/utils/componentes-armado.js'
import CardComponente from './components/card-componente.js'
import apiMercadoLibre from './services/apiMercadoLibre.js'
import ProductoArmado from './components/producto-armado.js'

let filters = "";
let offset = 0;
let listaProductos;
let categoriaSelected;
let listaProductosSeleccionados = [];

$("#componentes-container").html(componentes.map(componente => CardComponente(componente)));
// $(`#${categoriaSelected}`).addClass("componente__selected");

setTimeout(() => {
    document.querySelectorAll(".componente__figure").forEach(componente => {
        $(`#${componente.id}`).on("click", function() {
            selectCategoria(componente);
        });
    })    
}, 1000);

function selectCategoria(categoria){
    componentes.forEach(element => {
        $(`#armado-${element.id}`).removeClass("componente__active");
    });

    $(`#${categoria.id}`).addClass("componente__active");
    categoriaSelected = categoria;
    getProductos();
}

const getProductos = async () => {
    let productos = await apiMercadoLibre.GetItems(categoriaSelected.id.replace("armado-", ""), "", 10, offset*10, filters);
    console.log(productos)
    setTimeout(() => {
        let disabledButton = offset == 0? "disabled": "";
        $("#pagination-prev").prop("disabled", disabledButton);
        listaProductos = productos.results;
        renderProductos(productos.results);        
        $("#armado-categoria-title").html(categoriaSelected.nombre);
        console.log(listaProductos);        
        window.scrollTo(0, 0);
    }, 100);   
}


async function renderProductos(productos){
    $("#armado-categoria-container").css("display", "flex");
    $("#pagination-container").css("display", "flex");
    let productosContainer = document.getElementById("armado-categoria-container");
    productosContainer.innerHTML = '';
    productos.forEach(producto =>{ 
        productosContainer.innerHTML += ProductoArmado(producto);  
        if(listaProductosSeleccionados.some(p => p.id == producto.id)){
            $(`#${producto.id}`).addClass("armado___producto__selected");
        }      
    })   
    productos.forEach(producto =>{    
        $(`#${producto.id}`).on("click", function() {
            selectProduct(producto);
        });
    });
    $("#pagination-offset").html((offset + 1).toString())
}


function selectProduct(producto){
    if($(`#${producto.id}`).hasClass("armado___producto__selected")){
        console.log(categoriaSelected)
        console.log(categoriaSelected.id)
        console.log(listaProductosSeleccionados.some(p => p.category_id == categoriaSelected.id.replace("armado-", "")));      
        $(`#${producto.id}`).removeClass("armado___producto__selected");
        listaProductosSeleccionados = listaProductosSeleccionados.filter(p => p.id != producto.id);
        if(!listaProductosSeleccionados.some(p => p.category_id == categoriaSelected.id.replace("armado-", ""))){
            $(`#${categoriaSelected.id}`).removeClass("componente__selected");
        }
    }
    else{
        $(`#${categoriaSelected.id}`).addClass("componente__selected");
        $(`#${producto.id}`).addClass("armado___producto__selected");
        listaProductosSeleccionados.push(producto);
    }
    console.log(producto)
    console.log(listaProductosSeleccionados)
}

$("#pagination-prev").on("click", async function(){
    offset--;
    listaProductos = await getProductos();
});

$("#pagination-next").on("click", async function(){
    offset++;
    listaProductos = await getProductos();
});