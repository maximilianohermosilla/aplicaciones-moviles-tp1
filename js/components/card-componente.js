export default function CardComponente(componente){
    return `
        <figure id="armado-${componente.id}" class="componente__figure">
            <img src="${componente.imagen}" alt="Icono ${componente.nombre}" class="componente__img"/>
            <figcaption class="componente__caption">${componente.nombre}</figcaption>
        </figure>
    `;
}