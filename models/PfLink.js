module.exports = (model, Schema) => {
    const PfLink = new Schema({
        mediaSite: String,
        link: String,
        createdAt: { type: Date, default: Date.now },
        userLink: {
          type: Schema.Types.ObjectId, ref: 'User'
        }
    })

    return model('PfLink', PfLink)
}