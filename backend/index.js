import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./router/user.router.js";
import postRoute from "./router/post.router.js";
import messageRoute from "./router/message.router.js";
import { app, server } from "./socket/socket.js";
import path from "path";
dotenv.config();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();
console.log(__dirname);
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//api here
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist"));
});
server.listen(8000, () => {
  connectDB();
  console.log("backend server is running");
});
