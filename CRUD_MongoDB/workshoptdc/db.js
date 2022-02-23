const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost")
            .then(conn => global.conn = conn.db("workshoptdc"))
            .catch(err => console.log(err))

function findAll() {
    return global.conn.collection("customers").find().toArray();
}

function insert(customer) {
    return global.conn.collection("customers").insertOne(customer);
}

const ObjectId = require("mongodb").ObjectId;

function findOne(id) {
    return global.conn.collection("customers").findOne(new ObjectId(id));
}

function update(id, customer) {
    return global.conn.collection("customers").updateOne({ _id: new ObjectId(id) }, { $set: customer });
}
function deleteOne(id) {
    return global.conn.collection("customers").deleteOne({ _id: new ObjectId(id) });
}
 
module.exports = { findAll, insert, findOne, update, deleteOne }

