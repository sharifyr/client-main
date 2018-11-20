var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './dist/');

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

var config = {
  entry: './app/src/index.tsx',
  devtool: 'source-map',
  mode: "development",
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: ["awesome-typescript-loader"]},
      { enforce: "pre", test: /\.js$/, use: ["source-map-loader"] },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ["file-loader"] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ["url-loader"] },
      {
        test: /\.(css|scss)$/, exclude: /node_modules/,
        use: ["style-loader","css-loader","sass-loader"]
      },
      { 
        test: /app\/test\/*\.ts$/,
        use: "mocha-loader",
        exclude: /node_modules/
      }
    ]
  },
  node: {
    fs: "empty",
    __dirname: true,
    __filename: true
  },
  devServer: {
    contentBase: BUILD_DIR,
    host: '0.0.0.0',
    historyApiFallback: true,
    port: 80,
    compress: true
  },
  stats: 'none',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
    }),
   // new UglifyJSPlugin(),
    new CompressionPlugin()
  ]
};

// config.externals = { config: "./config/local.ts" };
module.exports = config;
