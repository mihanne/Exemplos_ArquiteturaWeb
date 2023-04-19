//repository.js
const mongodb = require("../config/mongodb");
const ObjectId = require("mongodb").ObjectId;

function getAllCities(callback){
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").find({}, {cidade:1,uf:1,pais:1}).toArray(callback);
    })
}

function getCinemasByCityId(cityId, callback){
    var objCityId = ObjectId(cityId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").find({_id: objCityId}, {cinemas: 1}).toArray((err, cities) => {
            if(err) return callback(err, null);
            callback(err, cities[0].cinemas);
        });
    });
}

function getMoviesByCinemaId(cinemaId, callback){
    var objCinemaId = ObjectId(cinemaId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").aggregate([
            {$match: {"cinemas._id": objCinemaId}},
            {$unwind: "$cinemas"},
            {$unwind: "$cinemas.salas"},
            {$unwind: "$cinemas.salas.sessoes"},
            {$group: {_id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme"}}}
        ]).toArray(callback);
    });
}
function getMoviesByCityId(cityId, callback){
    var objCityId = ObjectId(cityId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").aggregate([
            {$match: {"_id": objCityId}},
            {$unwind: "$cinemas"},
            {$unwind: "$cinemas.salas"},
            {$unwind: "$cinemas.salas.sessoes"},
            {$group: {_id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme"}}}
        ]).toArray((err, sessions) => {
            if(err) return callback(err, null);
            callback(err, sessions.map(item => { return {idFilme: item._id.idFilme, filme: item._id.filme } } ));
        });
    });
}

function getMovieSessionsByCityId(movieId, cityId, callback){
    var objMovieId = ObjectId(movieId);
    var objCityId = ObjectId(cityId);

    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").aggregate([
            {$match: {"_id": objCityId}},
            {$unwind: "$cinemas"},
            {$unwind: "$cinemas.salas"},
            {$unwind: "$cinemas.salas.sessoes"},
            {$match: {"cinemas.salas.sessoes.idFilme": objMovieId}},
            {$group: {_id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme", idCinema: "$cinemas._id", sala: "$cinemas.salas.nome", sessao: "$cinemas.salas.sessoes"}}}
        ]).toArray((err, sessions) => {
            if(err) return callback(err, null);
            callback(err, sessions.map(item => { return {idFilme: item._id.idFilme, filme: item._id.filme, idCinema: item._id.idCinema, sala: item._id.sala, sessao: item._id.sessao } } ));
        });
    });
}

function getMovieSessionsByCinemaId(movieId, cinemaId, callback){
    var objCinemaId = ObjectId(cinemaId);
    var objMovieId = ObjectId(movieId);
    mongodb.connect((err, db) => {
        db.collection("cinemaCatalog").aggregate([
            {$match: {"cinemas._id": objCinemaId}},
            {$unwind: "$cinemas"},
            {$unwind: "$cinemas.salas"},
            {$unwind: "$cinemas.salas.sessoes"},
            {$match: {"cinemas.salas.sessoes.idFilme": objMovieId}},
            {$group: {_id: { filme: "$cinemas.salas.sessoes.filme", idFilme: "$cinemas.salas.sessoes.idFilme", sala: "$cinemas.salas.nome", sessao: "$cinemas.salas.sessoes"}}}
        ]).toArray((err, sessions) => {
            if(err) return callback(err, null);
            callback(err, sessions.map(item => { return {idFilme: item._id.idFilme, filme: item._id.filme, sala: item._id.sala, sessao: item._id.sessao } } ));
        });
    });
}
function disconnect(){
    return mongodb.disconnect();
}

module.exports = { getAllCities, getCinemasByCityId, getMoviesByCityId, getMoviesByCinemaId, getMovieSessionsByCityId, getMovieSessionsByCinemaId, disconnect }