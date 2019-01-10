import http from 'http';
import RelayQueue from './runner-queue';
import RootRouter from './router';
import { urlParser } from './helpers';

class Relay extends Function {
  constructor(serverId) {
    super();
    this.serverId = serverId;
    this.globalRunners = [];
    this.availableRoutes = [];
    this.notFoundRunner = ({req, res}) => res.end('Not found');
    return this.makeCallableInstance();
  }

  addGlobalRunner(callback) {
    this.globalRunners.push(callback);
  }

  generateRoutes(basePath, rootRouter) {
    return rootRouter.generateRoutesRules(basePath);
  }

  addRouteRule(pattern, runners) {
    const routeRule = {
      pattern,
      runners
    }
    this.availableRoutes.push(routeRule);
  }

  addRoute(path, handlers) {
    let pattern;
    if(handlers instanceof RootRouter) {
      const routeObjects = this.generateRoutes(path, handlers);
      return routeObjects.map(obj => {
        pattern = new RegExp(`${obj.fullUrl}$`);
        handlers = obj.runnersAtLeaf;
        this.addRouteRule(pattern, handlers);
      });
    }

    pattern = new RegExp(`${path}$`);
    return this.addRouteRule(pattern, handlers);
  }

  listen(port, callback) {
    // listen for a call to race triggered by a user request
    const server = http.createServer(this);
    server.listen(port, callback());
  }

  resolveRoute(req, res) {
    const { pathname } = urlParser(req);
    return this.availableRoutes.find(route => {
      const pattern = route.pattern;
      return pattern.test(pathname);
    }) || {runners: [this.notFoundRunner]};
  }

  prepareRace() {
    const { req, res } = this;
    const track = this.resolveRoute(req, res);
    const runners = [...(this.globalRunners), ...(track.runners)];
    const relayQueue = new RelayQueue(runners, req, res);
    this.signalBeginRace(relayQueue);
  }

  signalBeginRace(relayQueue) {
    const { req, res } = this;
    const firstRunner = relayQueue.next().value;
    if (!firstRunner) return res.end('Hello, world! Loving Relay races');
    const baton = {
      req,
      res,
      data: {},
      pass: relayQueue.getNext
    };
    firstRunner(baton);
  }

  makeCallableInstance() {
    // when a request comes in, call for a relay
    return new Proxy(this, {
      apply: (target, thisArg, argList) => {
        this.req = argList[0];
        this.res = argList[1];
        this.prepareRace();
      }
    });
  }
}

export { RootRouter };
export default Relay;
