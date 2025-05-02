import jwt from "jsonwebtoken";

// Middleware для перевірки токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Немає токена доступу." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Недійсний токен." });
    }
    req.user = user; // userId та role тепер в req.user
    next();
  });
};

// Middleware для перевірки ролі
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Доступ заборонено." });
    }
    next();
  };
};

export { authenticateToken, authorizeRoles };
