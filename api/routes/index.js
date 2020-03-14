const express = require('express');

const router = express.Router();
router.use(express.json());
const userController = require('../controllers/user');
const propertyController = require('../controllers/property');
const taskController = require('../controllers/task');
const userTaskController = require('../controllers/userTask');

/* GET home page. */
router.get('/', function(res) {
  res.send('Welcome to Properti Server!');
});

// USER
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.patch('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

// PROPERTY
router.post('/properties', propertyController.createProperty);
router.get('/properties', propertyController.getProperties);
router.get('/properties/:id', propertyController.getPropertyById);
// router.patch('/properties/:id', propertyController.updatePropertyById);
router.delete('/properties/:id', propertyController.deletePropertyById);
router.get('/managers/:id/properties', propertyController.getPropertiesByManagerId);

// TASK
router.post('/tasks', taskController.upsertTask);
router.get('/tasks', taskController.getTasks);
router.delete('/tasks/:id', taskController.deleteTaskById);
// router.get('/properties/:id/tasks', taskController.getTasksByPropertyId);

// USER_TASK
router.patch('/users/:userId/tasks/:id', userTaskController.updateUserTaskById);
router.delete('/users/:userId/tasks/:id', userTaskController.deleteUserTaskById);
router.post('/users/:id/tasks', userTaskController.createUserTask);
router.get('/users/:id/tasks', userTaskController.getTasksByUserId);
router.get('/managers/:id/open-tasks', userTaskController.getOpenTasksByManagerId);

module.exports = router;
