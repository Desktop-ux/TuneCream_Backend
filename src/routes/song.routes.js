const express = require('express')
const multer = require('multer')
const router = express.Router()
const uploadFile = require('../services/storage.service')
const upload = multer({storage:multer.memoryStorage()})
const songModel = require('../models/song.model')



router.post('/songs',upload.single("audio"),async(req, res)=>{
    console.log(req.body)
    console.log(req.file) // Audio FIle
    const fileData = await uploadFile(req.file)

    const song = await songModel.create({
        title:req.body.title,
        artist:req.body.artist,
        audio:fileData.url,
        mood:req.body.mood
    })
    res.status(201).json({
        message : "Song added successfully",
        song : song
    })
})

router.get('/songs', async (req, res) => {
  try {
    const { mood } = req.query

    if (!mood) {
      return res.status(400).json({
        message: "Mood query parameter is required",
        songs: []
      })
    }

    const songs = await songModel.find({
      mood: { $regex: new RegExp(`^${mood}$`, "i") }
    })

    res.status(200).json({
      message: "Songs fetched successfully",
      mood,
      songs
    })
  } catch (error) {
    console.error("Error fetching songs:", error)
    res.status(500).json({
      message: "Internal server error"
    })
  }
})


module.exports = router