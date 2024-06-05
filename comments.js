//create new server
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

//get all comments
router.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.send('Error has occurred');
        } else {
            res.send(comments);
        }
    });
});

//get comment by id
router.get('/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.send('Error has occurred');
        } else {
            res.send(comment);
        }
    });
});

//get all comments by post id
router.get('/post/:id', (req, res) => {
    Comment.find({postId: req.params.id}, (err, comments) => {
        if (err) {
            res.send('Error has occurred');
        } else {
            res.send(comments);
        }
    });
});

//get all comments by user id
router.get('/user/:id', (req, res) => {
    Comment.find({userId: req.params.id}, (err, comments) => {
        if (err) {
            res.send('Error has occurred');
        } else {
            res.send(comments);
        }
    });
});

//add new comment
router.post('/', (req, res) => {
    var comment = new Comment(req.body);
    comment.save((err) => {
        if (err) {
            res.send('Error has occurred');
        } else {
            res.send('Comment added successfully');
        }
    });
});

//update comment by id
router.put('/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) {
            res.send('Error has occurred');
        } else {
            res.send('Comment updated successfully');
        }
    });
});

//delete comment by id
router.delete('/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.send('Error has occurred');
        } else {
            res.send('Comment deleted successfully');
        }
    });
});

module.exports = router;
