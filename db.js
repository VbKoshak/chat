/*jshint esversion: 8 */
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;
const url = 'mongodb://localhost:27017';
const dbName = 'chat';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

let MongoPool = () => {};

function initPool(cb) {
    MongoClient.connect(url, dbOptions, function (err, database) {
        if (err) throw err;

        db = database.db(dbName);
        if (cb && typeof (cb) == 'function')
            cb(db);
    });
    return MongoPool;
}
function getInstance(cb) {
    if (!db) {
        initPool(cb);
    } else {
        if (cb && typeof (cb) == 'function')
            cb(db);
    }
}

MongoPool.initPool = initPool;
MongoPool.getInstance = getInstance;

module.exports = MongoPool;