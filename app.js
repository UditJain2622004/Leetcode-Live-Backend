import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import questionRouter from "./routes/questionRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection established"));

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://practiceden.netlify.app/"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "100kb" }));

app.use("/questions", questionRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
