import componentes from '../js/utils/componentes-armado.js'
import CardComponente from './components/card-componente.js'
import ProductoArmado from './components/producto-armado.js'
import apiMercadoLibre from './services/apiMercadoLibre.js'
import carritoService from './services/carritoService.js'

let filters = "";
let offset = 0;
let listaProductos;
let categoriaSelected;
let listaProductosSeleccionados = [];

function init(){    
    $("#componentes-container").html(componentes.map(componente => CardComponente(componente)));

    const dialog = document.getElementById("dialog-armado");
    const dialogConfirmacion = document.getElementById("dialog-armado-confirm");

    setTimeout(() => {
        document.querySelectorAll(".componente__figure").forEach(componente => {
            $(`#${componente.id}`).on("click", function() {
                selectCategoria(componente);
            });
        });
    }, 1000);    

    const confirmButton = document.getElementById("modal-confirm-armado");
    confirmButton.addEventListener("click", () => {
        listaProductosSeleccionados.forEach(element => {
            addProduct(element);        
        });
        dialogConfirmacion.close();

        if(listaProductosSeleccionados.length > 0){
            $("#dialog-content").html("<strong>Proceso finalizado. Se agregaron al carrito los siguientes productos:</strong> \n\n" + listaProductosSeleccionados.map(x => x.title + "\n\n").join(' '));
        }
        else{
            $("#dialog-content").html("No se han encontrado productos seleccionados");
        }
        dialog.showModal();
    });

    const cancelButton = document.getElementById("modal-cancel-armado");
    cancelButton.addEventListener("click", () => {        
        dialogConfirmacion.close();
    });

    const closeButton = document.getElementById("modal-close-armado");
    closeButton.addEventListener("click", () => {        
        dialog.close();
    });
    
    $("#pagination-prev").on("click", async function(){
        offset--;
        listaProductos = await getProductos();
    });

    $("#pagination-next").on("click", async function(){
        offset++;
        listaProductos = await getProductos();
    });

    $("#armado-confirm").on("click", async function(){
        let categoriasVacias = [];
        componentes.forEach(element => {
            if(!$(`#armado-${element.id}`).hasClass("componente__selected")){
                categoriasVacias.push(element);
            }
        });
        if (categoriasVacias.length > 0){
            $("#dialog-content-confirm").html("<strong>¿Desea finalizar el armado con las siguientes categorías sin elementos seleccionados?</strong> \n\n" + categoriasVacias.map(x => " " + x.nombre ));
        }
        else{
            $("#dialog-content-confirm").html("¿Desea finalizar el armado?");
        }    
        dialogConfirmacion.showModal();   

    });
}

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
    let categoriaMultiple = componentes.find(c => c.id == categoriaSelected.id.replace("armado-", ""));
    $("#armado-categoria-container").css("display", "flex");
    $("#pagination-container").css("display", "flex");
    let productosContainer = document.getElementById("armado-categoria-container");
    productosContainer.innerHTML = '';
    console.log(categoriaMultiple);
    productos.forEach(producto =>{ 
        productosContainer.innerHTML += ProductoArmado(producto, categoriaMultiple.multiple);  
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
        $(`#${producto.id}`).removeClass("armado___producto__selected");
        listaProductosSeleccionados = listaProductosSeleccionados.filter(p => p.id != producto.id);

        //si no existe ningun producto seleccionado de la misma categoria, la desmarco
        if(!listaProductosSeleccionados.some(p => p.category_id == categoriaSelected.id.replace("armado-", ""))){
            $(`#${categoriaSelected.id}`).removeClass("componente__selected");
        }
    }
    else{
        if(!$(`#${producto.id}`).hasClass("multiple")){
            listaProductosSeleccionados = listaProductosSeleccionados.filter(p => p.category_id != categoriaSelected.id.replace("armado-", ""));          
            listaProductos.forEach(element => {
                $(`#${element.id}`).removeClass("armado___producto__selected");      
            });
        }
        $(`#${categoriaSelected.id}`).addClass("componente__selected");
        $(`#${producto.id}`).addClass("armado___producto__selected");
        listaProductosSeleccionados.push(producto);
    }
    console.log(producto)
    console.log(listaProductosSeleccionados)
}

function addProduct(producto){
    carritoService.SaveProduct(producto, 1);
}

init();