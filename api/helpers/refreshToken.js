async function refreshToken(req, res) {
    try {
      const { refreshToken } = req.cookies;
  
      if (!refreshToken) {
        return res.status(403).json({
          message: "Refresh token required",
          error: true,
        });
      }
  
      // Refresh token'ı doğrula
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({
            message: "Invalid refresh token",
            error: true,
          });
        }
  
        // Yeni access token oluştur
        const tokenData = {
          id: user.id,
          email: user.email,
        };
  
        const newAccessToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
  
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
        });
  
        return res.status(200).json({
          message: "Access token refreshed",
          accessToken: newAccessToken,
          success: true,
        });
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
      });
    }
  }
  
  module.exports = refreshToken;
  