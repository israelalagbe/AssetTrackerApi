import express, { Application, Request, Response } from "express";
import app from "./util/app";
import indexRouter from "./routes/index";
import env from "./config/env";

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);


export default app;
