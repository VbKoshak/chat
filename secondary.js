/*jshint esversion: 6 */

const generateColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};


module.exports.generateColor = generateColor;

