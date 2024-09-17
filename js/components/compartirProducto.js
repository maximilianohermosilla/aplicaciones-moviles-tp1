export default function RenderCompartirProducto(producto){
    return `
    <div class="compartir__producto">
        <div class="compartir__img">
            <img cross-origin="use-credentials" id="producto-img-${producto.id}" src="${producto.thumbnail}" class="img__compartir">
        </div>
        <div class="compartir__body">
            <div class="div__body">
                <h5 class="compartir__card__title">${producto.title}
            </div>
        </div>

        <div class="compartir__precio">
            <div class="compartir__span__precio">$ ${(producto.price).toLocaleString("es-AR")}</div>
        </div>   
    </div>
    `;
}