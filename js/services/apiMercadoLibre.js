let url = 'https://api.mercadolibre.com'

let listaItems = [];
let JwtToken = "APP_USR-5464777943433994-090121-b75a161d311b6c056727e92c4ce497fa-94045593";

const getItemsPorCategoria = async(categoria) => {
    let urlItemsPorCategoria = `${url}/sites/MLA/search?category=${categoria}&limit=10&offset=0`;
    let response = await fetch(urlItemsPorCategoria, {});
    if(response.ok){
        listaItems = await response.json();
    }  
    return listaItems;
}

const getItemsPorId= async(listaId) => {
    let ids = listaId.join(",");
    console.log(ids);
    let urlItemsPorId = `${url}/items?ids=${ids}`;
    let response = await fetch(urlItemsPorId, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JwtToken}`
        }
    })
    if(response.ok){
        listaItems = await response.json();
    }  
    return listaItems;
}

const apiMercadoLibre = { Get: getItemsPorCategoria, GetItems: getItemsPorId };

export default apiMercadoLibre;