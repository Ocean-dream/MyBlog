'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 声明中间件
  var adminAuth = app.middleware.adminauth()
  const { router, controller } = app
  router.get('/admin/index', controller.admin.main.index),
  router.post('/admin/login', controller.admin.main.login),
  router.get('/admin/getTypeInfo', adminAuth, controller.admin.main.getTypeInfo),
  router.post('/admin/addArticle', adminAuth, controller.admin.main.addArticle),
  router.post('/admin/updataArticle', adminAuth, controller.admin.main.updataArticle),
  router.get('/admin/getAllArticle', adminAuth, controller.admin.main.getTableAllData),
  router.get('/admin/deleteArticle/:id', adminAuth, controller.admin.main.deleteArticle)
}