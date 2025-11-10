export const loginWithPassword = (req, res) => {
  const { password } = req.body;
  const staticPassword = process.env.STATIC_PASSWORD;

  if (!password) {
    return res.status(400).json({ message: "Password diperlukan." });
  }

  if (password === staticPassword) {
    return res.status(200).json({
      success: true,
      message: "Login berhasil.",
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Password yang Anda masukkan salah.",
    });
  }
};
