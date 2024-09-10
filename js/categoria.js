import apiMercadoLibre from './services/apiMercadoLibre.js'

let categoriaParam = getParametroCategoria();
getProductosCategoria(categoriaParam);

function getParamsFromHref(){
    let href = window.location.href;
    return href.split('?')[1];
}

function getParametroCategoria(){
    let parametros = getParamsFromHref();
    if(parametros != undefined && parametros != ""){
        return parametros.replace("cat=", "");
    }
    else{
        return "";
    }
}

async function getProductosCategoria(categoria){
    if(categoria != ""){
        let itemsPorCategoria = await apiMercadoLibre.Get(categoria);
        let itemsId = itemsPorCategoria.results.map((item) => item.id);
        console.log(itemsPorCategoria);
        //let itemsDetalle = await apiMercadoLibre.GetItems(itemsId);

        // let itemsFiltrados = itemsDetalle.map((item) => item.body);
        // let itemsResult = itemsFiltrados.map( ({title, price, pictures}) => ({title, price, pictures}));                
        // console.log(itemsResult);

        // itemsResult.forEach(element => {
        //     //downloadImage(element.pictures[0].secure_url, element.title);
        //     console.log(element)
        // });
    }

    
}
