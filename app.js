//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor.js');
const movies = require('./routers/movie.js');
const path = require('path');
const app = express();
app.use("/", express.static(path.join(__dirname, "dist/w10")));
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/week7lab', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);

//1
app.delete('/movies/:id', movies.deleteOne);

//2
app.delete('/actors/:id/movies', actors.deleteActorMovies);

//3
app.put('/actors/:actId/:movId', actors.removeMovieFromActor);

//4
app.put('/movies/:movId/:actId', movies.removeActorFromMovie);

//5
app.post('/movies/:id/actors', movies.addActor);

//6
app.get('/moviesbetween/:y2/:y1', movies.getBetween);

//7
app.get('/actorsnew', actors.getAllNew);

//8
app.get('/moviesnew', movies.getAllNew);

//9
app.delete('/deletemoviesbetween/:y2/:y1', movies.deleteBetween)

//extra task
app.put('/actorcleanslate/:id', actors.removeMovies)