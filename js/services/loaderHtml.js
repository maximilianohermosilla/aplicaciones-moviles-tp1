const loadPages = async (pages) => {
    pages.forEach(element => {
        obtenerHtml(element);
     }); 
}

async function obtenerHtml(element){
    await fetch(element.html)
        .then(response=> response.text())
        .then(text=> document.getElementById(element.into).innerHTML = text);
}

const loaderHtml = { Get: loadPages };

export default loaderHtml;