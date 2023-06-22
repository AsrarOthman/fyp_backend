const rules = (req, res, next) => {
  if (req.user.rules= "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorised-bukan admin" });
  }
};

export default rules;
