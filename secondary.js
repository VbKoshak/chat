/*jshint esversion: 6 */
const assert = require('assert');

const generateColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const logIn = (db,callback,login,password) => {
    const userCollection = db.collection('users');
    userCollection.find({login,password}).toArray(function(err,docs) {
        assert.equal(err,null);
        console.log("Found the folowing records: ");
        console.log(docs);
        callback(docs[0]);
    });
}

module.exports.logIn = logIn;
module.exports.generateColor = generateColor;

