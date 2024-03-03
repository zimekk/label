// import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import * as path from "path";
import webpack from "webpack";
import env from "dotenv";

env.config({ path: path.resolve(__dirname, "../../.env") });

const dev = process.env.NODE_ENV === "development";

const config = {
  target: "web",
  devServer: {
    port: 8080,
  },
  devtool: dev && "inline-source-map",
  entry: require.resolve("./src"),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(avi|mp3|mp4|ogg|png)$/,
        use: ["file-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
          plugins: dev ? ["react-refresh/babel"] : [],
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      events: "events",
    },
    // https://webpack.js.org/configuration/resolve/#resolvefallback
    fallback: {
      buffer: require.resolve("buffer"),
      crypto: false,
      fs: false,
      stream: require.resolve("stream-browserify"),
    },
  },
  output: {
    path: path.resolve(__dirname, "public"),
    clean: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      FFMPEG_CORE_PATH: "ffmpeg/ffmpeg-core.js",
      NODE_ENV: "development",
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    ...(dev ? [new ReactRefreshPlugin()] : []),
    new HtmlWebpackPlugin({
      favicon: require.resolve("./src/assets/favicon.ico"),
    }),
  ],
};

export default config;
