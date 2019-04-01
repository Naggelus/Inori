const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

class WebSocket {
  constructor(token, port, client) {
    this.token = token;
    this.port = port;
    this.client = client;
    this.app = express();

    this.app.engine(
      'hbs',
      hbs({
        extname: 'hbs',
        defaultLayout: 'layout',
        layoutsDir: __dirname + '/layouts'
      })
    );

    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'hbs');
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.registerRoots();

    this.server = this.app.listen(port, () => {
      console.log('Websocket API set up at port ' + this.server.address().port);
    });
  }

  checkToken(_token) {
    return _token == this.token;
  }

  registerRoots() {
    this.app.get('/', (req, res) => {
      var _token = req.query.token;
      if (!this.checkToken(_token)) {
        res.render('error', { title: 'ERROR!' });
        return;
      }
      return res.render('index', { title: 'TEST' });
    });
  }
}