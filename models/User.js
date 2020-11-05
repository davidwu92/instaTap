module.exports = (model, Schema) => {
    const User = new Schema({
        username: { type: String, required:true },
        email: {type: String, required:true, unique:true},
        phone: {type: String, required:true, unique:true},
        links: [{ type: Schema.Types.ObjectId, ref: 'PfLink' }],
        bio: String,
        // resetPasswordToken: String,
        // resetPasswordExpires: Date,
        password: { type: String, require: true},
        // friends: [{type:String}],
        // pending:[],
        // requests: [{ type: Schema.Types.ObjectId, ref: 'FriendRequest' }]
    })
    User.plugin(require('passport-local-mongoose'))
    User.index({name: "text", username: "text", email: "text", instruments: "text", skills: "text"})
  
    return model('User', User)
}