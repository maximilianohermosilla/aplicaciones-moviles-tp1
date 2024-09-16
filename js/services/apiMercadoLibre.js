let url = 'https://api.mercadolibre.com'

let listaItems = [];
//let JwtToken = "APP_USR-5464777943433994-090121-b75a161d311b6c056727e92c4ce497fa-94045593";

const getCode = async() => {
    //categoria = "MLA3794";
    let urlCode = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=5464777943433994&redirect_uri=https://mayi-beer-collection.web.app/`;
    let response = await fetch(urlCode, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
            'Access-Control-Allow-Credentials': 'true'
        }),
    })
    if(response.ok){
        let responseJson = await response.json();        
        console.log(responseJson)
    }  
    console.log(response)
    return listaItems;
}

const getCategorias = async(categoria) => {
    //categoria = "MLA3794";
    let urlCategorias = `${url}/categories/${categoria}`;
    let response = await fetch(urlCategorias, {});
    if(response.ok){
        listaItems = await response.json();        
    }  
    return listaItems;
}

const getItemsPorCategoria = async(categoria, limit = '10', offset = 0) => {
    let urlItemsPorCategoria = `${url}/sites/MLA/search?category=${categoria}&limit=${limit}&offset=${offset}`;
    let response = await fetch(urlItemsPorCategoria, {});
    if(response.ok){
        listaItems = await response.json();
    }  
    return listaItems;
}

const getItems= async(categoria = 'MLA1648', parametro, limit = '10', offset = 0, filter = "") => {    
    let urlItems = `${url}/sites/MLA/search?category=${categoria}&q=${parametro}&limit=${limit}&offset=${offset}${filter}`;
    //console.log(urlItems)
    let response = await fetch(urlItems, {})
    if(response.ok){
        listaItems = await response.json();
    }  
    return listaItems;
}

const getItemPorId= async(id) => {
    let producto;
    let urlItemsPorId = `${url}/items/${id}`;
    let response = await fetch(urlItemsPorId, {});

    if(response.ok){
        producto = await response.json();
    }  
    return producto;
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

const apiMercadoLibre = { Get: getItemsPorCategoria, GetCategorias: getCategorias, GetItems: getItems, GetItemPorId: getItemPorId, GetCode: getCode };

export default apiMercadoLibre;