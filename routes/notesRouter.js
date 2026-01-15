import express from "express"
import Note from "../models/noteModel.js"
import {fakerNL} from "@faker-js/faker";

const router = express.Router()

router.get("/notes", async (req, res) => {
    const notes = await Note.find({})
    res.status(200).json(notes)
})

router.get("/notes/:id", async (req, res) => {
    const id = req.params.id
    try {
        const note = await Note.findById(id)
        res.status(200).json(note)
    } catch (e) {
        res.status(404).send(e.message)
    }
})

router.post("/notes", (req, res) => {
    const note = Note({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
    })
    note.save()
    res.status(200).json(note)
})

router.put("/notes/:id", async (req, res) => {
    const id = req.params.id

    try {
        const note = await Note.findById(id)

        note.title = req.body.title
        note.author = req.body.author
        note.body = req.body.body

        const succes = await note.save()
        res.status(200).json(succes)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.delete("/notes/:id", async (req, res) => {
    const id = req.params.id
    try {
        const note = await Note.findById(id)
        await note.deleteOne()
        res.status(200).send("item is verwijderd")
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.post("/notes/seed", async (req, res) => {
    const reset = req.body.reset
    if (reset === "true") {
        await Note.deleteMany({})
    }

    const amount = req.body.amount
    const notes = []

    for (let i = 0; i < amount; i++) {
        const note = Note({
            title: fakerNL.book.title(),
            author: fakerNL.person.fullName(),
            body: fakerNL.lorem.text(),
        })
        note.save()
        notes.push(note)
    }

    res.status(200).send(notes)
})

export default router