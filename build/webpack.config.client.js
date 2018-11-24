const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',  // 输出文件名称，加hash为了让浏览器辨识哪些缓存没有更新，已达到最大化利用缓存的效果
    path: path.join(__dirname, '../dist'),  // 输出文件路径，可以用用绝对路径拼接
    publicPath: "/public"   //  是我们引用静态资源路径的根目录，
                     //  特别重要： ①可以区分是不是静态资源 ②可以将静态资源放在CDN，所以通过public直接指定cdn域名即可
  },
  module: {
    rules: [
      {
        test: /.jsx$/, //配置哪种类型的文件
        loader: 'babel-loader'  // 可以将最新的js语法(es6\es7\es8\jsx)编译成es5，能让浏览器识别的语法(React官方指定的jsx转换工具即：babel-loader)
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules') // 因为node_modules下面的代码都是js，所以不能将其目录下的代码也通过babel-loader编译
        ]
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "../client/template.html")
    })  // 能够生成一个HTML， 并且将output出来的js全部加进HTML
  ]
};
