const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Parse application body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// TODO: Dropdown!
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if(response.statusCode <= 500) {
      res.send(body);
    }
  });
});

//Get a member by Id

app.get('/api/members/:id', (req,res) => {
  request(`http://localhost:3000/members/${req.params.id}`, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Post a new member
app.post('/api/addMember', (req, res) => {
  request({
    url:"http://localhost:3000/members",
    method: "POST",
    json: true,
    body: req.body
  },(err, response, body) => {
    console.log(response.body);
    res.send(response.body);
  });
});

// Update Member!
app.put('/api/updateMember/:id', (req, res) => {
  request({
    url:`http://localhost:3000/members/${req.params.id}`,
    method: "PUT",
    json: true,
    body: req.body
  },(err, response, body) => {
    console.log(response.body);
    res.send(response.body);
  });
});

app.delete('/api/deleteMember/:id', (req, res) => {
  request.delete(`http://localhost:3000/members/${req.params.id}`, (err, response, body) => {
    if (err) {
        return console.log(err);
    }
    console.log('Status Code:', res.statusCode);
    res.send(response.body);
});
});
               
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
