function onCardClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            window.location.href = `../../pages/producto.html?${element.id}`;
        })
    });
}

function onButtonClick(elements, callback){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            event.stopPropagation();
            callback(element.id.replace("button_", ''));
        })
    });
}

function onButtonCompartirClick(elements, callback){
    elements.forEach((element) => {
        element.addEventListener('click', () =>{
            event.stopPropagation();
            window.location.href = `../../pages/compartir.html?${element.id.replace("button_compartir_", "")}`;
        })
    });
}

const productoService = {
    OnCardClick: onCardClick,
    OnButtonClick: onButtonClick,
    OnButtonCompartirClick: onButtonCompartirClick
};

export default productoService;


