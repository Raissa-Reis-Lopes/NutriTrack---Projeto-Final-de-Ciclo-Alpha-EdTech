import { Initial } from "./modules/initial.js";
import { Login } from "./modules/login.js";
import { Register } from "./modules/register.js";

function router() {
    const routes = {
      "/": Initial,
      "/login": Login,
      "/register": Register,

      getPage: function (url) {
        return this[url];
    },

    };
  
    return routes
  }
  
  export default router;


  