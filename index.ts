import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


const corsOptions = {
  origin: ["*"]
};

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 1);

  // Pass to next layer of middleware
  next();
});

app.use(cors(corsOptions));
app.use("/", require("./routes"));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(parseInt(port || ""), "0.0.0.0", () => { console.log("Running on port " + port || "")});
