export default function CardProducto(producto){
    return `
    <article class="product__card" id="${producto.id}">
        <div class="product__link">
            <img class="product__img"
                src="${producto.thumbnail}" alt="articulo">
            <div class="product__data">
                <p class="product__name">${producto.title}</p>
                <div class="product__footer">
                    <p class="product__price">$ ${producto.price.toLocaleString("es-AR")}</p>
                    <div>
                        <button class="button__primary button__compartir" id="button_compartir_${producto.id}"><img class="img__busqueda" src="../../img/icons/share_light.png" alt="Compartir Icono"></button>
                        <button class="button__secondary button__agregar" id="button_${producto.id}"><img class="img__busqueda" src="../../img/icons/add_cart.png" alt="Agregar icono"></button>
                    </div>
                </div>
            </div>
        </div>
    </article>
    `;
}