# api-database

This is a simple API built with Node.js, Express and MongoDB. It lets you store and manage a small musiv library using HTTP requests. The API runs locally and uses MongoDB database created by the project. 

What it does
- Stores songs in a MongoDB database
- Get all songs or filter by artist
- Add new songs
- Delete songs using their database ID

How to run it
1. Make sure Node.js and MongoDB are installed
2. Start MongoDB locally
3. Intall dependencies: npm install
4. Start the server: node api.js
5. The API runs at: http://localhost:3000

Endpoints
- GET /songs
- GET /songs/:artist
- POST /songs/add (JSON body)
- DELETE /songs/delete/:id
