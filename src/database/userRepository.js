const User = require('./models/userModel');


const fillUp = reqInput => new User(reqInput);
const saveUser = user => user.save();


module.exports = {
  saveUser,
  fillUp,
}