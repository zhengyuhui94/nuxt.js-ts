export default function(req, res, next){
    console.log(req.path);
    // next 是一个调用下一个中间件的函数
    // 如果你的中间件不是最终执行，请不要忘记在最后调用 next
    next();
}
