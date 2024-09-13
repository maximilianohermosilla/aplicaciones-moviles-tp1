import carritoService from './services/carritoService.js'
import loaderHtml from './services/loaderHtml.js'


let pages = [];
let navbarHtml = '../pages/components/header.html';
pages.push({ html: navbarHtml, into: 'header-container'});

const loadHtml = async (pages) => {
    await loaderHtml.Get(pages);
}

loadHtml(pages);

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

    // $('#button-busqueda').live("submit", function() {        
    //     e.preventDefault();
    //     let inputBusqueda = $("#input-busqueda").val();
    //     window.location.href = `../../pages/productos.html?search=${inputBusqueda}`;        
    // });
}, 500);
