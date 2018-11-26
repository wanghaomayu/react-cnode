## 前端技术选型

* **单页应用**：一次性加载前端程序，js从server拿data到浏览器做渲染

1. 特征：
> 1. 所有业务逻辑在前端处理，后端只提供数据接口
> 2. 所有内容在前端生成
> 3. 前端路由独立，不需要经过后端。

2. 常用类库

 * React -> Jsx
 * Vue -> tempalte
 * Angular -> typescript

3. 架构工具

 * npm/yarn
 * bower（多页应用就开始用）
 * jspm


4. 模块化工具

 * webpack: bundler 你的碎片
 * rollup.js: 效率比webpack高(有的公司开发环境用webpack，体验性更好；上线程序用rowllup打包以       提高效率)
 * browserify：限制多，用的少

5. 静态资源

 * 可以直接在js(jsx,tempalate,ts,tsx)代码里面直接用，最后由模块化工具转化成线上静态资源，并且可以定制转化过程以适应不同的场景。


* **多页应用**：内容由server用模板生成，每次跳转都需要server端。以前js只是做动画效果的

1. 曾经的js类库：jQuery和mootools和YUI
2. 模块化工具：
    requireJs（CMD）
    seaJs（AMD）
3. 架构工具：grunt和gulp -> 二者都是通过配置script执行项目
4. 静态资源：通过grunt和gulp将静态资源嵌套在html里面使用，缺点是 自由度低，可操作性差

* **其他因素**

  * pc or 移动端
  * toB or toC
  * 浏览器兼容


## webApp

* **工程架构**：WebPack

1. 解放生产力

  * 源代码预处理
  * 自动打包自动页面显示
  * 自动处理图片依赖

2. 围绕解决方案搭建环境

  * 不同的前端架构需要不同的运行架构
  * 预期可能出现的问题并规避

3. 保证项目质量

  * code lint: eslint,tslint and so on
  * 不同环境差别：加.editor


* **项目架构**

1. 技术选型

  * React
  * Vue
  * Angular

2. 数据解决方案

  * Redux
  * Mobx

3. web常用网络优化

  * ...
  * 打包压缩：

   > 1. 常用的类库都打包在vendor里面，因为类库文件基本上不怎么更新，希望其能够常驻在浏览器

## Webpack 基础配置


 ```
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',  // 输出文件名称
    path: path.join(__dirname, '../dist'),  // 输出文件路径，可以用用绝对路径拼接
    publicPath: ""   //  是我们引用静态资源路径的根目录，
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
    new HTMLPlugin()  // 能够生成一个HTML， 并且将output出来的js全部加进HTML
  ]
};

 ```

## 服务端渲染基础配置

  * **SEO友好**

  单页面不如多页面对SEO更友好原因？对于网络爬虫来说，爬的只是url地址，而多页面应用和单页面应用的区别是：前者在用户操作之后，每次请求的资源都需要经过服务端模板然后返回给浏览器端可直接render的html、css文件流；后者则是在用户操作之后通过第一次请求网站加载在浏览器端的js进行请求server端的例如json数据，请求到浏览器端之后还需要经过js和HTML、css形成render树才能呈现出来。那么，spa若要对SEO更友好，就可以经过配置服务端渲染，让爬虫抓取的url也是html、css带数据的文件流。
  * 大概配置点
  > 通过server文件，用express的use让加载进来的js文件仍然使用静态文件，用app.get去配置服务端，使浏览器端请求的资源为：服务端指定的模板文件
