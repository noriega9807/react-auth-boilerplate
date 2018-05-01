const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const outputPath = path.join(__dirname, 'public', 'dist');
const srcPath = path.join(__dirname, 'src');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test'){
    require('dotenv').config({ path: '.env.test'});
}else if(process.env.NODE_ENV === 'development'){
    require('dotenv').config({ path: '.env.development'});
}

module.exports = (env) => {

    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');
    
    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: outputPath,
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }],
            loaders: [
                {
                  test: /\.(js|jsx)?$/,
                  include: srcPath,
                  exclude: /node_modules/,
                  loader: 'babel-loader',
                  query: {
                    presets: ['es2015', 'react']
                  },
                }
            ]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            historyApiFallback: true
        },
        resolve: {
            alias: {
                '@fortawesome/fontawesome-pro-light$': '@fortawesome/fontawesome-pro-light/shakable.es.js'
            },
            extensions: ['.js', '.jsx']
        }
    };
};

