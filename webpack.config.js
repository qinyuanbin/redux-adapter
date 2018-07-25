var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
            include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules|bower_components|build)/,
            test: /\.js|jsx$/, use: [
                { loader: 'babel-loader' }
            ]
        }]
    },
    externals: {
        'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    }
};
