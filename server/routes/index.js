const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const connection = require("../config/database");
const User = connection.models.User;
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;

/**
 * -------------- POST ROUTES ----------------
 */

// Login user
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/account");
    });
  })(req, res, next);
});

// Register new user
router.post("/register", (req, res, next) => {
  const saltHash = genPassword(req.body.pw);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.uname,
    hash: hash,
    salt: salt,
    admin: true,
  });

  newUser.save().then((user) => {
    console.log(user);
  });

  res.redirect("/login");
});

// Logout user
router.post("/logout", (req, res) => {
  console.log("Before logout - Session:", req.session); // Log session before logout
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error destroying session" });
    }
    console.log("After logout - Session destroyed");
    res.status(200).json({ message: "Logout successful" });
  });
});

/**
 * -------------- GET ROUTES ----------------
 */

router.get("/", (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

router.get("/login", (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';
  res.send(form);
});

router.get("/register", (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';
  res.send(form);
});

router.get("/account", isAuth, (req, res, next) => {
  console.log("Account route accessed");
  res.json({ username: req.user.username, admin: req.user.admin });
});

// Other routes...
module.exports = router;
