import express, { Application, Request, Response } from "express";
import env from "./config/env";
import indexRouter from "./routes/index";

const app: Application = express();

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

try {
  const port = env.port;
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
