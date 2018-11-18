import { User } from '../../controllers';
import { authenticate } from '../../middleware';

const userRoutes = baseRouter => {
  // all users
  const userRouteRunners = [];
  userRouteRunners.push(authenticate);
  userRouteRunners.push(User.greet);
  const userRoute = baseRouter.extrude('/user', userRouteRunners);
  // single user
  const singleUserRouteRunners = [];
  singleUserRouteRunners.push(authenticate);
  singleUserRouteRunners.push(User.getOne);
  userRoute.extrude('/1', singleUserRouteRunners);
};

export default userRoutes;
