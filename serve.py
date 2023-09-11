import flask

app = flask.Flask(__name__)

@app.route('/')
def home():
    return flask.render_template('home.html')

@app.route('/contact')
def contact():
    return flask.render_template('contact.html')

@app.route('/contact.asc')
def pgp_key():
    return flask.render_template('contact.asc.html')

@app.route('/.well-known/matrix/server')
def server():
    data = {
        "m.server": "matrix.pkrm.dev:443"
    }
    return data

if __name__ == '__main__':
    app.run()