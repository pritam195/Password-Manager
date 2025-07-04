const express = require('express');
const app = express();
require("dotenv").config();

const userModel = require("./models/user")
const passwordModel = require('./models/password')
const cmModel = require('./models/contactmsg')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true 
}))

app.get("/", (req, res) => {
    res.send("HELLO WORLD");
})

app.post("/create", (req, res) => {
  const { username, name, email, mobno, password, gender, dob, secretKey } =
    req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error("Error generating salt:", err);
      return res.status(500).json({ error: "Error generating salt" });
    }

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: "Error hashing password" });
      }

      try {
        const createdUser = await userModel.create({
          username,
          email,
          name,
          password: hash,
          secretKey: hash,
          dob,
          mobno,
          gender,
        });

        const token = jwt.sign({ username, email }, "abcde");
        res.cookie("token", token);

        return res.status(200).json({
          email: createdUser.email, 
        });
      } catch (err) {
        console.error("User creation error:", err);
        return res.status(500).json({ error: "Failed to create user" });
      }
    });
  });
});


app.post("/login", async function (req, res) {
  let user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (result) {
      let token = jwt.sign(
        { username: user.username, email: user.email },
        "abcde"
      );
      res.cookie("token", token);
      res
        .status(200)
        .json({ message: "Login Successful", username: user.username });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
});


const { encrypt } = require("./utils/encryptUtils");

app.post("/password", async (req, res) => {
  const { email, username, password, site } = req.body;

  try {
    const encryptedPassword = encrypt(password);

    const newPassword = await passwordModel.create({
      email,
      username,
      password: encryptedPassword,
      site,
    });

    res.status(200).json(newPassword);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Encryption or Save Error", error: err.message });
    console.error("Error saving password:", err);
  }
});



const { decrypt } = require("./utils/encryptUtils"); // make sure this path is correct

app.post("/getpass", async (req, res) => {
  const { email, secretKey } = req.body;

  if (!email || !secretKey) {
    return res
      .status(400)
      .json({ message: "Email and secretKey are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(secretKey, user.secretKey);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid secret key" });
    }

    const passwordArray = await passwordModel.find({ email });
    console.log("Fetched passwords:", passwordArray);

    const decryptedPasswords = passwordArray.map((p) => {
      try {
        const decrypted = decrypt(p.password); // Try decryption
        return { ...p._doc, password: decrypted };
      } catch (err) {
        console.error("Decryption failed for", p.site, err.message);
        return { ...p._doc, password: "ErrorDecrypting" };
      }
    });

    return res.status(200).json(decryptedPasswords);
  } catch (error) {
    console.error("Server error in /getpass:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});




app.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPassword = await passwordModel.findOneAndDelete({ _id: id });

    if (!deletedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.status(200).json({ message: "Password deleted successfully", deletedPassword });
  } catch (err) {
    console.error("Error deleting password : ", err);
    res.status(500).json({ message: "Server error while deleting password" })
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const {id }= req.params;
    const { password } = req.body;
    const encryptedPassword = encrypt(password);
    const editedPassword = await passwordModel.findByIdAndUpdate(id, {
      password : encryptedPassword
    }, {new : true});

    if (!editedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }
    return res.status(200).json({ message: "Password updated successfully", editedPassword });
    
  } catch (err) {
    console.error("Error editing the password :", err);
    res.status(500).json({ message: "Server error while editing the password" });
  }
})

app.post("/contact", async (req, res) => {
  try {
    let { name, email, message } = req.body;

    let contactMessage = await cmModel.create({
      name,
      email,
      message,
    });

    console.log("Message sent successfully");
    res.send(contactMessage);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));