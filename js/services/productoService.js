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

const productoService = {
    OnCardClick: onCardClick,
    OnButtonClick: onButtonClick
};

export default productoService;


