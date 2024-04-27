import createRouter from "./pages/router.js";

const router = createRouter();

window.addEventListener('onstatechange', (event) => {
    const path = event.detail.path;

    const page = router.getPage(path);

    history.pushState({}, '', path);

    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(page);
});

const initalPath =  window.location.pathname;
const initialPage = router.getPage(initalPath);
document.getElementById("root").appendChild(initialPage);


window.addEventListener('popstate', () => {
    // Obtém o novo path após a mudança de estado
    const newPath = window.location.pathname; 
    console.log('Novo path:', newPath);
    
    const page = router.getPage(newPath); 
    
    // Atualiza a página renderizando o conteúdo da nova página
    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(page);
});

