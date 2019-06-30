const userRepository = require('../database/userRepository');

const register = user => userRepository.saveUser(user);

module.exports = {
  register,
}