import { Initial } from "./modules/initial.js";
import { Login } from "./modules/login.js";
import { Register } from "./modules/register.js";
import { Home } from "./modules/home.js";
import { History } from "./modules/history.js";
import { Profile } from "./modules/profile.js";

function router() {
    const routes = {
      "/": Initial,
      "/login": Login,
      "/register": Register,
      "/home": Home,
      "/history": History,
      "/Profile": Profile,
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


  