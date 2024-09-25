
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
        return `El campo ${nombre} solo acepta caracteres de la “a-z” y “A-Z”.\n`;
    }
    else{
        return "";
    }
}

function validarCampoFecha(input, nombre){
    let fechaValidada = Date.parse(input.split('-').reverse().join('-'));

    if(input != "" && isNaN(fechaValidada)){
        return `El campo ${nombre} no contiene una fecha válida con formato DD-MM-AAAA.\n`;
    }
    else{
        return "";
    }
}

function validarCampoEmail(input, nombre){
    var re = /\S+@\S+\.\S+/;
    if(input != "" && !re.test(input)){
        return `El campo ${nombre} no contiene una dirección de correo válida.\n`;
    }
    else{
        return "";
    }
}


const Validator = {
    ValidarCampoRequerido: validarCampoRequerido,
    ValidarCampoCaracteres: validarCampoCaracteres,
    ValidarCampoFecha: validarCampoFecha,
    ValidarCampoEmail: validarCampoEmail
};

export default Validator;

