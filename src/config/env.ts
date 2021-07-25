import { config } from "dotenv";
config();
console.log(process.env.HELLO)
interface Environment {
  name: "local" | "dev" | "staging" | "production";
  port: number;
  [key: string]: string | number;
}

const env: Environment = {
  name: process.env.NAME as Environment['name'],
  port: Number(process.env.PORT),
  
};

export default env;
