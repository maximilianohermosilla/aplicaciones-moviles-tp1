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
                    <button class="button__secondary button__agregar" id="button_${producto.id}">+</button>
                </div>
            </div>
        </div>
    </article>
    `;
}