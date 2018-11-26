import App from './App.jsx';
import React from 'react';

// 为什么需要建这样一个文件来导出APP文件呢？
// 因为这里面的语法都是js相关，浏览器能识别的代码。在服务端（Node）环境下识别不了
export default <App/>;
