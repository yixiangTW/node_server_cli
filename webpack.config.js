const ShebangPlugin = require('webpack-shebang-plugin')
const path = require('path')

module.exports = {
  entry: './cli.ts',
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  target: 'node',
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx']
  },
  plugins: [new ShebangPlugin()],
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env'], ['@babel/preset-typescript']]
          }
        }
      }
    ]
  }
}
