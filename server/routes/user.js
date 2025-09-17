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




// login and signup first
router.post('/login', login)
router.post('/signup',createUsers)

//get a single User
router.get('/:id',getSingleUsers)

//delete Users
router.delete('/:id',deleteUsers)

//update Users
router.patch('/:id',updateUsers)

router.patch('/bulk-update/Users',updateManyUsers)

module.exports = router;