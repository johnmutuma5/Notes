import { Home } from '../../controllers';

const indexRoute = baseRouter => {
  // all users
  const indexRouteRunners = [];
  indexRouteRunners.push(Home.home);
  baseRouter.extrude('/', indexRouteRunners);
};

export default indexRoute;
