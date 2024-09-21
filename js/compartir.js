import apiMercadoLibre from './services/apiMercadoLibre.js'
import RenderCompartirProducto from './components/compartirProducto.js'
import Validator from './utils/validations.js'

let productoId = "";
let producto;

function getParamsFromHref(){
    let href = window.location.href;
    return href.split('?')[1];
}

function getParametro(){
    let parametros = getParamsFromHref();
    console.log(parametros)
    if(parametros != undefined && parametros != ""){
        return parametros.split('&')[0];
    }
    else{
        return "";
    }
}

const getProducto = async (param) => {
    producto = await apiMercadoLibre.GetItemPorId(param);
    console.log(producto)
    setTimeout(() => {
        //renderProducto(producto);
    }, 100);   
}

function init(){
    //getProductosCategoria(categoriaParam);
    productoId = getParametro();
    if(productoId == ""){
        renderNotFound();
    }
    else{
        producto = getProducto(productoId);
        setTimeout(() => {
            console.log(producto)
            if(producto == undefined){
                renderNotFound();
            }  
            else{
                renderProductoCompartir(producto);
            }          
        }, 500);
    }
}


async function renderProductoCompartir(producto){
    $("#compartir-title").html("Compartir con un amigo");
    let productoContainer = document.getElementById("compartir-container");
    productoContainer.innerHTML = RenderCompartirProducto(producto);
    
    let buttonEnviar = document.getElementById("compartir-enviar");
    buttonEnviar.addEventListener('click', () =>{
        event.preventDefault();
        enviar();
    })

    let buttonCancelar = document.getElementById("compartir-cancelar");
    buttonCancelar.addEventListener('click', () =>{
        event.preventDefault();
        if (confirm("¿Desea cancelar y volver a la página anterior?") == true) {
            history.back()
        }
    })
}

function renderNotFound(){
    $("#compartir-title").html("No se encontraron resultados");
    $("#compartir-container").css("display", "none");
    $("#compartir-acciones").css("display", "none");
}


function validarCampos(){
    let errores = "";

    errores += Validator.ValidarCampoRequerido($("#inputEmailEmisor").val(), "Email Emisor");
    errores += Validator.ValidarCampoEmail($("#inputEmailEmisor").val(), "Email Emisor");    
    errores += Validator.ValidarCampoRequerido($("#inputEmailDestino").val(), "Email Destino");
    errores += Validator.ValidarCampoEmail($("#inputEmailDestino").val(), "Email Destino");

    return errores;
}

function enviar(){
    let error = validarCampos();

    if(error != ""){
        alert(error);
    }
    else{
        let urlEnviar = `mailto:${$("#inputEmailDestino").val()}?subject=Producto%20compartido%20desde%20UNAJ%20PC%20Store
                        &body=Mensaje: ${$("#inputComentario").val()}
                        %0D%0A
                        Emisor: ${$("#inputEmailEmisor").val()}
                        %0D%0A
                        Producto: ${producto.title}
                        %0D%0A
                        Precio: $ ${producto.price}
                        %0D%0A
                        `;
        window.location.href = urlEnviar;
    }
}

init();