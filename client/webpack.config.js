const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const client_path = path.resolve(__dirname);
const public_path = path.resolve(__dirname, "..", "public");

module.exports = env => {
  return {
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
          loader: "ts-loader",
          // use tsconfig.webpack.json to ignore test files.
          // ref: https://github.com/TypeStrong/ts-loader/issues/544
          options: {
            configFile: "tsconfig.webpack.json"
          }
        }
      ]
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      // ref: https://github.com/TypeStrong/ts-loader#baseurl--paths-module-resolution
      plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    },

    plugins: [
      new webpack.DefinePlugin({
        "CONFIG_TYPE": JSON.stringify((env && env.config) ? env.config : "dev")
      }),
      new BundleAnalyzerPlugin()
    ],

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
  }
};
