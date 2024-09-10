import apiMercadoLibre from './apiMercadoLibre.js'

console.log("main.js iniciado")
async function getItemsPorCategoria(categoria){
    let itemsPorCategoria = await apiMercadoLibre.Get(categoria);
    //let itemsFiltrados = itemsPorCategoria.results.map(( {title,price, } ) =>  ({title,price}) )
    let itemsId = itemsPorCategoria.results.map((item) => item.id);
    let itemsDetalle = await apiMercadoLibre.GetItems(itemsId);
    //console.log(itemsDetalle);

    let itemsFiltrados = itemsDetalle.map((item) => item.body);
    let itemsResult = itemsFiltrados.map( ({title, price, pictures}) => ({title, price, pictures}))
    // console.log(itemsPorCategoria.results);
    
    console.log(itemsResult);

    itemsResult.forEach(element => {
        downloadImage(element.pictures[0].secure_url, element.title);
    });

    
}

async function downloadImage(imageSrc, imageName) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)  
    const link = document.createElement('a')
    link.href = imageURL
    link.download = imageName;
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

getItemsPorCategoria("MLA430687");
setTimeout(() => {
    getItemsPorCategoria("MLA430598");    
}, 1000);
setTimeout(() => {
    getItemsPorCategoria("MLA454379");    
}, 1000);
setTimeout(() => {
    getItemsPorCategoria("MLA1656");    
}, 1000);