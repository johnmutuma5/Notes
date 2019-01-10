import { User } from '../../controllers';
import { authenticate } from '../../middleware';

const runners = [
  authenticate,
  User.getOne
];

const singleUserRoute = (userRouter) => {
  userRouter.extrude('/1', runners);
}

export default singleUserRoute;
