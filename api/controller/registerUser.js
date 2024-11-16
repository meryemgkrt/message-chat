const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");


const registerUser = async (req, res) => {
  try {
    const { name, email, password, profile_pic } = req.body;

    const checkEmeil = await UserModel.findOne({ email });

    if (checkEmeil) {
      return res
        .status(400)
        .json({ message: "Email already exists", error: true });
    }
/* passwor into hashpassword */
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload= {
        name,
        email,
        password:hashPassword,
        profile_pic,
    }

    const user = new UserModel(payload);
    const userSave = await user.save();
    return res.status(200).json({ message: "User registered successfully", 
        data: userSave,
        success: true
     });


  } catch (error) {
    return res.status(500).json({ message: error.message || error.true });
  }
};

module.exports = registerUser;
