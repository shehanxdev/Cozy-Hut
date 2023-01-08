//MODULES
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import terminal_kit from "terminal-kit";
//CONTORLLERS
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
//ROUTER
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
//MIDDLEWARE
import { verify } from "./middleware/auth.js";
//MODELS
import User from "./models/User.js";
//DATA
import { generateUsers, generatePosts } from "./data/fakeDataGenerator.js";

/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
const terminal = terminal_kit.terminal;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*STORAGE CONFIG */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
//ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/post/create", verify, upload.single("picture"), createPost);

//ROUTES
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", verify, postRoutes);

//MONGODB CONFIG
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Cozy_Hut",
  })
  .then(() => {
    terminal.bold.green("MongoDB is connected\n");
    app.listen(PORT, () => {
      terminal.blue.bold(`App is listening at the port ${PORT}`);
      //const users=generateUsers(20);
      generatePosts(20).then((result) => {
        console.log(result);
      });

      // User.insertMany(users)
      // .then((result)=>{
      //   console.log(result);
      // })
      // .catch((err)=>{
      //   console.log(err);
      // });
    });
  })
  .catch((err) => {
    terminal.bold.red("Did not connect to the database");
  });
