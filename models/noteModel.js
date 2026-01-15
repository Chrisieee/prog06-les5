import mongoose from "mongoose";

const noteModel = new mongoose.Schema({
        title: {type: String, required: true},
        author: {type: String, required: true},
        body: {type: String, required: true},
    }, {
        toJSON: {
            virtuals: true,
            versionKey: false,
            transform: (doc, ret) => {
                ret._links = {
                    self: {
                        href: `${process.env.BASE_URI}/${ret._id}`,
                    },
                    collection: {
                        href: `${process.env.BASE_URI}`,
                    },
                };

                delete ret._id;
            },
        },
    }
)

const Note = mongoose.model("Note", noteModel)

export default Note