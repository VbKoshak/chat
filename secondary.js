/*jshint esversion: 6 */
const assert = require('assert');

const generateColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const createUser = (login, password) => {
    return {
        password,
        login,
        info: {
            color: generateColor(),
            username: login,
        }
    };
};

const logIn = (db, callback, login, password,finalFunc) => {
    const userCollection = db.collection('users');
    userCollection.find({
        login,
        password
    }).toArray(function (err, docs) {
        assert.equal(err, null);
        finalFunc();
        callback(docs[0]);
    });
};

const register = (db, callback, login, password,finalFunc) => {
    const userCollection = db.collection('users');
    userCollection.find({
        login,
        password
    }).toArray(function (err, docs) {
        assert.equal(err, null);
        if (docs.length > 0) {
            finalFunc();
            callback({
                status: 'error',
            });
        } else {
            userCollection.insertOne(
                createUser(login, password)
            ).then(() => {
                finalFunc();
                callback({
                    status: 'success',
                });
            });
        }
    });
};

module.exports.register = register;
module.exports.logIn = logIn;
module.exports.generateColor = generateColor;