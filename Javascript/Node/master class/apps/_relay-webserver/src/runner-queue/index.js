export default class RelayQueue {
  constructor(runners, req, res) {
    this.runners = runners;
    this.runnersGeneratorObj = this[Symbol.iterator]();
    this.getNext = this.getNext.bind(this);
    this.req = req;
    this.res = res;
  }

  * [Symbol.iterator]() {
    const { runners } = this;
    for (let runner of runners) yield runner;
  }

  next() {
    return this.runnersGeneratorObj.next();
  }

  getNext(baton) {
    const nextRunner = this.next().value;
    if(!baton){
      const { req, res, getNext } = this;
      baton = { req, res, pass: getNext, data: {} };
    }
    nextRunner(baton);
  }
}
