const User = require('../models/user');

exports.createUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // check if username is already taken
  User.findOne({ username })
    .then((user) => {
      if (user) {
        console.error('Username already taken');
        return res.status(400).json({ message: 'Username already taken' });
      } else {
        const user = new User({ username, password });
        user
          .save()
          .then(() => {
            return res.status(201).json({ message: 'User created!' });
          })
          .catch((err) => {
            console.error(err);
            // send error message to client
            return res.status(500).json({ message: 'Server error' });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      // send error message to client
      return res.status(500).json({ message: 'Server error' });
    });
};

exports.getAuthUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        return res.status(200).json({ user, message: 'User authenticated!' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    });
};
