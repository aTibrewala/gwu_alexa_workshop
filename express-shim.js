'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const context = require('aws-lambda-mock-context');

const Alexa = require("alexa-sdk");
//var lambda = require('./index');
var lambda = require('./cardskill');

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));

app.post('/', function (req, res) {
    var ctx = context();
    lambda.handler(req.body,ctx);
    ctx.Promise
        .then(resp => {  return res.status(200).json(resp); })
        .catch(err => {  console.log(err); })
});

app.get('/', function (req, res) {
  return res.status(200).json({"hello":"world"});
});

app.listen(process.env.PORT);
