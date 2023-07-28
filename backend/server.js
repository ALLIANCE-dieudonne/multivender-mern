const app = require("./app");
const databaseConn = require('./db/database')


//Handling uncaugtht Exeption
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`The server is down for handling uncaugtht Exeption`);
});

//config
let PORT;
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
  PORT = process.env.PORT;
}


//Connect to db
databaseConn();


//create server
if (PORT) {
   app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`server shutting down due to unhandled Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
