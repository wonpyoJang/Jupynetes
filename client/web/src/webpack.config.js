// webpack.config.js:
loaders: [
  {
    tet: /\.less$/,
    loader: ExtractTextPlugin.extract('style',
            'css!autoprefixer!less')
  },
  {
    test: /\.svg$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/
  }
]
