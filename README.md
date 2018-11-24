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
