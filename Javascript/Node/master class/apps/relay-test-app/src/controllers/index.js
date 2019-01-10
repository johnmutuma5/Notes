export class User {
  static greet(baton) {
    const { req, res, pass, data } = baton;
    return res.end(`Hello, ${data.user}`);
  }

  static getOne(baton) {
    const { req, res, pass, data } = baton;
    return res.end(`Getting single`);
  }
}

export class Home {
  static home (baton) {
    const { req, res, pass, data } = baton;
    res.end('This is index');
  };
}
