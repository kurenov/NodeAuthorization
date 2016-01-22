var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  profile: {
    firstName: String,
    lastName: String,
    email:String
  },
  local: {
    email: {
      type: String,
      match: /^[\w\.-]+@[\w\.-]+\.[\w\.-]+$/,
      lowercase: true
    },
    password: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});
//// virtuals =======================================================
// methods =======================================================
// generating a hash
userSchema.methods.generateHash = function (password) {
  var result = false;
  try {
    result = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  catch (e) {
    return false;
  }
  return result;
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  var result = false;
  try {
    result = bcrypt.compareSync(password, this.local.password);
  }
  catch (e) {
    return false;
  }
  return result;
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);