var mongoose = require('mongoose')
var Article = require('./article.model')
var Discussion = require('./discussion.model')
var Comment = require('./comment.model')
var User = require('/user.model)

var MessageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    unique: true
  },
  buildTime: {
    type: String,
    default: Date.now()
  },
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: [User]
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: [User]
  },
  //1点赞 2评论
  type: {
     type: Number,
    default: 1
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: [Article],
  },
  discussion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: [Discussion]
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: [Comment],
  },
  read: {
    type: boolean,
    default: false
  }
})
