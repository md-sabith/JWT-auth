const express = require('express');
const router = express.Router();
const {createUsers,
    getAllUsers,
    getSingleUsers,
    deleteUsers,
    updateUsers,
    filterByClass,
    updateManyUsers} = require('../controllers/user')


//get all Users
router.get('/',getAllUsers)

//filter by class
router.get('/:classId',filterByClass)

//get a single User
router.get('/:id',getSingleUsers)

//add a Users
router.post('/signup',createUsers)

//delete Users
router.delete('/:id',deleteUsers)

//update Users
router.patch('/:id',updateUsers)

router.patch('/bulk-update/Users',updateManyUsers)

module.exports = router;