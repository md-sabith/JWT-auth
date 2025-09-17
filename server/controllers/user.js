const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt =require('bcrypt')
const { generateKey } = require('../utils/jwtUtils')
//get all Users
const getAllUsers=async(req,res)=>{
    const Users= await User.find({}).sort({createdAt:-1})

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
    console.log("Incoming body:", req.body); 
    const {name,email,password,role}= req.body
    const hashedPassword =await bcrypt.hash(password,10)
    try{
        const Users = await User.create({name,email,password:hashedPassword,role:role ||"customer"});
        res.status(200).json(Users);
        console.log(Users);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

    const authService=async(email,password)=>{
        try{
            const exitinguser= await User.findOne({email})

            if(!exitinguser){
                throw new  Error ('User not found')
            }
            const isPasswordVaild = await bcrypt.compare(password,exitinguser.password)

            if(!isPasswordVaild){
                throw new  Error ('Incorrect Password')
            }
            const token =generateKey(exitinguser)
            return token

        }catch(err){
            throw new  Error (err)
        }
    }

// add handler that uses loginUser and sends a response
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService(email, password);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message || 'Login failed' });
  }
};

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
    updateManyUsers,
    login
}