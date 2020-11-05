const { PfLink, User } = require('../models')
const passport = require('passport')

module.exports = app => {
    // GET LINKS
    app.get('/pflinks', passport.authenticate('jwt', { session: false }), (req, res) => {
       const { _id } = req.user
        PfLink.find({ userLink: _id })
          .populate('userLink')
          .then(userLink => res.json(userLink))
          .catch(e => console.error(e))
    })
    // POST LINK
    app.post('/pflinks', passport.authenticate('jwt', { session: false }), (req, res) => {
        const { _id: userLink } = req.user
        const { title, body, link } = req.body
      
        PfLink.create({ title, body, link, userLink })
            .then(pflink => {
             
              User.updateOne({ _id: userLink }, { $push: { links: pflink } })
              .then(() => res.sendStatus(200))
              .catch(e => console.error(e))
            })
            .catch(e => console.error(e))
    })

// delete PfLink link
      app.delete('/pflinks', passport.authenticate('jwt', { session: false }), (req, res) => {
        const { _id: userLink } = req.user
        const { _id: id } = req.body

          PfLink.deleteOne({ _id: id, userLink })
            .then(pflink => {
              User.updateOne({ _id: userLink }, { $pull: { links: id._id } })
               .then(() => res.sendStatus(200))
               .catch(e => console.error(e))
            })
            .catch(e => console.error(e))
      })

}
