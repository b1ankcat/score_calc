const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 80;
const store = []

// 启用 CORS 中间件

// 设置静态文件目录，以便能够访问HTML文件
app.use(express.static('public'));

// 使用body-parser中间件解析POST请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 处理 / 根请求
app.get('/', (req, res) => {

  const filePath = __dirname + '/public/index.html';

  res.sendFile(filePath);
});

app.post('/submitScore', (req, res) => {
  const { name, major, score } = req.body;

  // 验证总分是否在200到500之间
  if (score < 200 || score > 500) {
    return res.status(400).send("总分必须在200到500之间");
  }

  // 将数据追加到store.txt文件
  store.push({ name: name, major: major, score: score });

});

app.get('/getScores', (req, res) => {
  // 读取store.txt文件中的数据并返回
  res.status(200).json({ store });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});