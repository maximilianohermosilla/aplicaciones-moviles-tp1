export default function RenderHistorial(producto){
    return `
    <div class="historial__producto" id="${producto.id}">
        <div class="historial__img">
            <div class="historial__card__date">${(producto.fecha)} </div>
            <img cross-origin="use-credentials" id="producto-img-${producto.id}" src="${producto.thumbnail}" class="img__historial">
        </div>
        <div class="historial__body">
            <div class="div__body">
                <h5 class="historial__card__title">${producto.title}
            </div>
        </div>
        <div class="historial__precio">
            <div class="historial__span__precio">$ ${(producto.price).toString()}</div>
        </div>
        <div class="historial__close">        
            <button class="button__close" id="close_${producto.id}">x</button>
        </div>
    </div>
    `;
}