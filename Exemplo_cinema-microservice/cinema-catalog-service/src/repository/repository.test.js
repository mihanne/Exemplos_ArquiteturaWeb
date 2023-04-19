const test = require('tape');
const repository = require('./repository');

function runTests(){

    var cityId = null;
    var cinemaId = null;
    var movieId = null;

    test('Repository getAllCities', (t) => {
        repository.getAllCities((err, cities) => {
            if(cities && cities.length > 0) cityId = cities[1]._id;//Porto Alegre
            
            t.assert(!err && cities && cities.length > 0, "All Cities Returned");
            t.end();
        });
    })
    
    test('Repository getCinemasByCityId', (t) => {
        repository.getCinemasByCityId(cityId, (err, cinemas) => {
            if(cinemas && cinemas.length > 0) cinemaId = cinemas[0]._id;
            
            t.assert(!err && cinemas && cinemas.length > 0, "All Cinemas Returned By City Id");
            t.end();
        });
    })
    test('Repository getMoviesByCinemaId', (t) => {
        repository.getMoviesByCinemaId(cinemaId, (err, movies) => {
            t.assert(!err && movies && movies.length > 0, "Movies By Cinema Id Returned");
            t.end();
        });
    })

    test('Repository getMoviesByCityId', (t) => {
        repository.getMoviesByCityId(cityId, (err, movies) => {
            if(movies && movies.length > 0) movieId = movies[1].idFilme;//Era de Ultron
            t.assert(!err && movies && movies.length > 0, "Movies By City Id Returned");
            t.end();
        });
    })

    test('Repository getMovieSessionsByCityId', (t) => {
        repository.getMovieSessionsByCityId(movieId, cityId, (err, sessions) => {
            t.assert(!err && sessions && sessions.length > 0, "Movie Sessions By City Id Returned");
            t.end();
        });
    })

    test('Repository getMovieSessionsByCinemaId', (t) => {
        repository.getMovieSessionsByCinemaId(movieId, cinemaId, (err, sessions) => {
            t.assert(!err && sessions && sessions.length > 0, "Movie Sessions By Cinema Id Returned");
            t.end();
        });
    })

    test('Repository Disconnect', (t) => {
        t.assert(repository.disconnect(), "Disconnect Ok");
        t.end();
    })
}

module.exports = { runTests }