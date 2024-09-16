export default function ProductoDetalle(producto){
    return `
        <article class="producto__article">
            <div class="producto__principal">
                <div class="producto__img__container">
                    <img class="producto__img"
                        src="${producto.pictures[0].secure_url}" alt="${producto.title}">
                    <div class="section__producto__pictures" id="producto-pictures">    
                        <!-- renderPictures -->
                    </div>
                </div>
                <div class="producto__data">
                    <h3 class="producto__name">${producto.title}</h3>
                    <p class="">${producto.warranty}</p>
                    <p class="producto__price">$ ${producto.price.toLocaleString("es-AR")}</p>
                    <button class="button__primary">Agregar</button>
                </div>
            </div>
          
        </article>
    `
}