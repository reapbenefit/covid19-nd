export class Routes {

    private routes = {
        getUserDetailsFromKeycloak: '/api/v1/user/data/read'
      };

getRoutes() {
    return {...this.routes};
    }

getRouteByKey(key) {
    const route = this.routes[key];
    if (!!route) {
        return route;
    } else {
        return null;
    }
    }
}
