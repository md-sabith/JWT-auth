const express = require('express');
const router = express.Router();
const {createUsers,
    getAllUsers,
    getSingleUsers,
    deleteUsers,
    updateUsers,
    login,
    updateManyUsers} = require('../controllers/user')


//get all Users
router.get('/',getAllUsers)




//get a single User
router.get('/:id',getSingleUsers)

// login (must be before dynamic :id routes)
router.post('/login', login)
//add a Users
router.post('/signup',createUsers)

//delete Users
router.delete('/:id',deleteUsers)

//update Users
router.patch('/:id',updateUsers)

router.patch('/bulk-update/Users',updateManyUsers)

module.exports = router;