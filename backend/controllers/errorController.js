module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({ message: err.message });
};
