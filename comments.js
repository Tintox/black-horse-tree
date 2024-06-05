// Create web server  that listens on port 3000
// Use express.js
// Use middleware to parse incoming request body
// Use middleware to serve static files
// Use middleware to log all requests
// Use middleware to handle errors
// Use middleware to validate incoming request body
// Use middleware to handle comments API
// Use middleware to handle comments API errors

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

app.post('/api/comments', (req, res, next) => {
  const { comment } = req.body;

  if (!comment || typeof comment !== 'string') {
    return next(new Error('Invalid comment'));
  }

  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }

    const comments = JSON.parse(data);
    comments.push(comment);

    fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), err => {
      if (err) {
        return next(err);
      }

      res.status(201).send('Comment added');
    });
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).send(err.message);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});