const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
	template : "./index.html",
	filename : "index.html"
});

module.exports = {
	entry : "./src/app.js",
	devtool : 'sourcemaps',
	cache : true,
	stats : 'normal',
	output : {
		filename : 'bundled.js',
		publicPath : '',
	},
	resolve : {
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
			test : /\.js$/,
			exclude : path.resolve(__dirname, 'node_modules'),
			use : {
				loader : 'babel-loader'
			}
		}, {
			test : /\.css$/,
			use : [ "style-loader", "css-loader" ]
		} ]
	},
	plugins : [ htmlWebpackPlugin ],
	devServer : {
		port : 3333,
		historyApiFallback : true
	}
};