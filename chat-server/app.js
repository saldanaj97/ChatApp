import express from "express";
import http from "http";
import cors from "cors";
import WebSocket from "./utils/WebSockets.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import dotenv from "dotenv";
import "./config/mongo.js";

// Export the vars we need from the .env file
//dotenv.config({ path: ".env" });
export const SECRET_KEY = process.env.SECRET_KEY;

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

// Cors
const corsOptions = {
  origin: ["https://localhost:3000", "https://saldanaj97-chattyio.herokuapp.com"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content", "Accept", "Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  maxAge: 600,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", chatRoomRouter);
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
const socketio = new Server({ noServer: true });

// Create socket connection
global.io = socketio.listen(server);
global.io.on("connection", WebSocket.connection);
server.listen(PORT);

// Message to display which port  we are listening on
server.on("listening", () => {
  console.log(`Listening on port::${PORT}`);
});
