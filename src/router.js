class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;

    console.log("Router Created");
    console.log("Current URL:", window.location.pathname);
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
    console.log(`Route added: ${path}`);
    console.log("Current routes:", Object.keys(this.routes));
  }
}

export const router = new Router();

console.log("Router instance:", router);
