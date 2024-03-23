const jwt = require("jsonwebtoken");

const verifyToken = async( req,res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decode;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token " });
    }
  } else {
    res.status(401).json({ message: "No token provided " });
  }
};
const verifyTokenAndAuthorization=(req,res,next)=>{
  verifyToken(req,res,()=>{
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    }else{
      return res
      .status(401) //kt3ny 401:Unauthorized
      .json({
        message: "You are not allowed , you only can update your profile",
      });
    }
  })
}
const verifyTokenAndAdmin=(req,res,next)=>{
  verifyToken(req,res,()=>{
    if ( req.user.isAdmin) {
      next();
    }else{
      return res
      .status(401) //kt3ny 401:Unauthorized
      .json({
        message: "You are not allowed , only admin",
      });
    }
  })
}

module.exports={verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin};
