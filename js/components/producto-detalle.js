export default function ProductoDetalle(producto){
    return `
        <article class="producto__article">
            <div class="producto__principal">
                <div class="producto__img__container">
                    <img class="producto__img" id="producto-picture"
                        src="${producto.pictures[0].secure_url}" alt="${producto.title}">
                    <div class="section__producto__pictures" id="producto-pictures">    
                        <!-- renderPictures -->
                    </div>
                </div>
                <div class="producto__data">
                    <h3 class="producto__name">${producto.title}</h3>
                    <p class="">${producto.warranty}</p>
                    <p class="producto__price">$ ${producto.price.toLocaleString("es-AR")}</p>
                    <div class="producto__buttons">
                        <button class="button__secondary" id="button-agregar"><img class="button__img" src="../../img/icons/add_cart.png" alt="Agregar icono">Agregar al carrito</button>
                        <button class="button__primary" id="button-compartir"><img class="button__img" src="../../img/icons/share_light.png" alt="Compartir Icono">Compartir</button>
                    </div>
                </div>
            </div>          
        </article>
    `
}