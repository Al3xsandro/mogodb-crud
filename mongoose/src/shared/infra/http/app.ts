import 'reflect-metadata';
import express from "express";

import 'express-async-errors';

import '../../container/index';

import createConnection from '../mongoose';
createConnection();

import routes from '../http/routes/index';
import { handleErrors } from './middlewares/handleErrors';

const app = express();
app.use(express.json());

app.use(routes);

app.use(handleErrors);

export { app };