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
        await collection.insertOne({
            title,
            artist,
            album,
            year
        })
        return { currentlyExisting: false }
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