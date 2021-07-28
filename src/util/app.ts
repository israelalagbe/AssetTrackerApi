import express,{ Application } from "express";
import expressWs from 'express-ws';


const app: Application = express();
expressWs(app);

export default app;