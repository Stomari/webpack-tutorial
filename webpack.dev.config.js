// All imports in this file should be in commom js format
// Generate a absolute path
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// If not specified, webpack uses the default configuration
module.exports = {
  entry: {
    'index': './src/index.js',
    'sadCat': './src/sadCat.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '' // Public path specifies the path for the assets. You could use it to point for a CDN for example or whatever your files are storaged in
  },
  mode: 'development',
  devServer: {
    port: 9000,
    devMiddleware: { 
      writeToDisk: true,
    }
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
          'style-loader', 'css-loader'
        ],
      },
      {
        // SASS rule
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader' // Order matters!
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
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*', // Default, relative to the path field
        path.join(process.cwd(), 'build/**/*'), // Remove everything in the build folder
      ]
    }), // Remove all dist folder content before builds
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      title: 'Hello World',
      // filename: 'subfolder/custom_filename.html',
      template: 'src/pageTemplate.hbs',
      description: 'Some description...',
    }),
    new HtmlWebpackPlugin({
      filename: 'sadCat.html',
      chunks: ['sadCat'],
      title: 'Sad Cat',
      // filename: 'subfolder/custom_filename.html',
      template: 'src/pageTemplate.hbs',
      description: 'Some description...',
    }),
  ]
}