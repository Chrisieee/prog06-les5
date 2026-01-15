import mongoose from "mongoose";

const noteModel = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    body: {type: String, required: true},
})

const Note = mongoose.model("Note", noteModel)

export default Note