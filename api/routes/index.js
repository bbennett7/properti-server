var express = require('express');
var router = express.Router();
router.use(express.json());
const userController = require ('../controllers/user');
const propertyController = require ('../controllers/property');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Welcome to Properti Server!');
});

// USER
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
//router.patch('/user/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);


// PROPERTY
router.post('/properties', propertyController.createProperty);
router.get('/properties/:id', propertyController.getPropertyById);
//router.patch('/properties/:id', propertyController.updatePropertyById);
router.delete('/properties/:id', propertyController.deletePropertyById);

// TASK




module.exports = router;
