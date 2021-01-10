var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: '/src/index.tsx',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    resolve : {
        extensions: [".js", ".ts", ".jsx", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.js/,
                exclude: /node_modules/,
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 5000,
        hot: true,
    },
    target: 'web',
    externals: {
        'react': 'React', 
        'react-dom' : 'ReactDOM',
        'firebase': 'firebase',
        'scheduler': 'scheduler',
    },
    optimization: {
        minimize: false
    },
};