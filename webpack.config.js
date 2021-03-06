const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
	template : "./index.html",
	filename : "index.html"
});

module.exports = {
	entry : "./src/Application.tsx",
	mode: "development",
	devtool : "inline-source-map",
	cache : true,
	stats : 'normal',
	output : {
		filename : 'bundled.js',
	},

	resolve : {
		extensions : [ ".ts", ".tsx", ".js" ],
		modules : [
			'node_modules',
			path.resolve(__dirname + '/src')
		],
		alias : {
			['~'] : path.resolve(__dirname + '/src')
		}
	},

	module : {
		rules : [ {
			test : /\.ts(x?)$/,
			exclude : /node_modules/,
			use : [ {
				loader : "ts-loader"
			} ]
		},
		{
			enforce : "pre",
			test : [/\.js$/,/\.ts$/],
			loader : "source-map-loader"
		},
		{
			test : /\.css$/,
			use : [ "style-loader", "css-loader" ]
		}
		]
	},
	plugins : [ htmlWebpackPlugin ],
	devServer : {
		port : 3333,
		historyApiFallback : true,
		publicPath : 'http://localhost:3000/'
	}
};