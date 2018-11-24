const express = require("express");
const ReactSSR = require("react-dom/server"); //
const serverEntry = require("../dist/server-entry").default;  // 服务端渲染代码
const fs = require("fs");
const path = require("path");

const app = express();

const template = fs.readFileSync(path.join(__dirname, "../client/template.html"), "utf-8");  //服务端的模板

app.use('./public', express.static(path.join(__dirname, '../dist')));
app.get("*", function (req, res) {
  const appString = ReactSSR.renderToString(serverEntry);
  template.replace('<app></app>', appString);
  res.send(appString);
});


app.listen(6666, function () {
  console.log("This server is listening on 3333");
});
