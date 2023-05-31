const mongoose = require("mongoose");

const databaseConn = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((data) => {
      console.log(`mongo connected with the server : ${data.connection.host}`);
    });
};

module.exports = databaseConn;
