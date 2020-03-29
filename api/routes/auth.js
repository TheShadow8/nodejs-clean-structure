const { Router } = require('express');

const route = Router();

const authController = require('../../controllers/auth');

module.exports = app => {
  app.use('/auth', route);

  route.post('/signup', authController.signup);
};
