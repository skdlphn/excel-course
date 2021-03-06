const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  console.log('ARGV.mode', argv.mode );
  // const isProd = argv.mode === 'production';
  const isProd = process.env.NODE_ENV === 'production';
  const isDev = !isProd;
  console.log('process.env.NODE_ENV', process.env );
  console.log('isProd', isProd);
  console.log('isDev', isDev);
  const filename = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'excel.ico'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.PWD': JSON.stringify(process.env.PWD),
      }),
    ];

    if (isDev) {
      base.push(new ESLintPlugin());
    }
    return base;
  };

  return {
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['@babel/polyfill', './index.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
        'process': 'process/browser',
      },
    },
    devServer: {
      port: 3000,
      open: true,
      // hot: true, // js sensitive
      watchContentBase: true, // html sensitive
    },
    devtool: isDev ? 'source-map' : false,
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // ???????? ???? MiniCssExtractPlugin.loader - Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
