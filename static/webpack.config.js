var path = require("path");
var webpack = require("webpack");

module.exports = {
	entry: {
		index: "./src/index.jsx",
	},

	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
	},
	devtool: "cheap-module-source-map",
	mode: "none",
	stats: {
		colors: true,
		reasons: true,
		chunks: false,
	},
	devServer: {
		publicPath: "/public/",
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "eslint-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							url: false,
						},
					},
				],
			},
			{
				test: /\.jsx?$/,
				include: [
					path.resolve(__dirname, "src"),
					path.resolve("js"),
					path.resolve("node_modules/preact-compat/src"),
				],

				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-react", "@babel/preset-env"],
				},
				exclude: [
					path.resolve(__dirname, "src/components"),
					path.resolve(__dirname, "node_modules"),
				],
			},
		],
	},

	resolve: {
		modules: ["node_modules", path.resolve(__dirname, "node_modules")],

		extensions: [".js", ".json", ".jsx", ".css"],
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true,
		}),
	],
};
