const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV ?? "development",
  entry: "./main.jsx",
  module: {
    rules: [
    
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader:"babel-loader",
                options:{
                    presets:["@babel/preset-env",
                    ["@babel/preset-react",{runtime:'automatic'}]]
                }
            }] 
            
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx",".js",".css"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};