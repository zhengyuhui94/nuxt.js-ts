var Utils=(function () {
    var tools = function (selector, context) {
    };
    //获取环境变量
    tools.prototype.mapValue = function (hostMap) {
        var key = process.env.NODE_ENV;
        if (typeof key == 'undefined')
            key = 'dev';
        if (typeof hostMap == 'undefined')
            throw new TypeError('host map is required');
        var mapped = {};
        mapped.env = key;
        for(var i in hostMap){
            mapped[i] = hostMap[i][key]
        }
        return mapped;
    };
    var utils = new tools();

    return utils;
})();

module.exports=Utils;