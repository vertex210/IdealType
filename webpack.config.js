const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
    include: path.join(__dirname),
    exclude: /(node_modules)|(dist)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-syntax-dynamic-import'
        ]
      }
    }
  }
]
},
resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      css: path.resolve(__dirname, 'public/css/'),
      images: path.resolve(__dirname, 'public/images/')
    }
  }
};
