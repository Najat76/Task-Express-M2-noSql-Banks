const express = require("express");
const donenv = require(`dotenv`);
donenv.config();
const PORT = 8000;
const accountsRoutes = require("./api/accounts/accounts.routes");
const connectDb = require("./database");

connectDb();

//Declare variables
const app = express();

//Middleware
app.use(express.json());

//Define Routes
app.use("/accounts", accountsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
