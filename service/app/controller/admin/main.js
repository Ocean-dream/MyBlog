'use strict'
const Contoller = require('egg').Controller

class MainContoller extends Contoller{
    async index () {
        this.ctx.body = 'hello world'
    }
    // 登录
    async login () {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM user WHERE userName = '"+userName +
                    "' AND password = '"+password+"'"
        const result = await this.app.mysql.query(sql)
        if (result.length > 0) {
            //  利用session来判断登录状态
            let sessionId = new Date().getTime()
            this.ctx.session.sessionId = {'sessionId': sessionId}
            this.ctx.body = {'code': 0, 'sessionId': sessionId, 'msg': 'login success'}
        } else {
            this.ctx.body = {'code': 1, 'msg': 'login failed'}
        }
    }
    //  获取添加文章分类列表
    async getTypeInfo () {
        const result = await this.app.mysql.select('type')
        this.ctx.body= {data: result}
    }
    // 添加文章
    async addArticle() {
        let article = this.ctx.request.body
        const result = await this.app.mysql.insert('article', article)
        console.log(result)
        // 判断插入是否成功
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            code: 0,
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }
    // 编辑文章
    async  updataArticle () {
        let article = this.ctx.request.body
        const result = await this.app.mysql.update('article', article)
        const updataSuccess = result.affectedRows === 1
        this.ctx.body = {
            code: 0,
            updataSuccess: updataSuccess
        }
    }
    // 获取文章列表
    async getTableAllData () {
        let sql =  'select article.id as id, ' + 
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
            'article.view_count as view_count, ' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id '
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data: result}
    }
    // 根据id删除文章
    async deleteArticle () {
        let id = this.ctx.params.id
        let sql = `delete from article where ${id} = article.id`
        const result = await this.app.mysql.query(sql)
        if (result.affectedRows == 1) {
            this.ctx.body ={
                data: {
                    code: 0,
                    msg: '删除成功'
                }
            }
        } else {
            this.ctx.body ={
                data: {
                    code: 1,
                    msg: '删除失败'
                }
            }
        }
    }
}

module.exports = MainContoller