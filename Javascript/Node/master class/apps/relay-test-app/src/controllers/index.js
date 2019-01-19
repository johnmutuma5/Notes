import { fork } from 'child_process';


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
    const greetChild = fork('src/controllers/greet.js');

    // greetChild.send('John');
    //
    // greetChild.on('message', greeting => {
    //   res.end(greeting);
    // })
    res.end('Hello John')
  };
}
