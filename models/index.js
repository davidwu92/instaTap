const { model, Schema } = require('mongoose')

const User = require('./User.js')(model, Schema)
const PfLink = require('./PfLink.js')(model, Schema)

module.exports = { User, PfLink }