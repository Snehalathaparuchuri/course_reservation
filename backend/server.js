// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const MONGO_URI = "mongodb://127.0.0.1:27017/course_reservation"; // Hardcoded MongoDB URL

// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error(err));

// // User Schema
// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });
// const User = mongoose.model("User", UserSchema);

// // Registration Schema
// const RegistrationSchema = new mongoose.Schema({
//   username: String,
//   course: String,
//   paymentStatus: { type: String, default: "Pending" },
// });
// const Registration = mongoose.model("Registration", RegistrationSchema);

// // User Registration (POST)
// app.post("/auth/register", async (req, res) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ username, email, password: hashedPassword });
//   await user.save();
//   res.json({ success: true, message: "User registered successfully" });
// });

// // User Login (POST)
// app.post("/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(400).json({ success: false, message: "Invalid credentials" });
//   }
//   res.json({ success: true, message: "Login successful", user: { username: user.username, email: user.email } });
// });

// // Course Registration (POST)
// app.post("/courses/register", async (req, res) => {
//   const { username, course } = req.body;
//   const registration = new Registration({ username, course });
//   await registration.save();
//   res.json({ success: true, message: "Course registered successfully" });
// });

// // ✅ Get All Registered Users (GET)
// app.get("/auth/users", async (req, res) => {
//   const users = await User.find({}, { password: 0 }); // Exclude password field
//   res.json(users);
// });

// // ✅ Get All Course Registrations (GET)
// app.get("/courses/registrations", async (req, res) => {
//   const registrations = await Registration.find();
//   res.json(registrations);
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors({
  origin: "http://localhost:3000",  // Allow frontend to access backend
  credentials: true
}));
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/course_reservation"; // Hardcoded MongoDB URL

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// Registration Schema
const RegistrationSchema = new mongoose.Schema({
  username: String,
  course: String,
  paymentStatus: { type: String, default: "Pending" },
});
const Registration = mongoose.model("Registration", RegistrationSchema);

// User Registration (POST)
app.post("/auth/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.json({ success: true, message: "User registered successfully" });
});

// User Login (POST)
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  }
  res.json({ success: true, message: "Login successful", user: { username: user.username, email: user.email } });
});

// Course Registration (POST)
app.post("/courses/register", async (req, res) => {
  const { username, course } = req.body;
  const registration = new Registration({ username, course });
  await registration.save();
  res.json({ success: true, message: "Course registered successfully" });
});

// ✅ Get All Registered Users (GET)
app.get("/auth/users", async (req, res) => {
  const users = await User.find({}, { password: 0 }); // Exclude password field
  res.json(users);
});

// ✅ Get All Course Registrations (GET)
app.get("/courses/registrations", async (req, res) => {
  const registrations = await Registration.find();
  res.json(registrations);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));