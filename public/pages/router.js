import { Initial } from "./modules/initial.js";
import { Login } from "./modules/login.js";
import { Register } from "./modules/register.js";


  function createRouter() {
  const routes = {
    "/": Initial,
    "/login": Login,
    "/register": Register,
  };

  function getPage(path) {
    return routes[path]();
  }

  return {
    ...routes,
    getPage,
  };
}
  
  export default createRouter;


  