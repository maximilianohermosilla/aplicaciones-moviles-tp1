import apiMercadoLibre from './services/apiMercadoLibre.js'
import carritoService from './services/carritoService.js'
import productoService from './services/productoService.js'
import CardProducto from './components/cardProducto.js'
import LinkFilter from './components/link-filter.js'
import TagFiltro from './components/tagFiltro.js'

let categoriaPrincipal = 'MLA1648';
let carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
let busquedaParam = "";
let filters = "";
let offset = 0;
let filtrosSeleccionados = [];
let listaProductos;

const getProductos = async (param) => {
    let productos = await apiMercadoLibre.GetItems(categoriaPrincipal, param, 10, offset*10, filters);
    console.log(productos)
    setTimeout(() => {
        let disabledButton = offset == 0? "disabled": "";
        $("#pagination-prev").prop("disabled", disabledButton);
        listaProductos = productos.results;
        renderProductos(productos.results);
        getFilters(productos);
        $("#productos-title").html("Resultados para: " + busquedaParam.replaceAll("%20", " "));
        $("#input-busqueda").val(busquedaParam.replaceAll("%20", " "));
        if(filtrosSeleccionados.length > 0){
            $("#productos-filters").html("Filtros: " + filtrosSeleccionados.map(x => " " + TagFiltro(x)).join(' '));

            setTimeout(() => {
                document.querySelectorAll(".tag__filtro").forEach(element => {
                    element.addEventListener("click", function() {
                        console.log(element.id);
                        onFilterRemove(element);
                    })
                });
            }, 500);
        }
        console.log(listaProductos)
        renderAds();
        window.scrollTo(0, 0);

    }, 100);   
}

function getParamsFromHref(){
    let href = window.location.href;
    return href.split('?')[1];
}

function getParametroBusqueda(){
    let parametros = getParamsFromHref();
    console.log(parametros)
    
    let parametrosSplitted = parametros.split('&');
    console.log(parametrosSplitted)

    if (parametrosSplitted.length > 1){
        let parametroBusqueda = "";
        parametrosSplitted.forEach(element => {
            console.log(element)
            if(!element.includes("search")){  
                filters += `&${element}`;
                //filtrosSeleccionados.push(element.split('=')[1]);

                console.log(filters)
                console.log(filtrosSeleccionados)
            }else{
                parametroBusqueda = element.replace("search=", "");
            }
        });

        console.log(parametroBusqueda)
        return parametroBusqueda;
    }
    else{
        if(parametros != undefined && parametros != ""){
            if(parametros.includes("search")){
                return parametros.replace("search=", "");
            }
        }
        else{
            return "";
        }
    }
    
}

async function init(){
    busquedaParam = getParametroBusqueda();
    console.log(busquedaParam)
    listaProductos = await getProductos(busquedaParam);


    $("#pagination-prev").on("click", async function(){
        offset--;
        listaProductos = await getProductos(busquedaParam);
    });
    
    $("#pagination-next").on("click", async function(){
        offset++;
        listaProductos = await getProductos(busquedaParam);
    });
}

async function renderProductos(productos){
    //console.log(productos)
    let productosContainer = document.getElementById("productos-container");
    productosContainer.innerHTML = '';
    productos.forEach(producto =>{ 
        productosContainer.innerHTML += CardProducto(producto);
        //getProductoEnCarrito(producto);
    })  
    productoService.OnCardClick(document.querySelectorAll(".product__card"));
    productoService.OnButtonClick(document.querySelectorAll(".button__agregar"), addProduct);
    productoService.OnButtonCompartirClick(document.querySelectorAll(".button__compartir"));
    $("#pagination-offset").html((offset + 1).toString())
}

function getProductoEnCarrito(product){
    carritoStorage = localStorage.getItem("productos")? JSON.parse(localStorage.getItem("productos")): [];
    const repeat = carritoStorage.some((repeatProduct) => repeatProduct.id == product.id);
    if(repeat){
        let articleId = `#${product.id.toString()}`;
        $(articleId).addClass("product__card__selected");
    }
}

function addProduct(id){
    const product = listaProductos.find((element) => id == element.id);  
    carritoService.SaveProduct(product, 1);
}

function getFilters(productos){
    $("#filter-category-title").html("")    
    $("#filter-category").html("");
    $("#filter-brand-title").html("")    
    $("#filter-brand").html("");
    $("#filter-price-title").html("")    
    $("#filter-price").html("");
    if(productos.available_filters && productos.available_filters.length > 0){
        let categoryFilter = productos.available_filters.find(x => x.id == "category");
        let brandFilter = productos.available_filters.find(x => x.id == "BRAND");
        let priceFilter = productos.available_filters.find(x => x.id == "price");

        console.log(categoryFilter)
        console.log(brandFilter)
        console.log(priceFilter)

        if(categoryFilter){
            $("#filter-category-title").html(categoryFilter.name + ` <img src="../img/icons/down-arrow-dark.png" width="12" alt="Down Arrow">`)
            let linksOrdenados = categoryFilter.values.slice(0, 10);
            let links = linksOrdenados.map(item => LinkFilter(item, categoryFilter.id));
            setTimeout(() => {
                $("#filter-category").html(links);
                $("#filter-category-container").css("display", "flex");
                $("#filter-category-container").unbind("click")
                $("#filter-category-container").click(function () {
                    event.stopPropagation();
                    if($("#filter-category-container").hasClass("filters__mobile__active")){
                        $(this).removeClass("filters__mobile__active");   
                    }
                    else{
                        $(this).addClass("filters__mobile__active");
                    }
                });
            }, 500);
        }
        else{
            $("#filter-category-container").css("display", "none");
        }
        
        if(brandFilter){
            $("#filter-brand-title").html(brandFilter.name + ` <img src="../img/icons/down-arrow-dark.png" width="12" alt="Down Arrow">`)
            let linksOrdenados = brandFilter.values.slice(0, 10);
            let links = linksOrdenados.map(item => LinkFilter(item, brandFilter.id));
            setTimeout(() => {
                $("#filter-brand").html(links);
                $("#filter-brand-container").css("display", "flex");
                $("#filter-brand-container").unbind("click")
                $("#filter-brand-container").click(function () {
                    event.stopPropagation();
                    if($("#filter-brand-container").hasClass("filters__mobile__active")){
                        $(this).removeClass("filters__mobile__active");   
                    }
                    else{
                        $(this).addClass("filters__mobile__active");
                    }
                });
                }, 500);
        }
        else{
            $("#filter-brand-container").css("display", "none");
        }
        
        if(priceFilter){
            $("#filter-price-title").html(priceFilter.name + ` <img src="../img/icons/down-arrow-dark.png" width="12" alt="Down Arrow">`)
            let linksOrdenados = priceFilter.values.slice(0, 10);
            let links = linksOrdenados.map(item => LinkFilter(item, priceFilter.id));
            setTimeout(() => {
                $("#filter-price").html(links);
                $("#filter-price-container").css("display", "flex");
                $("#filter-price-container").unbind("click")
                $("#filter-price-container").click(function () {
                    event.stopPropagation();
                    if($("#filter-price-container").hasClass("filters__mobile__active")){
                        $(this).removeClass("filters__mobile__active");   
                    }
                    else{
                        $(this).addClass("filters__mobile__active");
                    }
                });
            }, 500);
        }
        else{
            $("#filter-category-container").css("display", "none");
        price}

        setTimeout(() => {
            onFilterClick(document.querySelectorAll(".link__filter"));
        }, 1000);
    }
}

function onFilterClick(elements){
    elements.forEach((element) => {
        element.addEventListener('click', async () =>{            
            filters += element.id;
            filtrosSeleccionados.push({ id: element.id, name: element.innerHTML })
            //console.log(filters)
            console.log(filtrosSeleccionados)
            listaProductos = await getProductos(busquedaParam);    
        })
    });
}

function onFilterRemove(element){
    filters = filters.replace(element.id, "");
    filtrosSeleccionados = filtrosSeleccionados.filter(filter => filter.id != element.id);
    if(filtrosSeleccionados.length == 0){
        $("#productos-filters").html("");
    }
    listaProductos = getProductos(busquedaParam);
}

function renderAds(){
    $("#productos-ads").html("<img src='../../img/publicidad/ad_samsung.jpeg' /> <img src='../../img/publicidad/ad_bosch.jpeg' />");
}

init();
