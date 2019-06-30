const userService = require('../services/userService');
const User = require('../database/userRepository');

const signupController = (req, res) => {
  const correctHeader = req.headers['content-type'] === 'application/json';
  if (!correctHeader) {
    res.setHeader('content-type', 'application/json');
    return res.status(400).json({ error: 'Invalid headers.' });
  }
  const {
    username, email, password, isGuest
  } = req.body;
  console.log(req.body);
  const newUser = User.fillUp(req.body);

  if (!username && !email && !password) {
    return res.status(400).json({ error: "You can't register a user with empty fields." });
  }
  if (!username) {
    return res.status(400).json({ error: 'Missing username.' });
  }
  if (!email) {
    return res.status(400).json({ error: 'Missing email.' });
  }
  if (username.length > 25) {
    return res.status(400).json({ error: "Username can't be longer than 25 characters." });
  }
  if (!password) {
    return res.status(400).json({ error: 'Missing password.' });
  }
  if (password.length > 50) {
    return res.status(400).json({ error: "Password can't be longer than 50 characters." });
  }
  
  censore(username);

  return userService
    .register(newUser)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: 'Something went wrong, please try again later.' });
    });
    
    function censore(inputName) {
      let badWords = ["anal", "anus", "arse", "ass", "ballsack", "balls", "bastard", "bitch"];   
    
        badWords.forEach(element => {
          if(inputName.includes(element)) {
            return res.status(400).json({ error: 'Oops, that username contains bad word.' });
          }
        })
    }
};

module.exports = {
  signupController,
}