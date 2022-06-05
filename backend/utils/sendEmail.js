const nodeMailer = require('nodemailer')

const sendEmail = async options => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp-mail.outlook.com', // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: process.env.SMPT_MAIL, // Simple Mail Transfer Protocol
      pass: process.env.SMPT_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail
