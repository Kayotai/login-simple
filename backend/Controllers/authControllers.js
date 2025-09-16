const bcrypt = require("bcrypt");
const User = require("../models/user");
const connectDB = require("../config/db"); 

exports.signup = async (req, res) => {
  try {
    await connectDB(); //  garante que tenho alguma conexão antes

    const { email, password } = req.body;
    if (!email || !password) {
      return res.redirect(`/newAccount.html?msg=${encodeURIComponent("Email and password are required!")}`);
    }

    const hashedPassword = await bcrypt.hash(password, 10); //codificando essa bomba 10x
    const newUser = new User({ email, password: hashedPassword }); //novo usuario com a senha criptografada
    await newUser.save(); //salvando a bomba

    return res.redirect(`/index.html?msg=${encodeURIComponent("Registration successful! Please log in.")}`); //voltando
  } catch (err) {
    if (err.code === 11000) {
      return res.redirect(`/index.html?msg=${encodeURIComponent("This email is already registered.")}`);
    }
    console.error("signup error:", err);
    return res.redirect(`/newAccount.html?msg=${encodeURIComponent("Error while registering user. Try again.")}`);
  }
};

exports.login = async (req, res) => {
  try {
    await connectDB(); // garante que tenho uma conexão antes

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect(`/index.html?msg=${encodeURIComponent("User not found.")}`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect(`/index.html?msg=${encodeURIComponent("Invalid password.")}`);
    }

    return res.redirect(`/index.html?msg=${encodeURIComponent("Login successful!")}`);
  } catch (err) {
    console.error("login error:", err);
    return res.redirect(`/index.html?msg=${encodeURIComponent("Server error while logging in. Try again.")}`);
  }
};
