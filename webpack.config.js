const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV ?? "development",
  entry: "./src/index.tsx",
  module: {
    rules: [
    
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader", 
            
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