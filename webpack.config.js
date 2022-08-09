/* eslint-disable */
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '.');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const BUILD_DIR = resolvePath('build');

const config = {
  context: ROOT_DIR,

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  resolve: {
    extensions: ['*', '.js', '.jsx', '.mjs'],
  },

  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'dynamic-import-webpack',
                'remove-webpack'
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(raw|app|bin)$/,
        use: 'url-loader',
      },
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyPlugin([
      { from: './public/*.*', to: resolvePath(BUILD_DIR) },
    ]),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": process.env.NODE_ENV === 'production' ? JSON.stringify('production') : JSON.stringify('development'),
      "REACT_APP_API_URL": process.env.NODE_ENV === 'production' ? JSON.stringify('http://localhost:3000') : JSON.stringify('http://localhost:3000'),
    })
  ],

  optimization: {
    minimize: process.env.NODE_ENV === 'production',
  },

  devtool: process.env.NODE_ENV === 'production' ? 'none' : 'cheap-module-eval-source-map'
};

const backend = {
  ...config,

  target: 'node',

  externals: {
  },

  entry: [
    './src/backend/index.js',
  ],

  output: {
    path: resolvePath(BUILD_DIR),
    filename: 'server.js',
    library: "index",
    libraryTarget: 'commonjs2'
  },
};

const frontend = {
  ...config,

  target: 'web',

  externals: {
  },

  entry: process.env.NODE_ENV === 'production' ? [
    '@babel/polyfill',
    './src/frontend/index.js'
  ] : [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    '@babel/polyfill',
    './src/frontend/index.js'
  ],

  plugins: process.env.NODE_ENV === 'production' ? config.plugins : [...config.plugins, new webpack.HotModuleReplacementPlugin()],

  output: {
    path: resolvePath(BUILD_DIR),
    filename: 'app.js',
  },
};

module.exports = [backend, frontend];