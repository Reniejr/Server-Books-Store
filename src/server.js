//MAIN IMPORTS
const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");

//SERVICES IMPORTS
const mainRoute = require("./_services");

//ERRORS HANDLING IMPORTS
const {
  notFound,
  unAuthorized,
  forbidden,
  badRequest,
  genericError,
} = require("./utilities/_ErrorsHandling");

//MAIN
const server = express(),
  PORT = process.env.PORT || 5001,
  accessOrigins =
    process.env.NODE_ENV !== "production"
      ? [process.env.FE_URL_DEV, process.env.FE_URL_PROD]
      : [process.env.FE_URL_DEV],
  corsOptions = {
    origin: (origin, callback) => {
      accessOrigins.indexOf(origin) !== -1
        ? callback(null, true)
        : callback(new Error("CORS ISSUES - ACCESS NOT ALLOWED"));
    },
  };

//MIDDLEWARE
server.use(express.json());
server.use(cors(corsOptions));

//ROUTES
server.get("/", async (req, res, next) => {
  try {
    res.send("<h1>Books Store Server</h1>");
  } catch (error) {
    console.log(error);
    next(error);
  }
});
//MAIN ROUTE
server.use("/", mainRoute);

//ERRORS
server.use(notFound);
server.use(unAuthorized);
server.use(forbidden);
server.use(badRequest);
server.use(genericError);

//CONSOLE LOG
console.log(listEndpoints(server));

//MONGO CONNECTION
mongoose
  .connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(PORT, () => {
      process.env.NODE_ENV === "production"
        ? console.log(`Server Running on PORT : ${PORT}`)
        : console.log(`Server Running on : http://localhost:${PORT}`);
    })
  )
  .catch((err) => console.log(err));
