import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";
import { asyncHandler } from "../services/asyncHandler.js";

export const roles = {
  User: "User",
  Admin: "Admin",
  superAdmin: "Super admin"
};

export const auth = (acceptRoles = []) => {
  return asyncHandler(async (req, res, next) => {

    const { authorization } = req.headers;

    // ================= CHECK HEADER =================
    if (!authorization || !authorization.startsWith("Bearer__")) {
      return res.status(401).json({ message: "Invalid Bearer Token" });
    }

    // ================= EXTRACT TOKEN =================
    const token = authorization.split("__")[1];
    
    let decoded;
    
    // ================= VERIFY TOKEN =================
    try {
      decoded = jwt.verify(token, process.env.EMAIL_TOKEN);
    } catch (err) {

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }

      return res.status(401).json({ message: "Invalid token" });
    }

    // ================= CHECK PAYLOAD =================
    if (!decoded?.id || !decoded?.isLoggedIn) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    // ================= GET USER =================
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ================= ROLE CHECK =================
    if (acceptRoles.length && !acceptRoles.includes(user.role)) {
      console.log(user);
      
      return res.status(403).json({ message: "Not authorized" });
    }

    // ================= SUCCESS =================
    req.user = user;
    next();

  });
};