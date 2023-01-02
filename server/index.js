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
//ROUTER
import authRoutes from "./routes/auth.js";

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

//ROUTES 
app.use("/auth",authRoutes);
//MONGODB CONFIG
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:"Cozy_Hut"
  })
  .then(() => {
    terminal.bold.green("MongoDB is connected\n");
    app.listen(PORT, () => {
      terminal.blue.bold(`App is listening at the port ${PORT}`);
    });
  })
  .catch((err) => {
    terminal.bold.red("Did not connect to the database");
  });
