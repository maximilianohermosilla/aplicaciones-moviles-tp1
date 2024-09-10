
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
        alert(error);
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
    let fechaValidada = Date.parse(input.split('-').reverse().join('-'));

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