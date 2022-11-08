import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv/config";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

//schemas
const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

//model
const User = new mongoose.model("User", userSchema);

//all users schema
const allUserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
});

//all users model
const AllUser = new mongoose.model("AllUser", allUserSchema);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use("/allusers", (req, res) => {
  AllUser.find(async (err, alluser) => {
    // res.send(alluser);
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";
      let sort = req.query.sort || "id";
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc";
      }
      const allusers = await AllUser.find({
        name: { $regex: search, $options: "i" },
      })
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);
      const total = await AllUser.countDocuments({
        name: { $regex: search, $options: "i" },
      });
      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        allusers,
      };
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  });
});

//routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      const validated = bcrypt.compareSync(password, user.password);
      if (validated) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User is not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User Already Registered" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const user = new User({
        firstname,
        lastname,
        email,
        password: hash,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered" });
        }
      });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log("Be started at port 9002");
});
