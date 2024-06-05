//create web server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//create a comment file
var filePath = path.join(__dirname, 'comments.json');
fs.stat(filePath, function(err, stat) {
  if(err == null) {
    console.log('File exists');
  } else if(err.code == 'ENOENT') {
    fs.writeFile(filePath, '[]', function(err) {
      if(err) {
        return console.log(err);
      }
      console.log('File created');
    });
  } else {
    console.log('Some other error: ', err.code);
  }
});

//get comments
app.get('/api/comments', function(req, res) {
  fs.readFile(filePath, function(err, data) {
    if(err) {
      return console.log(err);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

//add a comment
app.post('/api/comments', function(req, res) {
  fs.readFile(filePath, function(err, data) {
    if(err) {
      return console.log(err);
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(filePath, JSON.stringify(comments), function(err) {
      if(err) {
        return console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

//delete a comment
app.delete('/api/comments/:id', function(req, res) {
  fs.readFile(filePath, function(err, data) {
    if(err) {
      return console.log(err);
    }
    var comments = JSON.parse(data);
    comments.splice(req.params.id, 1);
    fs.writeFile(filePath, JSON.stringify(comments), function(err) {
      if(err) {
        return console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});

//update a comment
app.put('/api/comments/:id', function(req, res) {
  fs.readFile(filePath, function(err, data) {
    if(err) {
      return console.log(err);
    }
    var comments = JSON.parse(data);
    comments[req.params.id] = req.body;
    fs.writeFile(filePath, JSON.stringify(comments), function(err) {
      if(err) {
        return console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});