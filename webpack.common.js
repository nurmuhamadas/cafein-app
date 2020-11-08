/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const ImageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      }, {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 65,
        },
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true,
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/scripts/sw.js'),
    }),
    new WebpackPwaManifest({
      name: 'Cafein App',
      short_name: 'Cafein',
      description: 'Web yang akan memudahkan dalam menemukan restoran/kafe terbaik di Indonesia',
      background_color: '#ffffff',
      crossorigin: 'use-credentials',
      theme_color: '#C70039',
      display: 'standalone',
      start_url: '/',
      orientation: 'portrait',
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/icons/cafein-logo.png'),
          sizes: [16, 32, 72, 96, 128, 192, 256, 384, 512],
          ios: true,
        },
        {
          src: path.resolve(__dirname, 'src/public/icons/cafein-logo.png'),
          size: '1024x1024',
        },
        {
          src: path.resolve(__dirname, 'src/public/icons/cafein-logo.png'),
          size: '1024x1024',
          purpose: 'maskable',
        },
      ],
    }),
  ],
};
