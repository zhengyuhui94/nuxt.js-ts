/**
 * http utility
 */
var request = require('request');

var HttpUtil = {
    sendRemoteRequest: function (req, options, callback) {
        try {
            // 设置请求配置
            var opts = {
                method: options.method || 'post',
                headers: {
                    'Content-Type': options.contentType || 'application/json;charset=utf-8',
                    'cookie': req.headers['cookie'],
                    'User-Agent': req.headers['user-agent'],
                    // 'token': req.headers['token'],
                    // 'auth': req.headers['auth']
                },
                url: options.url,
                body: JSON.stringify(options.data)
            };
            request(opts, function (error, response, body) {
                // console.log('测试'+JSON.stringify(response));
                if(!error && response.statusCode == 200) {
                    var responseData;
                    try{
                        responseData = JSON.parse(body);
                    }catch(err){
                        responseData = {
                            error:'NotLogin',
                            url:''
                        };
                    }
                    callback.call(callback, null, responseData, response);
                    return true;
                }else if(!error && response.statusCode == 403){
                    var responCode = {
                        error:'NotPower',
                    };
                    callback.call(callback, null, responCode, response);
                    return true;
                }else{ // 将错误输出到接口相应里，方便观察调试
                    console.log(' 错误日志----' + error);
                    callback.call(callback, error, {code: 500, msg: '服务器繁忙，请稍后再试！'}, response);
                    return false;
                }
            });
        } catch (e) {
            callback.call(callback, error, {code: 500, msg: '服务器繁忙，请稍后再试'}, null);
            return false;
        }
    }
};
exports = module.exports = HttpUtil;
