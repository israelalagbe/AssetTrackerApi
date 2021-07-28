import app from "./app";
import env from "./config/env";

try {
  const port = env.port;
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
