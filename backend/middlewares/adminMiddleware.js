
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw new Error("Unauthorized admin.");
    }
    next();
  } catch (err) {
    return res.status(401).json({
      isSuccess: false,
      messgae: err.message,
    });
  }
};
