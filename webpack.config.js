const path = require('path');
var SRC = path.resolve(__dirname, 'src/assets/');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerseWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetPlugin(),
      new TerseWebpackPlugin()
    ]
  }
  return config;
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: filename('js'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    open: true,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
          {
              from: path.resolve(__dirname, 'src/favicon.ico'),
              to: path.resolve(__dirname, 'dist')
          }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [          {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: path.resolve(__dirname, 'dist') 
          },
        }, 'css-loader']
      },
      {
        test: /\.mp3$/,
        use: 'file-loader'
      },
      {
        test: /\.s[ac]ss$/,
        use: [          {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: path.resolve(__dirname, 'dist') 
          },
        }, 'css-loader', 'sass-loader']
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
          // eslint options (if necessary)
        },
      },

    ]
  }
}