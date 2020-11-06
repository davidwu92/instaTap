module.exports = (model, Schema) => {
    const User = new Schema({
        username: { type: String, required:true },
        email: {type: String, required:true, unique:true},
        phone: {type: String, required:true, unique:true},
        links: [{ type: Schema.Types.ObjectId, ref: 'PfLink' }],
        bio: String,
        password: { type: String, require: true},
        // resetPasswordToken: String,
        // resetPasswordExpires: Date,
        // friends: [{type:String}],
        // pending:[],
        // requests: [{ type: Schema.Types.ObjectId, ref: 'FriendRequest' }]
    })
    User.plugin(require('passport-local-mongoose'))
  
    return model('User', User)
}