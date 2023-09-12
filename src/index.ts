import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";
import cors from "cors";
import mongoose from "mongoose";

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
    .connect(
      `mongodb+srv://charonstom:ewufG476M4IZ9RjI@cluster0.uwswgyw.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => console.log(err));
};

main().catch((err) => {
  console.log(err);
});
