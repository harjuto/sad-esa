'use strict'

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')

var host = 'http://localhost'
var port = 8000

var config = {
  entry: [
    'webpack-dev-server/client?' + host + ':' + port.toString(),
    'webpack/hot/dev-server',
    './src/'
  ],
  output: {
    filename: 'bundle.js',
    path: '/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        },
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {test: /\.svg/, loader: 'svg-url-loader'},
      { test: /\.css$/, loader: "style-loader!css-loader" },
      // { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.png$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
}

var compiler = webpack(config)
compiler.plugin('done', function () {
  console.log('App is running at ' + host + ':' + port)
})
var server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true,
  contentBase: './public',
  stats: 'errors-only'
})
server.listen(port)
