const path = require("path");

const client_path = path.resolve(__dirname);
const public_path = path.resolve(__dirname, "..", "public");

module.exports = {
  mode: "development",

  entry: client_path + "/src/index.tsx",

  output: {
    path: path.resolve(public_path, "js"),
    filename: "bundle.js",
    publicPath: "js"
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  devServer: {
    port: 3000,
    contentBase: public_path,
    openPage: "index.html",
    watchContentBase: true,
    historyApiFallback: true
  },

  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/
  }
};
