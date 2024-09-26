export default function RenderCarrito(producto){
    return `
    <div class="carrito__producto" id="${producto.id}">
        <div class="carrito__img">
            <div class="carrito__card__title">${(producto.cantidad)} x </div>
            <img cross-origin="use-credentials" id="producto-img-${producto.id}" src="${producto.thumbnail}" class="img__carrito">
            <a href="../../pages/producto.html?${producto.id}"/> <img src="../../img/icons/detail_black.png" alt="Detalle icono" width="16" > Detalle</a>
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
        <dialog id="dialog-${producto.id}">
            <div class="dialog__container">
                <p>
                    ¿Está seguro de que desea quitar el producto del carrito?
                </p>
                <div class="container__center">
                    <button class="button__danger" id="modal-cancel-${producto.id}">Cancelar</button>
                    <button class="button__secondary" id="modal-confirm-${producto.id}">Confirmar</button>
                </div>
            </div>
        </dialog>
    </div>
    `;
}