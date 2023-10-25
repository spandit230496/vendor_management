const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const vendorRoutes = require("./routes/vendorRoutes.js");
const session = require("express-session");
const passport = require("passport");
dotenv.config();
const cookieSession = require("cookie-session");
const authRoute = require("./routes/vendorRoutes.js");
const connect = require("./db.js");
app.use(express.json());
app.use(cors())
app.options("*", cors());

app.use("/api/vendor", vendorRoutes);
app.use("/auth", authRoute);



app.use(passport.initialize());
app.use(passport.session());

app.use(
    cookieSession({
        name: "session",
        keys: ["sandy"],
        maxAge: 60 * 60 * 24 * 1000,
    })
);

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
    connect();
});

