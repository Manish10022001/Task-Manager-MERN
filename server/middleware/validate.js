const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }
  next();
};
//middlware for filter and pagination
const validateQueryAndPagination = (req, res, next) => {
  const { status, page, limit } = req.query;
  const allowed = ["all", "pending", "completed"];

  if (status && !allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status filter" });
  }

  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return res.status(400).json({ message: "Invalid page number" });
  }

  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 50)) {
    return res.status(400).json({ message: "Limit must be between 1 and 50" });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateQueryAndPagination,
};
