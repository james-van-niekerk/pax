export default class Router {
    constructor(routes = [], renderNode) {
        this.routes = routes;
        this.renderNode = renderNode;
        this.navigate(location.pathname + location.hash);
        this.renderNode.innerHTML = "Working...";
    }

    match(route, requestPath) {
        return false;
    }

    navigate(path) {
        const route = this.routes.filter(function(route) {
            return this.match(route, path);
        })[0];
        console.log(route);
    }
}