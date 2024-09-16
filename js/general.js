import carritoService from './services/carritoService.js'
import apiMercadoLibre from './services/apiMercadoLibre.js'
import loaderHtml from './services/loaderHtml.js'
import Link from './components/link.js'

let categoriaPrincipal = "MLA3794"; // "MLA1648"
let categorias = [];
let pages = [];
let navbarHtml = '../pages/components/header.html';
pages.push({ html: navbarHtml, into: 'header-container'});

const loadHtml = async (pages) => {
    await loaderHtml.Get(pages);
}

const getCategorias = async (categoria) => {
    //categorias = await apiMercadoLibre.GetCode();
    categorias = await apiMercadoLibre.GetCategorias(categoria);

    if(categorias.children_categories){
        let linksOrdenados = categorias.children_categories.sort((a,b) => b.total_items_in_this_category - a.total_items_in_this_category);
        let links = linksOrdenados.map(item => Link(item));
        setTimeout(() => {
            $("#lista-categorias").html(links);
        }, 500);
    }
}

loadHtml(pages);
getCategorias(categoriaPrincipal);

setTimeout(() => {
    $("#button-busqueda").on("click", function(event) {
        event.preventDefault();
        let inputBusqueda = $("#input-busqueda").val();
        window.location.href = `../../pages/productos.html?search=${inputBusqueda}`;        
    }); 

    $("#button-busqueda").on( "keypress", function(event) {
        if (event.which == 13 && !event.shiftKey) {
            let inputBusqueda = $("#input-busqueda").val();
            window.location.href = `../../pages/productos.html?search=${inputBusqueda}`;        
        }
    });

    $("#input-busqueda").on("change", function(e){
        let inputBusqueda = $("#input-busqueda").val();
        window.location.href = `../../pages/productos.html?search=${inputBusqueda}`;        
    });
}, 500);
