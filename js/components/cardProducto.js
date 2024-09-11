export default function CardProducto(producto){
    return `
    <article class="product__card" id="${producto.id}">
        <div class="product__link">
            <img class="product__img"
                src="${producto.thumbnail}" alt="articulo">
            <div class="product__data">
                <p class="product__name">${producto.title}</p>
                <p class="product__price">$ ${producto.price}</p>
            </div>
        </div>
    </article>
    `;
}