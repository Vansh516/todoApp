const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../utils/Error.utils");
let jwt = require("jsonwebtoken");
let userCollection = require("../models/user.models");

const authenticate = expressAsyncHandler(async (req, res, next) => {
  console.log(req.cookies); // {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNjg3YTM0OTQ1Y2Y4MmY0ODlmNTgyMTIxIiwiaWF0IjoxNzUzMjY5NzI2LCJleHAiOjE3NTMzNTYxMjZ9.2DJevyajD3LlpzfOpmqz38El_5llv5FAHXbc-A2_K-M'z}

  let token = req.cookies.token;
  if (!token) return next(new CustomError("please login first", 401));

  // decrypt the token
  let decodedValue = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedValue);
  /*
    {
  payload: '687a34945cf82f489f582121',
  iat: 1753270047,
  exp: 1753356447
}
   */

  let user = await userCollection.findById(decodedValue.payload);
  if (!user)
    return next(new CustomError("Invalid Session, please login again", 400));

  req.myUser = user;
  next();
});

module.exports = {
  authenticate,
};
