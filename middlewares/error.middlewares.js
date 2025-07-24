const error = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "ValidationError") {
    err.message = "Please provide all fields";
    err.statusCode = 400;
  }

  if (err.name === "CastError") {
    err.message = "please provide correct id";
    err.statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    err.message = "Invalid Session, please log in again";
    err.statusCode = 400;
  }

  if (err.code === 11000) {
    err.message = "email is already used";
    err.statusCode = 409;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    errObject: err,
  });
};

module.exports = { error };
