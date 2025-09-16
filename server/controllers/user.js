const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
//get all Users
const getAllUsers=async(req,res)=>{
    const Users= await User.find({}).sort({createdAt:-1})

    res.status(200).json(Users)
}

//filter by class
const filterByClass= async(req,res)=>{
    const {classId} = req.params
     
    const Users = await User.find({CLASS:classId})

    if(!Users){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(Users)
}


//get a single Users
const getSingleUsers=async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const Users= await User.findById(id)
    if(!Users){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(Users)
}


//create a Users db
const createUsers=async(req,res)=>{
    const {name,email,password,role}= req.body
    const hashedPassword = bcrypt.hash(password,10)
    try{
        const Users = await User.create({name,email,hashedPassword,role:"customer"});
        res.status(200).json(Users);
        console.log(Users);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

//delete a Users
const deleteUsers =async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }
    const Users=await User.findByIdAndDelete(id)

    if(!Users){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(Users)


}

//update
const updateUsers = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'such document not fount'})
    }

    const Users=await User.findByIdAndUpdate({_id:id},{
        ...req.body
    })

    if(!Users){
        return res.status(404).json({error:'such document not fount'})
    }
    res.status(200).json(Users)
}

// update many Users attendance
const updateManyUsers = async (req, res) => {
    try {
      const { updates } = req.body; 
      // updates should be an array of { ADNO, Status, Date, Time }
  
      const bulkOps = updates.map((u) => ({
        updateOne: {
          filter: { ADNO: u.ADNO },
          update: {
            $set: {
              Status: u.Status,
              Time: u.Time,
              Date:u.Date
              
            }
          }
        }
      }));
  
      await User.bulkWrite(bulkOps);
  
      res.status(200).json({ message: "Users updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {
    createUsers,
    getAllUsers,
    getSingleUsers,
    deleteUsers,
    updateUsers,
    filterByClass,
    updateManyUsers
}