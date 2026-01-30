const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017')
let collection;

async function startDatabase() {
    await client.connect()
    const db = client.db('music-library')
    collection = db.collection('playlist')
}

async function showAll() {
    return await collection.find({}).toArray()
}

async function filterByArtist(artist) {
    return await collection.find({ artist }).toArray()
}

async function addSong(title, artist, album, year) {
    const isExisting = await collection.findOne({
        title,
        artist
    })

    if (isExisting) {
        return { currentlyExisting: true }
    } else {
        const newSong = {
            title, 
            artist, 
            album, 
            year
        }

        const result = await collection.insertOne(newSong)

        return { 
            currentlyExisting: false, 
            song: {
                _id: result.insertedId,
                ...newSong
            }
        }
    }
}

async function deleteSong(id) {
    const isExisting = await collection.findOne({
        _id: id
    })

    if (!isExisting) {
        return { currentlyExisting: false }
    } else {
        await collection.deleteOne({
            _id: id
        })
        return { currentlyExisting: true }
    }
}

module.exports = {
    startDatabase,
    addSong,
    filterByArtist,
    showAll,
    deleteSong
}