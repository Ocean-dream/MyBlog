let ipUrl = 'http://127.0.0.1:7001/admin/'
// let ipUrl = 'http://101.201.253.124:7001/admin/' 

let servicePath = {
    login:ipUrl + 'login' ,  //  登录接口
    getTypeInfo:ipUrl + 'getTypeInfo' ,  //  获取文章分类
    addArticle:ipUrl + 'addArticle' ,  //  添加文章
    updataArticle:ipUrl + 'updataArticle' ,  //  提交编辑,
    getAllArticle: ipUrl + 'getAllArticle', // 获取所有文章列表
    deleteArticle: ipUrl + 'deleteArticle/' // 根据id删除文章

}
export default servicePath;
