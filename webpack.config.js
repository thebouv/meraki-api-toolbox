var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname + '/build')
var APP_DIR = path.resolve(__dirname + '/app')

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: BUILD_DIR,
        port: 3000,
        historyApiFallback: {
            index: 'index.html'
        },
        // proxy: {
        //     '/go/api/**': {
        //         target: 'http://localhost:3001/',
        //         secure: false,
        //         changeOrigin: true,
        //         logLevel: 'debug'
        //     }
        // }
        proxy: {
            '/api/**': {
                target: 'https://dashboard.meraki.com/',
                secure: false,
                changeOrigin: true,
                logLevel: 'debug'
                // onProxyRes: (proxyres, req, resp) => {
                //     resp2 = proxyres;
                //     console.log(resp2);
                // }
            }
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }

            }
        ]
    }
}

module.exports = config
