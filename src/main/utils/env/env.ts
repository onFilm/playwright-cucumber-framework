import * as dotenv from "dotenv";

export const getEnv = () => {
  dotenv.config({
    override: true,
    path: `utils/env/.env.${process.env.ENV}`
  });
};