const { json } = require('express')
const { default: mongoose } = require('mongoose')
const Comment = require('../model/commentModel')

const createcomment = async (req, res)=>{
    const {comment}= req.body
    // console.log({comment});
    // let emptyFields = []
    // if (!comment) {
    //     emptyFields.push("comment")
    // }
    // if (emptyFields.length > 0) {
    //     return res.status(400).json({error: "please fill in all the fields", emptyFields})
    // }
    if(!comment){
       return res.status(401).json({error: "Pls write a comment"})
    }

    try {
        const  user_id  = req.user._id 
        const createdComment = await Comment.create({
        comment, user_id
        //comment
       })
       console.log(user_id);
       res.status(200).json(createdComment)
      
    } catch (error) {
        console.log(error);
        res.status(401).json({error: error.message})
    }
}

const findAllComent = async (req, res)=>{
    
    try {
        const user_id = req.user._id
        const all = await Comment.find({user_id}).sort({createdAt: -1})
        res.status(200).json(all)
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const findSingleComent = async (req, res)=>{
    const {id} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(401).json("NO SUCH ID")
          }
        const single = await Comment.findById(id)
        res.status(200).json(single)
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}


const updateComment = async(req, res)=>{
    const {id} = req.params
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(401).json("NO SUCH ID")
        }
        const update = await Comment.findByIdAndUpdate(id, req.body)
        if (!update) {
           return res.status(201).json("NO SUCH ITEM")
        }
        res.status(200).json(update)

    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const deleteComment = async(req, res)=>{
    const {id} = req.params
    // const user_id = req.user._id


    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(401).json("NO SUCH ID")
          }
        const del = await Comment.findByIdAndDelete(id)
        if (!del) {
            res.status(200).json("NO SUCH ITEM")
        }
        res.status(200).json(del)

    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

module.exports = {createcomment,
updateComment,
findAllComent,
deleteComment,
findSingleComent
}