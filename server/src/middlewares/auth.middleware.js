import jwt from "jsonwebtoken";

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

export { auth };
