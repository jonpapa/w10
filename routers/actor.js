const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
module.exports = {
    getAll: function (req, res) {
        Actor.find(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    deleteActorMovies: function (req, res) {
        Actor.findById( req.params.id, function (err, actor) {
            if (err) return res.status(400).json(err);
            
            Movie.deleteMany({ _id: actor.movies }, function (err, movie) {
                if (err) return res.json(err);
                else

                Actor.findOneAndRemove({ _id: req.params.id }, function (err, actor) {
                    if (err) return res.status(400).json(err);
                    res.json({"message": "Actor & Movies Deleted"});
                });
            })
        })
    },
    removeMovieFromActor: function (req, res) {
        actorIdForRemoval = req.params.actId;
        movieIdForRemoval = req.params.movId;
        
        Actor.findOne({ _id: actorIdForRemoval}, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: movieIdForRemoval }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.pull(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        })
    },
    getAllNew: function (req, res) {
        Actor.find().populate('movies').exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },
    //removeMovies: function (req, res) {
    //    Actor.findById( req.params.id, function (err, actor) {
    //        if (err) return res.status(400).json(err);
            
    //        Movie.findByIdAndRemove({ _id: actor.movies }, function (err, movie) {
    //            if (err) return res.json(err);
    //        })
    //    })
    //}

    removeMovies: function (req, res) {
        actorIdForRemoval = req.params.id;

        Actor.findOne({ _id: actorIdForRemoval}, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

                for (i=0; i < actor.movies.length; i++) {
                    actor.movies.pull(actor.movies[i]);
                }
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            
        })
    }
}