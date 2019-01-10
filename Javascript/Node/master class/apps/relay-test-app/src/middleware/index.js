export const authenticate = baton => {
  const { req, res, pass, data } = baton;
  data.user = 'Lazuli';
  pass(baton);
}
