// All imports in this file should be in commom js format
// Generate a absolute path
const path = require('path');
// TerserPlugin minify the bundle, but webpack 5 already comes with it
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// If not specified, webpack uses the default configuration
module.exports = {
  entry: {
    'index': './src/index.js',
    'sadCat': './src/sadCat.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '' // Public path specifies the path for the assets. You could use it to point for a CDN for example or whatever your files are storaged in
  },
  mode: 'production',
  // optimization splits commom dependencies into bundles
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 3000, // for react you need to lower the minSize since it is smaller
    },
  },
  module: {
    rules: [
      {
        // Rule for importing images
        test: /\.(png|jpg)$/, // Regex to match desired file to use this rule
        type: 'asset', // When talking about Loaders. Type property can accept one of 4 values: asset/resource, asset/inline, asset/source and asset
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024 // 3 kilobytes,
          },
        },
      },
      {
        test: /\.txt/,
        type: 'asset/source', // Import text and transform into a string
      },
      {
        // CSS rule
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'
        ],
      },
      {
        // SASS rule
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' // Order matters!
        ],
      },
      {
        test : /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/env' ], // compiles EcmaScript to version 5
            plugins: [ '@babel/plugin-proposal-class-properties' ],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: [ 'handlebars-loader' ],
      },
    ],
  },
  plugins: [
    new TerserPlugin(), // Unnecessary on webpack 5
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }), // Compile all css into a single .css file
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*', // Default, relative to the path field
        path.join(process.cwd(), 'build/**/*'), // Remove everything in the build folder
      ]
    }), // Remove all dist folder content before builds
    new HtmlWebpackPlugin({
      filename: 'helloWorld.html',
      chunks: ['index'],
      title: 'Hello World',
      template: 'src/pageTemplate.hbs',
      description: 'Some description...',
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'sadCat.html',
      chunks: ['sadCat'],
      title: 'Sad Cat',
      template: 'src/pageTemplate.hbs',
      description: 'Some description...',
      minify: false,
    }),
  ]
}