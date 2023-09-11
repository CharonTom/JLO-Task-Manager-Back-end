import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.listen(5000, () => {
    console.log(" Server running on port 5000");
  });
};

main().catch((err) => {
  console.log(err);
});
