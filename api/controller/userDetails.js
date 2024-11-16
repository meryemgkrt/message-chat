const generateToken = require("../helpers/generateToken");

async function userDetails(req, res) {
  try {
    const token = req.cookies.token || "";

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
        error: true,
      });
    }

    const user = await generateToken(token);

    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
      });
    }

    return res.status(200).json({
      message: "User details",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "An error occurred",
      error: true,
    });
  }
}

module.exports = userDetails;

