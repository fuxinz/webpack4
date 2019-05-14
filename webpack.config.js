var webpack = require("webpack");
var HtmlWebpackPlugins = require("html-webpack-plugin");
var ExtractTextWebpackPlugins = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var autoprefixer = require("autoprefixer");
var MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: chunkData => {
      return chunkData.chunk.name === "main" ? "[name].js" : "[name]/[name].js";
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        include: /src/, // 只转化src目录下的js
        exclude: /node_modules/ // 排除掉node_modules，优化打包速度
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugins.extract([
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]--[local]"
            }
          },
          "postcss-loader"
        ])
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: "images/" // 图片打包后存放的目录
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugins({
      template: "./src/index.html",
      hash: true
    }),
    new ExtractTextWebpackPlugins("css/style.css"),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimize: true
  },
  devServer: {
    contentBase: "./dist",
    host: "localhost", // 默认是localhost
    port: 3000, // 端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    proxy: {
      //配置跨域，访问的域名会被代理到本地的3000端口
      "/api": "http://localhost:3000"
    }
  },
  mode: "development"
};
