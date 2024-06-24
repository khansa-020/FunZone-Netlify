// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';

// dotenv.config();
// const secret=process.env.JWT_KEY;
// const authMiddleware=async(req, res, next)=>{
//     try {
//         const token=req.headers.authorization.split(" ")[1];
//         if(token){
//             const decoded=jwt.verify(token, secret);
//             req.body._id=decoded?.id;
//         }
//         next();
//     } catch (error) {
//         console.log(error+"inside middleware")
//         res.status(500).json(error)
//     }
// }
// export default authMiddleware;

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_KEY;
const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    console.log(token)
    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log(decoded)
      req.body._id = decoded?.id;
    }
    next();
  } catch (error) {
    console.log(error+"inside middleware")
    console.log(error);
  }
};

export default authMiddleWare;