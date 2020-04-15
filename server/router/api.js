var express = require('express');
var router = express.Router();
var service = serverObj.api; //后台接口地址
var httpUtil = require('../utils/http_tools');
var login = serverObj.erp +'/sso/login?ReturnUrl='; //登录地址

//接口实例
router.get('/*', function (req, res) {
    httpUtil.sendRemoteRequest(req, {data: req.query, url: service + req.url, method:'get'}, function (err, result, response) {
        if(result.error === 'NotLogin'){
            result.url = login;
        }
        res.send(result);
    });
});
router.post('/*', function (req, res) {
    httpUtil.sendRemoteRequest(req, {data: req.body, url: service + req.url, method:'post'}, function (err, result, response) {
        if(result.error === 'NotLogin'){
            result.url = login;
        }
        res.send(result);
    });
});

module.exports = router;