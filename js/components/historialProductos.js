export default function RenderHistorial(producto){
    return `
    <div class="historial__producto" id="${producto.id}">
        <div class="historial__img">
            <div class="historial__card__date">${(producto.fecha)}</div>
            <img cross-origin="use-credentials" id="producto-img-${producto.id}" src="${producto.thumbnail}" class="img__historial">
            <a href="../../pages/producto.html?${producto.id}"/> <img src="../../img/icons/detail_black.png" alt="Detalle icono" width="16" > Detalle</a>
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
        <dialog id="dialog-${producto.id}">
            <div class="dialog__container">
                <p>
                    ¿Está seguro de que desea eliminar el producto del historial?
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