const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const connect = require("./src/db/mongodb");
const { PORT } = process.env;
const passport = require("passport");
const passportConfig = require("./src/config/");
const cookieParser = require("cookie-parser");
const auth = require("./src/routes/auth");

//패스포트 설정
passportConfig();

connect(); //db 연결

// app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/user", require("./src/routes/user.router"));
app.use("/post", require("./src/routes/board.router"));
// app.use("/auth", require("./src/routes/auth"));

app.use(passport.initialize());
// app.use(passport.session());

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
