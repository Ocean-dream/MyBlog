'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // 从数据库中获取数据
    // let result = await this.app.mysql.get('blog_content',{})
    this.ctx.body = 'api接口'
  }
  /**
   * 获取首页列表
   */
  async getArticleList () {
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
  /**
   * 获取详情页
   */
  async getArticleById () {
    // 获取前台传来参数
    let id = this.ctx.params.id
    let sql =   'select article.id as id, ' + 
                'article.title as title,' +
                'article.article_content as article_content,' +
                'article.introduce as introduce,' +
                "FROM_UNIXTIME(article.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
                'article.view_count as view_count, ' +
                'type.typeName as typeName,' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.id ' +
                 'where article.id =' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body= {data: result}
  }
}

module.exports = HomeController;
