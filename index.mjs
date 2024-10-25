import express from "express";
import urlRoute from "./routes/url.js";
import { connectToMongoDB } from "./connect.js";
import URL from "./models/url.js";
import path from "path";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import { Timestamp } from "mongodb";
import {restrictToLoggedinUSerOnly , checkauth} from "./middleware/auth.js"
const app = express();
const port = 3000;

connectToMongoDB("mongodb://localhost:27017/short-url-2").then(() =>
  console.log("mongodb connected")
);
//*********Server side rendering -SSR */
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//MIDDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/",checkauth, staticRoute);
app.use("/url",restrictToLoggedinUSerOnly, urlRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
