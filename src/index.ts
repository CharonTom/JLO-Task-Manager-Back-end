import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";
import cors from "cors";
import mongoose from "mongoose";

const MONGO_SRV = process.env.MONGO_SRV;

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(5000, () => {
    console.log(" Server running on port 5000");
  });

  mongoose
    .connect(`${MONGO_SRV}`)
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => console.log(err));
};

main().catch((err) => {
  console.log(err);
});
