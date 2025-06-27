const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// 静态文件服务
app.use(express.static('.'));

// 模拟登录接口
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') {
        res.json({ code: 200, message: '登录成功' });
    } else {
        res.json({ code: 401, message: '用户名或密码错误' });
    }
});

// 模拟每日一文列表接口
let poems = [
    {
        id: 1,
        title: '静夜思',
        author: '李白',
        content: '床前明月光，疑是地上霜。\n举头望明月，低头思故乡。'
    }
];

app.get('/api/poems', (req, res) => {
    res.json({ code: 200, data: poems });
});

app.post('/api/poems', (req, res) => {
    const newPoem = {
        id: poems.length + 1,
        ...req.body
    };
    poems.push(newPoem);
    res.json({ code: 200, message: '添加成功' });
});

// 模拟广告列表接口
let ads = [
    {
        id: 1,
        link: 'https://example.com',
        image: 'https://example.com/ad.jpg',
        alt: '示例广告'
    }
];

app.get('/api/ads', (req, res) => {
    res.json({ code: 200, data: ads });
});

app.post('/api/ads', (req, res) => {
    const newAd = {
        id: ads.length + 1,
        ...req.body
    };
    ads.push(newAd);
    res.json({ code: 200, message: '添加成功' });
});

// 模拟每日一文接口
app.get('/api/poem', (req, res) => {
    const poem = {
        title: '静夜思',
        author: '李白',
        content: '床前明月光，疑是地上霜。\n举头望明月，低头思故乡。'
    };
    res.json(poem);
});

// 模拟广告接口
app.get('/api/ad', (req, res) => {
    const ad = {
        link: 'https://example.com',
        image: 'https://example.com/ad.jpg',
        alt: '示例广告'
    };
    res.json(ad);
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});