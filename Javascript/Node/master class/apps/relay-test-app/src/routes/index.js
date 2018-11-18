import { RootRouter } from '../../../_relay-webserver/src';
import userRoutes from './users';
import indexRoute from './home';

const baseRouter = new RootRouter;

indexRoute(baseRouter);
userRoutes(baseRouter);

export default baseRouter;
