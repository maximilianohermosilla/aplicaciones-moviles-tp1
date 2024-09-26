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
    
    if(parametros != undefined && parametros != ""){
        return parametros.split('&')[0];
    }
    else{
        return "";
    }
}

const getProducto = async (param) => {
    producto = await apiMercadoLibre.GetItemPorId(param);
    
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

    const dialog = document.getElementById("dialog-back");
    const cancelButton = document.getElementById("modal-cancel-back");
    const confirmButton = document.getElementById("modal-confirm-back");
    
    confirmButton.addEventListener("click", () => {
        history.back()
    });
    
    cancelButton.addEventListener("click", () => {        
        dialog.close();
    });
    
    let buttonEnviar = document.getElementById("compartir-enviar");
    buttonEnviar.addEventListener('click', () =>{
        event.preventDefault();
        enviar();
    })

    let buttonCancelar = document.getElementById("compartir-cancelar");
    buttonCancelar.addEventListener('click', () =>{
        event.preventDefault();
        dialog.showModal();       
    })
}

function renderNotFound(){
    $("#compartir-title").html("No se encontraron resultados");
    $("#compartir-container").css("display", "none");
    $("#compartir-acciones").css("display", "none");
}


function validarCampos(){
    let errores = "";
    let inputEmisor = "#inputEmailEmisor"
    let inputDestino = "#inputEmailDestino"

    let errorEmailEmisorRequired = Validator.ValidarCampoRequerido($(inputEmisor).val(), "Email Emisor");
    let errorEmailEmisorInvalid = Validator.ValidarCampoEmail($(inputEmisor).val(), "Email Emisor");    
    let errorEmailDestinoRequired = Validator.ValidarCampoRequerido($(inputDestino).val(), "Email Destino");
    let errorEmailDestinoInvalid = Validator.ValidarCampoEmail($(inputDestino).val(), "Email Destino");

    errores += validarInputError(inputEmisor, "required", errorEmailEmisorRequired);
    errores += validarInputError(inputEmisor, "invalid", errorEmailEmisorInvalid);
    errores += validarInputError(inputDestino, "required", errorEmailDestinoRequired);
    errores += validarInputError(inputDestino, "invalid", errorEmailDestinoInvalid);

    return errores;
}

function validarInputError(input, type, message){
    let inputError = `${input}-${type}`;

    if(message != ""){
        $(inputError).html(message);
        $(inputError).css("display", "block");
    }
    else{
        $(inputError).html("");
        $(inputError).css("display", "none");
    }
    
    return message;
}

function enviar(){
    let error = validarCampos();
    
    if(error != ""){
        //alert(error);
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