const request = require('request');

module.exports = function(app) {

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
  
  //Delete a member
  app.delete('/api/deleteMember/:id', (req, res) => {
    request.delete(`http://localhost:3000/members/${req.params.id}`, (err, response, body) => {
      if (err) {
          return console.log(err);
      }
      console.log('Status Code:', res.statusCode);
      res.send(response.body);
  });
  });

}