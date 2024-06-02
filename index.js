import express from 'express'
import cors from "cors"
import bodyParser from "body-parser";

import UsersRouter from './routers/usersRouter.js';
import LinksRouter from './routers/linksRouter.js';
import connectDB from './db.js';
import LinksController from './controllers/linkController.js';

connectDB();

const app = express()

app.use(cors());

app.use(bodyParser.json());

const port = 3000

app.use('/users', UsersRouter);
app.use(':userId/links', LinksRouter);
app.use('/:id', LinksController.redirect);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
  })