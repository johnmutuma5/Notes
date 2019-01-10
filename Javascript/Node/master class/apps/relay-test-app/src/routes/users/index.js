import { User } from '../../controllers';
import { authenticate } from '../../middleware';
import singleUserRoute from './singleUser';

// all users
const userRouteRunners = [
  authenticate,
  User.greet
];

const userRoutes = baseRouter => {
  const userRouter = baseRouter.extrude('/user', userRouteRunners);
  // single user: /user/:id
  singleUserRoute(userRouter);
};

export default userRoutes;
