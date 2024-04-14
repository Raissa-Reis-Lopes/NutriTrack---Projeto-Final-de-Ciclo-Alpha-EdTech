import { Initial } from "./modules/initial.js";
import { Login } from "./modules/login.js";
import { Register } from "./modules/register.js";
import { Calculator } from "./modules/calculator.js";
import { Plan } from "./modules/plan.js";

function router() {
    const routes = {
      "/": Initial,
      "/login": Login,
      "/register": Register,
      "/calculator": Calculator,
      "/plan": Plan,
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


  