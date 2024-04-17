import { Initial } from "./modules/initial.js";
import { Login } from "./modules/login.js";
import { Register } from "./modules/register.js";
import { Home } from "./modules/home.js";

function router() {
    const routes = {
      "/": Initial,
      "/login": Login,
      "/register": Register,
      "/home": Home,
    };
  
    function getPage(path) {
      return routes[path]();
    }

    return {
      ...routes,
      getPage,
    };
}

  export default router;


  