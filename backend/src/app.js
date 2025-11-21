import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cors from "cors"
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());

app.get("/",(req, res) => {
    res.send("Hello from HOME");
});
app.use("/api/auth", authRoutes)
app.use("/api",taskRoutes);


export default app;