/**
 * 中间件添加路由守卫   判断session是否存在
 * 存在执行下一步    不存在提示尚未登录
 */
module.exports = options => {
    return async function adminauth(ctx, next) {
        if (ctx.session.sessionId) {
            await next()
        } else {
            ctx.body = {data: '没有登录'}
        }
    }
}