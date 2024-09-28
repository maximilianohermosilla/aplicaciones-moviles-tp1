export default function ProductoArmado(producto, multiple){
    return `
    <div class="armado__producto ${multiple == true? 'multiple': ''}" id="${producto.id}">
        <div class="armado__img">
            <img cross-origin="use-credentials" id="producto-img-${producto.id}" src="${producto.thumbnail}" class="img__armado">
            <a href="../../pages/producto.html?${producto.id}"/> <img src="../../img/icons/detail_black.png" alt="Detalle icono" width="16" > Detalle</a>
        </div>
        <div class="armado__body">
            <div class="div__body">
                <h5 class="armado__card__title">${producto.title}
            </div>
        </div>
        <div class="armado__precio">
            <div class="armado__span__precio">$ ${(producto.price).toString()}</div>
        </div>
        <div class="armado__close">
            <button class="button__close" id="close_${producto.id}">x</button>
        </div>
        <dialog id="dialog-${producto.id}">
            <div class="dialog__container">
                <p>
                    ¿Está seguro de que desea eliminar el producto?
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