var express = require('express');
var router = express.Router();

// node 环境接口路由
router.get('/env', (req, res) => {
    var NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
    res.json({
        stateCode: '3000',
        node_env: NODE_ENV
    });
});

// mock 模拟数据路由
router.use('/mock', require('./mock'));

// 上传文件路由
router.use('/upload', require('./upload'));

// 后端接口服务路由
router.use('/api', require('./api'));

module.exports = router;
