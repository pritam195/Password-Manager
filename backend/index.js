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
  let { username, name, email, mobno, password, gender, dob } =
        req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        name,
        password: hash,
        dob,
        mobno,
        gender,
      });
      let token = jwt.sign({ username, email }, "abcde");
        res.cookie("token", token);
        
        return res.status(200).json({
            email : createdUser.email
        })

      res.send(createdUser);
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

app.post("/password", async function (req, res) {
    let { email, username, password, site } = req.body;

    let set = await passwordModel.create({
        email,
        username,
        password,
        site
    })

    res.send(set);
})


app.get('/getpass', async (req, res) => {

  // const passwords = await passwordModel.find(); 
  // res.json(passwords);
   
  // const email = "chavanpritam172@gmail.com";
  // const passwordArray = await passwordModel.find({ email });

  // res.send(passwordArray);

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const passwordArray = await passwordModel.find({ email });
    return res.status(200).json(passwordArray);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching password :", error: error.message });
  }
})

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
    const editedPassword = await passwordModel.findByIdAndUpdate(id, {
      password : password
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