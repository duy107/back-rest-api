const { config } = require("dotenv");
const express = require("express");
const app = express();

// env
config();
const port = process.env.PORT;

// body-parse
var bodyParser = require('body-parser')
app.use(bodyParser.json());

// connect database
const dattabase = require("./config/database");
dattabase.connect();

// route
const routeClient = require("./routes/client/index.route");
routeClient(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})