const express = require("express")
const {NoteModel} = require("../models/Note.model")

const noteRouter = express.Router()

noteRouter.get("/", async (req,res)=>{
    try {
        const notes = await NoteModel.find()
    res.send(notes)
    } catch (err) {
        console.log(err);
        res.send({"err":"Someting went wrong"})
    }
    
})


noteRouter.post("/create", async (req,res)=>{
    const payload = req.body
    try {
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send("Created the note")
    } catch (error) {
        console.log(error);
        console.log({"err":"Someting went wrong"});
    }
    
})


noteRouter.patch("/update/:id", async (req,res)=>{
    const id = req.params.id
    const payload = req.body
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note = note.userID
    const userId_making_req = req.body.userID
    try {
        if(userId_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        } else {
            await NoteModel.findByIdAndUpdate({_id:id},payload)
            res.send(`updated note`)
        }
        
    } catch (err) {
        console.log(err);
        res.send({"err":"Someting went wrong"})
    }
})

noteRouter.delete("/delete/:id", async (req,res)=>{
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note = note.userID
    const userId_making_req = req.body.userID
    try {
        if(userId_making_req!==userID_in_note){
            res.send({"msg":"You are not authorized"})
        } else {
            await NoteModel.findByIdAndDelete({_id:id})
            res.send(`deleted note`)
        }
        
    } catch (err) {
        console.log(err);
        res.send({"err":"Someting went wrong"})
    }
})



module.exports = {noteRouter}