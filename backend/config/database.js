const mongoose = require('mongoose')

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    })
    .then(data => {
      console.log(`MongoDB connecter with server: ${data.connection.host}`)
    })
    // No need to write because we are shutting down the server on the error
    // .catch(err => {
    //   console.log(err)
    // })
}

module.exports = connectDatabase;