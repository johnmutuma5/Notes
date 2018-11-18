import url from 'url';

export const globalRunnerOne = (baton) => {
  const { req, res, pass, data } = baton;
  data.user = 'Lazuli';
  data.runnersSoFar = ['globalRunnerOne'];
  pass(baton);
}

export const globalRunnerTwo = (baton) => {
  const { req, res, pass, data } = baton;
  data.runnersSoFar.push('globalRunnerTwo')
  pass(baton);
}
