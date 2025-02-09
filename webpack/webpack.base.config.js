const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProjectDIR = path.resolve(__dirname, '../') + '/';
const SourceDIR = ProjectDIR; //+ 'src/';
const BuildDIR = ProjectDIR + './build/';

module.exports = {
  entry: {
    script: SourceDIR + '/src/index.tsx',
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
  devtool: 'source-map',
  externals: {},
  output: {
    chunkFilename: '[name].[hash].js',
    publicPath: '/',
    path: path.resolve(BuildDIR),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
          },
        },
        include: [path.resolve(SourceDIR)],
      },
      {
        test: /\.less$/i,
        exclude: /\.module\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.module\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', SourceDIR],
    alias: { src: SourceDIR },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  target: 'web',
  context: __dirname,
  performance: {
    hints: false,
    // maxAssetSize: 500000,
    // maxEntrypointSize: 500000,
  },
  stats: 'errors-only',

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(ProjectDIR, 'public/index.html'),
      scriptLoading: 'defer',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: '../tsconfig.json',
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Define output CSS filename
    }),
    /////  new CleanWebpackPlugin(),
    //   new CompressionPlugin(),
  ],
};
