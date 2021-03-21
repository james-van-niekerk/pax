#! /usr/bin/env node

// Hand made router will help keep complexity down
//   We dont use frameworks where I come from
export default class Route {
    constructor(route, path, handler) {
        this.route = route;
        this.path = path;
        this.handler = handler;
        this.props = {};
    }

    setProps(newProps) {
        this.props = newProps;
    }

    handle() {
        return this.handler(this.props);
    }
};
