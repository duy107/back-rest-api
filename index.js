const { config } = require("dotenv");
const express = require("express");
const app = express();
// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// env
config();
const port = process.env.PORT;


//cors
const cors = require("cors");
app.use(cors(
    {
        origin: 'https://font-rest-api.vercel.app', // Chỉ định domain của frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức cho phép
        allowedHeaders: ['Content-Type', 'Authorization'], // Các header cho phép
        credentials: true, // Cho phép cookies (nếu cần)
    }
));
// body-parse
var bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.json());
// connect database
const dattabase = require("./config/database");
dattabase.connect();

// route
const routeClient = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
routeClient(app);
routeAdmin(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})