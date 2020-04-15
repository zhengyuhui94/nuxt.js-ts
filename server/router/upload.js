var express = require('express');
var router = express.Router();
var serviceName = serverObj.api; // 后台接口 origin
var request = require('request');

// 上传文件接口路由
router.post('/*', function (req, res) {
    var url = serviceName + req.url;
    req.pipe(request.post({url: url, gzip: true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (url.indexOf('uploadImgUrl') != -1) {
                var results = body;
            } else {
                var results = JSON.parse(body);
            }
            res.send(results);
        }
    }))
});

module.exports = router;