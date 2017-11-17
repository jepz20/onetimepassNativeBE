const twilio = require('twilio')

const accountSid = 'AC6ded1ecfe762e4c175c50c9479a42ce2'
const authToken = '543ad5839bcb8bbd50605746077c606d'

module.exports = new twilio.Twilio(accountSid, authToken)
