import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import usersRouter from "./routes/users.js";

const app = express();

const port = process.env.PORT;

let database = process.env.MONGO_URI;

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`);
  });

app.use(express.json());

app.use(cors());

app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});