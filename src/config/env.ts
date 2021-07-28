import { config } from "dotenv";
import { Environment } from "../types";

if(process.env.NODE_ENV === 'test'){
  config({path: '.env.test'});
}
else {
  config();
}

const env: Environment = {
  name: process.env.NAME as Environment['name'],
  port: Number(process.env.PORT),
  
};

export default env;
