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

// Initialize express app
const app = express();
app.set("port", PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

// Catch a 404 and forward to error handler
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint does not exist",
  });
});

// Message to notify of the server status
app.get("/", (req, res) => {
  res.send("Server is up and running. ");
});

// Create http server
const server = http.createServer(app);
const socketio = new Server(server);

// Create socket connection
global.io = socketio.listen(server);
global.io.on("connection", WebSockets.connection);
server.listen(PORT);

// Message to display which port  we are listening on
server.on("listening", () => {
  console.log(`Listening on port::${PORT}`);
});
