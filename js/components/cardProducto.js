export default function CardProducto(producto){
    `
    <article class="product__card">
        <div class="product__link">
            <img class="product__img"
                src="${producto.pictures[0].secure_url}" alt="articulo">
            <div class="product__data">
                <p class="product__name">${producto.title}</p>
                <p class="product__price">$ ${producto.price}</p>
            </div>
        </div>
    </article>
    `
}