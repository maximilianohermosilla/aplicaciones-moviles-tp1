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
        //si existen productos seleccionados, los envío al carrito
        if(listaProductosSeleccionados.length > 0){
            listaProductosSeleccionados.forEach(element => {
                addProduct(element);        
            });
            dialogConfirmacion.close();
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
            $("#dialog-content-confirm").html("<strong>¿Desea finalizar el armado con las siguientes categorías sin elementos seleccionados?</strong> \n\n" 
                + categoriasVacias.map(x => " " + x.nombre ));
        }
        else{
            $("#dialog-content-confirm").html("¿Desea finalizar el armado?");
        }    
        dialogConfirmacion.showModal();   

    });
}

function selectCategoria(categoria){
    categoriaSelected = categoria;

    componentes.forEach(element => {
        $(`#armado-${element.id}`).removeClass("componente__active");
    });

    $(`#${categoria.id}`).addClass("componente__active");

    getProductos();
}

const getProductos = async () => {
    let productos = await apiMercadoLibre.GetItems(categoriaSelected.id.replace("armado-", ""), "", 10, offset*10, filters);
    setTimeout(() => {
        let disabledButton = offset == 0? "disabled": "";
        $("#armado-categoria-title").html(categoriaSelected.nombre);
        $("#pagination-prev").prop("disabled", disabledButton);
        listaProductos = productos.results;
        renderProductos(productos.results);
        window.scrollTo(0, 0);
    }, 100);   
}

async function renderProductos(productos){
    let categoriaObjeto = componentes.find(c => c.id == categoriaSelected.id.replace("armado-", ""));
    $("#armado-categoria-container").css("display", "flex");
    $("#pagination-container").css("display", "flex");
    $("#pagination-offset").html((offset + 1).toString())

    let productosContainer = document.getElementById("armado-categoria-container");
    productosContainer.innerHTML = '';

    productos.forEach(producto =>{ 
        productosContainer.innerHTML += ProductoArmado(producto, categoriaObjeto.multiple);  
        if(listaProductosSeleccionados.some(p => p.id == producto.id)){
            $(`#${producto.id}`).addClass("armado___producto__selected");
        }      
    })

    productos.forEach(producto =>{    
        $(`#${producto.id}`).on("click", function() {
            selectProduct(producto);
        });
    });
}

function selectProduct(producto){
    //verifico si el producto ya fue seleccionado anteriormente
    if($(`#${producto.id}`).hasClass("armado___producto__selected")){
        $(`#${producto.id}`).removeClass("armado___producto__selected");
        listaProductosSeleccionados = listaProductosSeleccionados.filter(p => p.id != producto.id);

        //si no existe ningun producto seleccionado de la misma categoria, la desmarco
        if(!listaProductosSeleccionados.some(p => p.category_id == categoriaSelected.id.replace("armado-", ""))){
            $(`#${categoriaSelected.id}`).removeClass("componente__selected");
        }
    }
    else{
        //el producto debe ser único, elimino el resto dentro de la misma categoría
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
}

function addProduct(producto){
    carritoService.SaveProduct(producto, 1);
}

init();