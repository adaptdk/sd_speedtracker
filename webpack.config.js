const config = {
  entry: {
    fish: './app/App.jsx',
    createprofile: './app/CreateProfile.jsx',
    profilesettings: './app/Settings.jsx',
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },
  devServer: {
    proxy: {
      '*': 'http://0.0.0.0:4820/',
    },
  },
};

module.exports = config;
