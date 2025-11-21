import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authUserMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized! Please login." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user)
      return res.status(401).json({ message: "Invalid user!" });

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};

export default authUserMiddleware;
