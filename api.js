const { startDatabase, addSong, filterByArtist, deleteSong, showAll } = require('./database')
const { ObjectId } = require('mongodb')
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

const init = async () => {
    try {
        await startDatabase()
    } catch (error) {
        console.log(error)
    }
}

init();

app.get('/songs', async (req, res) => {
    const result = await showAll()

    if (result.length < 1) {
        res.status(404).json({
            success: false,
            error: 'Not Found',
            message: 'No songs found'
        })
    } else {
        res.status(200).json({
            success: true,
            data: result
        })
    }
})

app.get('/songs/:artist', async (req, res) => {
    const result = await filterByArtist(req.params.artist)

    if (result.length < 1) {
        res.status(404).json({
            success: false,
            error: 'Not Found',
            message: 'Artist not found'
        })
    } else {
        res.status(200).json({
            success: true,
            data: result
        })
    }
})

app.post('/songs/add', async (req, res) => {
    if (!/^\d{4}$/.test(req.body.year)) {
        return res.status(400).json({
            success: false,
            error: 'Bad Request',
            message: 'Year must be a 4-digit number'
        })
    }

    const result = await addSong(
        req.body.title,
        req.body.artist,
        req.body.album,
        req.body.year
    )

    if (result.currentlyExisting) {
        res.status(409).json({
            success: false,
            error: 'Conflict',
            message: 'Song already exist'
        })
    } else {
        res.status(201).json({
            success: true,
            data: result.song
        }) 
    }
})

app.delete('/songs/delete/:id', async (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            error: 'Bad Request',
            message: 'ID is not valid'
        })
    }

    const result = await deleteSong(
        new ObjectId(id)
    )

    if (!result.currentlyExisting) {
        return res.status(404).json({
            success: false,
            error: 'Not Found',
            message: 'Song not found'
        })
    }

    res.status(200).json({
        success: true,
        message: 'Deleted successfully',
        data: id
    })
})

app.listen(port, () => {
    console.log(`listenting on port ${port}`)
})