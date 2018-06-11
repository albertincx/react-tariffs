var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var cssName = 'style.css'
var jsName = 'bundle.js'
var pPath = 'dist/assets'

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  })
]
let cssLoader = {
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [
            require('autoprefixer')
          ]
        }
      }
    }
  ]
}
if (process.env.NODE_ENV === 'production') {
  cssName = 'style-[hash].css'
  jsName = 'bundle-[hash]-' + (new Date().getTime()) + '.js'
  plugins.push(
    new CleanWebpackPlugin([pPath + '/'], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  )
  plugins.push(new ExtractTextPlugin({
    filename: cssName
  }))
  cssLoader = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {loader: 'css-loader', options: {importLoaders: 1}},
        {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                require('autoprefixer')
              ]
            }
          }
        }
      ]
    })
  }
}

plugins.push(new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
}))

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js'
  ],
  output: {
    path: `${__dirname}/${pPath}/`,
    filename: jsName,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-3']
        }
      },
      cssLoader
    ]
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'}
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            unsafe_comps: true,
            properties: true,
            keep_fargs: false,
            pure_getters: true,
            collapse_vars: true,
            unsafe: true,
            warnings: false,
            sequences: true,
            dead_code: true,
            drop_debugger: true,
            comparisons: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          }
        }
      }),
    ]
  }
}