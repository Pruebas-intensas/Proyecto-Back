import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


const corsOptions = {
  origin: ["*"]
};

app.use(cors(corsOptions));
app.use("/", require("./routes"));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(parseInt(port || ""), "0.0.0.0", () => { console.log("Running on port " + port || "")});
