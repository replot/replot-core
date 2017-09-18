module.exports = function () {
  return {
    entry: {
      example: "./example.jsx",
      example2: "./example2.jsx",
      example3: "./example3.jsx",
      example_loading: "./example_loading.jsx",
      example_legend: "./example_legend.jsx",
      example_colors: "./example_colors.jsx",
      example_axis: "./example_axis.jsx"
    },
    output: {
      path: __dirname + "/static",
      filename: "[name].bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.jsx$/,
          loader: "babel-loader",
          query: {
            "presets": ["es2015", "react"]
          }
        }
      ]
    }
  }
};
