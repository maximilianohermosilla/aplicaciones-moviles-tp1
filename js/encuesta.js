import Validator from './utils/validations.js'

let nombre = "";
let apellido = "";
let fechaNacimiento = "";
let sexo = "";
let valoracion = "";
let email = "";
let comentario = "";


initialConfig();

function initialConfig(){
    flatpickr("#inputFechaNacimiento", {
    dateFormat: "d-m-Y",
    maxDate: "today",
    locale: {
        firstDayOfWeek: 1,
        weekdays: {
            shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
            longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],         
        }, 
        months: {
            shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
            longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        },
        },
    });  

    let buttonEnviar = document.getElementById("buttonEnviar");
    buttonEnviar.addEventListener('click', () =>{
        event.preventDefault();
        enviarEncuesta();
    })

    let buttonCancelar = document.getElementById("buttonCancelar");
    buttonCancelar.addEventListener('click', () =>{
        event.preventDefault();
        if (confirm("¿Desea cancelar y volver a la página anterior?") == true) {
            history.back()
        }
    })

    let buttonRestablecer = document.getElementById("buttonRestablecer");
    buttonRestablecer.addEventListener('click', () =>{
        event.preventDefault();
        document.getElementById("form-encuesta").reset();
    })
}

function enviarEncuesta(){
    obtenerValores();
    let error = validarCampos();

    if(error != ""){
        //alert(error);
    }
    else{
        alert(`Datos:
            Nombre: ${nombre}
            Apellido: ${apellido}          
            Fecha de Nacimiento:  ${fechaNacimiento}
            Sexo: ${sexo}
            Valoración: ${valoracion}
            Email: ${email}
            Comentario: ${comentario}`)
    }
}

function obtenerValores(){
    let inputNombre = document.getElementById("inputNombre");
    let inputApellido = document.getElementById("inputApellido");
    let inputFechaNacimiento = document.getElementById("inputFechaNacimiento");
    let inputSexo = document.getElementById("inputSexo");
    let inputValoracion = document.getElementById("inputValoracion");
    let inputEmail = document.getElementById("inputEmail");
    let inputComentario = document.getElementById("inputComentario");

    nombre = inputNombre.value;
    apellido = inputApellido.value;
    fechaNacimiento = inputFechaNacimiento.value;
    sexo = inputSexo.value;
    valoracion = inputValoracion.value;
    email = inputEmail.value;
    comentario = inputComentario.value;
}

function validarCampos(){
    let errores = "";
    let inputNombre = "#inputNombre";
    let inputApellido = "#inputApellido";
    let inputFechaNacimiento = "#inputFechaNacimiento";
    let inputSexo = "#inputSexo";
    let inputEmail = "#inputEmail";

    let errorInputNombreRequired = Validator.ValidarCampoRequerido($(inputNombre).val(), "Nombre");
    let errorInputNombreInvalid = Validator.ValidarCampoCaracteres($(inputNombre).val(), "Nombre");
    let errorInputApellidoRequired = Validator.ValidarCampoRequerido($(inputApellido).val(), "Apellido");
    let errorInputApellidoInvalid = Validator.ValidarCampoCaracteres($(inputApellido).val(), "Apellido");
    let errorInputFechaNacimientoRequired = Validator.ValidarCampoRequerido($(inputFechaNacimiento).val(), "Fecha de Nacimiento");
    let errorInputFechaNacimientoInvalid = Validator.ValidarCampoFecha($(inputFechaNacimiento).val(), "Fecha de Nacimiento");
    let errorInputSexoRequired = Validator.ValidarCampoRequerido($(inputSexo).val(), "Sexo");
    let errorInputSexoInvalid = Validator.ValidarCampoCaracteres($(inputSexo).val(), "Sexo");
    let errorInputEmailRequired = Validator.ValidarCampoRequerido($(inputEmail).val(), "Email");
    let errorInputEmailInvalid = Validator.ValidarCampoEmail($(inputEmail).val(), "Email");

    errores += validarInputError(inputNombre, "required", errorInputNombreRequired);
    errores += validarInputError(inputNombre, "invalid", errorInputNombreInvalid);
    errores += validarInputError(inputApellido, "required", errorInputApellidoRequired);
    errores += validarInputError(inputApellido, "invalid", errorInputApellidoInvalid);
    errores += validarInputError(inputFechaNacimiento, "required", errorInputFechaNacimientoRequired);
    errores += validarInputError(inputFechaNacimiento, "invalid", errorInputFechaNacimientoInvalid);
    errores += validarInputError(inputSexo, "required", errorInputSexoRequired);
    errores += validarInputError(inputSexo, "invalid", errorInputSexoInvalid);
    errores += validarInputError(inputEmail, "required", errorInputEmailRequired);
    errores += validarInputError(inputEmail, "invalid", errorInputEmailInvalid);

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