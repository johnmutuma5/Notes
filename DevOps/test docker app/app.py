#!/usr/bin/env python
from werkzeug.serving import run_simple

class Relay():
    def __call__(self, environ, make_response):
        status = '200 OK';
        resp_headers = []
        make_response(status, resp_headers)
        body = b'Hello world'
        return [body]

    def listen(self, port, callback):
        callback()
        run_simple('0.0.0.0', port, self, use_reloader=True, threaded=True)


app = Relay()
app.listen(8080, lambda: print('listening'))
