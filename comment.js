// create web server with express
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Create comment
router.post('/create', (req, res, next) => {
    let newComment = new Comment({
        comment: req.body.comment,
        post: req.body.post,
        user: req.body.user
    });
    Comment.addComment(newComment, (err, comment) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add comment' });
        } else {
            res.json({ success: true, msg: 'Comment added' });
        }
    });
});

// Delete comment
router.delete('/delete/:id', (req, res, next) => {
    Comment.deleteComment(req.params.id, (err, comment) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to delete comment' });
        } else {
            res.json({ success: true, msg: 'Comment deleted' });
        }
    });
});

// Get comment by id
router.get('/get/:id', (req, res, next) => {
    Comment.getCommentById(req.params.id, (err, comment) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to get comment' });
        } else {
            res.json(comment);
        }
    });
});

// Get all comments
router.get('/get', (req, res, next) => {
    Comment.getAllComments((err, comments) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to get comments' });
        } else {
            res.json(comments);
        }
    });
});

// Get comments by post id
router.get('/get/post/:id', (req, res, next) => {
    Comment.getCommentByPostId(req.params.id, (err, comments) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to get comments' });
        } else {
            res.json(comments);
        }
    });
});

// Get comments by user id
router.get('/get/user/:id', (req, res, next) => {
    Comment.getCommentBy
});