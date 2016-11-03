const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const validation = require('./validations');

// get review page
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log(id);
  knex('instructors')
  .where('id', id)
  .select('*')
  .then((data) => {
    const renderObject = {};
    renderObject.instructor = data;
    res.render('reviews/review', renderObject);
  })
  .catch((err) => {
    console.log(err);
    return next(err);
  });
});

router.post('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  knex('reviews')
  .insert({
    // id: 10,
    review: req.body.review,
    rating: parseInt(req.body.rating),
    instructor_id: id
  }, '*')
  .then((data) => {
    res.send({
      redirect: '/instructors'
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  });
});

module.exports = router;
