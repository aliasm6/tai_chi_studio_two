const knex = require('../db/knex');

function checkValidation(req, res, next) {
  const userEmail = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const address_line_1 = req.body.address_line_1;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const password = req.body.password;
  const arr = [first_name, last_name, email, address_line_1, city, state, zip, password];
  function check(el, index, arr) {
    return (el !== '');
  }
  const valid = arr.every(check);
  const errorMessage = [];
  knex('users')
  .where('email', userEmail)
  .select('users.email')
  .then((user) => {
    console.log('test user', user);
    if (user.length) {
      errorMessage.push('You already have an account set up with that email.');
      return res.status(400).json({
        status: 'error',
        message: errorMessage
      });
    }
  });
  if (!valid) {
    errorMessage.push('Please fill out all required fields.');
    return res.status(400).json({
      status: 'error',
      message: errorMessage
    });
  } else if (req.body.password.length < 8) {
    errorMessage.push('Your password needs to be at least 8 characters long.');
    return res.status(400).json({
      status: 'error',
      message: errorMessage
    });
  } else {
    next();
  }
}

function checkUser(req, res, next) {
  const userID = req.session.user.id;
  const errorMessage = [];
  if (!userID) {
    errorMessage.push('Need to log in to review.');
    const renderObject = {};
    renderObject.error = errorMessage;
    return res.render('instructors/instructors', renderObject);
  } else {
    next();
  }
}

module.exports = {
  checkValidation,
  checkUser
};
