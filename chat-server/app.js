import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import WebSockets from "./utils/WebSockets.js";
import "./config/mongo.js";

/* Routes */
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import chatRoomRouter from "./routes/room.js";
import deleteRouter from "./routes/delete.js";

/* Middlewares */
import { decode } from "./middlewares/jwt.js";

// App will listen on port 3000 unless otherwise specified in the .env file
const PORT = process.env.PORT || 3000;

// Initialize the express app and create http server
const app = express();
const server = http.createServer(app);
const socketio = new Server(server);

// Create socket connectionc
global.io = server.listen(PORT);
global.io.on("connection", WebSockets.connection);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/* Catch a 404 and forward to error handlerr */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint does not exist",
  });
});

app.get("/", (req, res) => {
  res.send("Server is up and running. ");
});
