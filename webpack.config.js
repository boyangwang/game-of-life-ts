const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/index.ejs')
  })]
};
