const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '/client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    client: {
      overlay: true
    },
    static: {
      directory: path.resolve(__dirname, 'client'),
      publicPath: '/'
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    compress: true,
    proxy: {
      context: ['/test', '/snippets'],
      target: 'http://localhost:3000/' 
    }
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '/index.html')
  })]
};
