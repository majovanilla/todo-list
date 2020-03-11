const path = require('path');

module.exports = {
  entry: {
    app: './src/js/index.js',
  },
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: 'main.js', // [name] will generate automatically all the needed files
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          // THIS will resolve relative URLs to reference from the app/ directory
          root: path.resolve(__dirname, 'dist'),
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};