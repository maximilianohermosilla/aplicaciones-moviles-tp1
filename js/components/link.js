export default function Link(item){
    return `<li>
        <a id="${item.id}" href="../pages/categoria.html?cat=${item.id}" class="nav__link">${item.name}</a>
    </li>
    `
}