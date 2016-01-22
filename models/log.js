var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
  ip:String,
  user:{
    type:String,
    default:''
  },
  page:String,
  ua:String,
  referer:String,
  language:String,
  navigator: {
    language:String,
    platform:String,
    vendor:String
  },
  ts:{
    type: Date,
    default: Date.now
  }
});

module.exports = module.exports = mongoose.model('Log', logSchema);