const admin = require('firebase-admin')
const twilio = require('./twilio')

module.exports = function (req, res) {
  if (!req.body.phone) {
    return res.status(422).send({ error: 'You must provide a phone number' })
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '')
  admin.auth().getUser(phone)
    .then((userRecord) => {
      const code = Math.floor(Math.random() * 8999 + 1000)

      twilio.messages.create({
        body: `You code is ${code}`,
        to: phone,
        from: '+14388004374'
      }, (error) => {
        if (error) { return res.status(422).send({ error }) }
        admin.database().ref(`users/${phone}`)
          .update({ code, codeValid: true })
          .then(_ => res.send({ success: true }))
      })
    })
    .catch((error) => {
      res.status(422).send({ error })
    })
}
