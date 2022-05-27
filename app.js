const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();

require("./config/passport")(passport);

const db = require("./config/keys").MongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoDB Terkoneksi..."))
  .catch((err) => console.log(err));
  
  app.use(express.static("public"))

app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "rahasia",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.isAdmin = req.session.isAdmin;
  next();
});

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/comments", require("./routes/comment"));
app.use("/posting", require("./routes/post"));

const port = process.env.PORT || 3000;

app.listen(port, console.log(`sever started at port ${port}`));
