const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

/**
 * Assume that these are error free.
 */
const User = require('./models/user');
const logger = require('./utils/logger');

const mongoDB = process.env.MONGO_URI 

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', function(error) {
  logger.log(error);
});

app.use(bodyParser.json());

// handler to save user
app.post('/save', function(req, res) {
  let user = new User(req.body);
  user.save(function(err, new_user) {
    if (err) {
      res.status(500).send(err);
      return logger.log(err);
    }
    return res.status(200).send('success');
  });
});

const server = http.createServer(app);

server.listen(80, function() {
  console.log(`Something cool is about to happen`)
});

