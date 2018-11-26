const express = require("express");
const ReactSSR = require("react-dom/server"); //
const serverEntry = require("../dist/server-entry").default;  // 服务端渲染代码，最后服务端template之外的js代码就是这个
const fs = require("fs");
const path = require("path");

const app = express();

const template = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf8");  //服务端的模板

app.use('/public', express.static(path.join(__dirname, '../dist')));
app.get("*", function (req, res) {
  const appString = ReactSSR.renderToString(serverEntry);
  res.send(template.replace('<app><app/>', appString));
});


app.listen(2365, function () {
  console.log("This server is listening on " +
    "2365");
});
