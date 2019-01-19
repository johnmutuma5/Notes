import http from 'http';
import RelayWebServer from '../../_relay-webserver/src';
import { globalRunnerOne, globalRunnerTwo } from './global-runners';
import baseRouter from './routes';

const app = new RelayWebServer('simpleApp');

app.addGlobalRunner(globalRunnerOne);
app.addGlobalRunner(globalRunnerTwo);
// app.addRoute('/', [indexRunnerOne]);
app.addRoute('api/v1', baseRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening now: localhost:${PORT}/api/v1`));
