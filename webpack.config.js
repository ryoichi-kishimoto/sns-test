module.exports = {
  entry:  './src/app.es6',
  output: {
    filename: 'docs/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.es6$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.es6'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  devtool: 'inline-source-map'
};
