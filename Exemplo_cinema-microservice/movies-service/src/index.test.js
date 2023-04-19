require("dotenv-safe").config();
require("./config/mongodb.test").runTests();
require("./repository/repository.test").runTests();
require("./server/server.test").runTests();
require("./api/movies.test").runTests();