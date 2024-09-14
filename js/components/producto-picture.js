export default function ProductoPicture(picture){
    return `<img class="producto__picture" src="${picture.secure_url}" alt="${picture.id}" />
    `
}