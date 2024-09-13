import carritoService from './services/carritoService.js'
import loaderHtml from './services/loaderHtml.js'

let pages = [];

let navbarHtml = '../pages/components/header.html';
pages.push({ html: navbarHtml, into: 'header-container'});

const loadHtml = async (pages) => {
    await loaderHtml.Get(pages);
}

loadHtml(pages);