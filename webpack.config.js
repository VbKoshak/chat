const path = require('path');

module.exports = {
    entry: {
	'client' : './client/events.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    mode: 'development',
}