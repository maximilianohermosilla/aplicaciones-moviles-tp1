export default function ProductoAtributo(atributo){
    return `<div class="atributo__container" id="${atributo.id}">
                <p class="atributo__name">${atributo.name}: </p>
                <p class="atributo__value">${atributo.value_name}</p>
            </div>
    `
}