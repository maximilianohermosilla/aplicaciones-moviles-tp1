export default function TagFiltro(item){
    return `<li>
        <a id="${item.id}" id="${item.id}" class="tag__filtro">${item.name} 
            <button class="button__close" id="close_${item.id}">x</button>
        </a>
    </li>
    `
}