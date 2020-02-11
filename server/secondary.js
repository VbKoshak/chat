/*jshint esversion: 6 */

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

module.exports.createUser = createUser;
module.exports.generateColor = generateColor;