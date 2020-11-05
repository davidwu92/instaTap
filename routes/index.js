module.exports = app => {
  require('./userRoutes.js')(app)
  require('./pfLinkRoutes.js')(app)
  // require('./forgotPassword.js')(app)
  // require('./requestRoutes.js')(app)
}