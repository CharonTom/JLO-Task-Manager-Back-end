import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const MONGO_SRV = process.env.MONGO_SRV;

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

if (process.env.NODE_ENV !== "test") {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
} // Permet de run les tests en série au lieu de parallèle.

mongoose
  .connect(`${MONGO_SRV}`) // Conflit entre dotenv et TS j'ai été obligé de placer ma variable d'environnement entre backtips.
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log(err));

export default app;
