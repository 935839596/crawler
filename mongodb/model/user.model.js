var mongoose = require('mongoose');
var md5 = require('md5')

var UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true
  },
  tag: {
    type: Array,
    default: []
  },
  username: {
    type: String,
    default: '佚名'
  },
  password: {
    type: String,
    default: md5('123456')
  },
  avatarLarge: {
    type: String,
    default: 'https://suibian.com'
  },
  followees: {
    type: Array,
    default: []
  },
  followers: {
    type: Array,
    default: []
  },
  article:{
    type: Array,
    default: []
  },
  meta: {
    followeesCount: {
      type: Number,
      default:0
    },
    followersCount: {
      type: Number,
      default: 0
    },
    likeCount: {
      type: Number,
      default: 0
    }
  }

})

mongoose.model( 'User', UserSchema)