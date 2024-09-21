export default function LinkFilter(item, filter){
    return `<li id="&${filter}=${item.id}" class="nav__link link__filter">${item.name}</li>
    `
}