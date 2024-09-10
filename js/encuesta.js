
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
}


function enviarEncuesta(){
    obtenerValores();
    let error = validarCampos();

    if(error != ""){
        alert(error);
    }
    else{
        alert(`Datos:
            Nombre: ${nombre}\n
            Apellido: ${apellido}\n            
            Fecha de Nacimiento:  ${fechaNacimiento}\n
            Sexo: ${sexo}\n
            Valoración: ${valoracion}\n
            Email: ${email}\n
            Comentario: ${comentario}\n`)
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

    errores += validarCampoRequerido(nombre, "Nombre");
    errores += validarCampoCaracteres(nombre, "Nombre");

    errores += validarCampoRequerido(apellido, "Apellido");
    errores += validarCampoCaracteres(apellido, "Apellido");

    errores += validarCampoRequerido(fechaNacimiento, "Fecha de Nacimiento");
    errores += validarCampoFecha(fechaNacimiento, "Fecha de Nacimiento");

    errores += validarCampoRequerido(sexo, "Sexo");

    errores += validarCampoRequerido(valoracion, "Valoración");

    errores += validarCampoRequerido(email, "Email");
    errores += validarCampoEmail(email, "Email");

    return errores;
}

function validarCampoRequerido(input, nombre){
    if(input == ""){
        return `El campo ${nombre} es obligatorio\n`;
    }
    else{
        return "";
    }
}

function validarCampoCaracteres(input, nombre){
    if (!/^[a-zA-Z]*$/g.test(input)){
        return `El campo ${nombre} solo acepta caracteres de la “a-z” y “A-Z”\n`;
    }
    else{
        return "";
    }
}


function validarCampoFecha(input, nombre){
    let fechaValidada = Date.parse(input);

    if(isNaN(fechaValidada)){
        return `El campo ${nombre} no contiene una fecha válida con formato DD-MM-AAAA\n`;
    }
    else{
        return "";
    }
}

function validarCampoEmail(input, nombre){
    var re = /\S+@\S+\.\S+/;
    if(!re.test(input)){
        return `El campo ${nombre} no contiene una dirección de correo válida\n`;
    }
    else{
        return "";
    }
}