import app from "../backend/src/app.js"
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";

dotenv.config();
connectDB();
app.listen(3000,()=> {
    console.log("Server is running on PORT 3000");
})