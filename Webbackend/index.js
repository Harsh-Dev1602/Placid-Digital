import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

import adminRouter from "./routes/admin.route.js";
import courseRouter from "./routes/course.route.js";
import uploadRouter from "./routes/upload.route.js";
import seedAdmin from "./controllers/admin.controller.js";
import cookieParser from "cookie-parser";

const App = express();
App.use(express.json());
App.use(cookieParser());

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3002",
];

App.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.MONGO_DB_URL;
try {
  mongoose.connect(DB_URL);
  console.log("Mongo DB connected..");
  await seedAdmin();
} catch (error) {
     console.log(error);
}

App.get("/", (req, res) => {
  res.send("hello");
});

App.use("/sfs-app/course", courseRouter);
App.use("/sfs-app/upload", uploadRouter);
App.use("/sfs-app/admin", adminRouter);

App.listen(PORT, () => {
  console.log(`WebBackend Run on this port http://localhost:${PORT}`);
});