export default function RenderCarrito(producto){
    return `
    <div class="carrito__producto" id="${producto.id}">
        <div class="carrito__img">
            <div class="carrito__card__title">${(producto.cantidad)} x </div>
            <img cross-origin="use-credentials" id="producto-img-${producto.id}" src="${producto.thumbnail}" class="img__carrito">
        </div>
        <div class="carrito__body">
            <div class="div__body">
                <h5 class="carrito__card__title">${producto.title}
            </div>
        </div>
        <div class="carrito__precio">
            <div class="carrito__span__precio">$ ${(producto.price * producto.cantidad).toLocaleString("es-AR")}</div>
        </div>  
        <div class="carrito__close">        
            <button class="button__close" id="close_${producto.id}">x</button>
        </div> 
    </div>
    `;
}