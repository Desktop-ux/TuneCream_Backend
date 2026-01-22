const express = require('express')
const app = express()
const SongRoutes = require('./routes/song.routes')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/api', SongRoutes)

module.exports = app