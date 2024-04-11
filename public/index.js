import createRouter from "./pages/router.js";

const router = createRouter();

window.addEventListener('onstatechange', (event) => {
    const path = event.detail.path;

    const page = router.getPage(path);

    history.pushState({}, '', path);

    document.getElementById("root").innerHTML = '';
    document.getElementById("root").appendChild(page);
});

const initalPath = '/';
const initialPage = router.getPage(initalPath);
document.getElementById("root").appendChild(initialPage);