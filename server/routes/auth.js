const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const jwt = require("jsonwebtoken");
const path = require("path");

const {
  postLogin,
  postSignup,
  postConfirmationCode,
  postCheckAuth,
  postSetCookie,
  uploadProfilePic,
  changePassword,
  logout,
  sendCode,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const {
  loginValidation,
  singupValidation,
  changePasswordValidation,
  confirmationValidation,
} = require("../middlewares/authValidation");
const userToken = require("../middlewares/userToken");
const { UserModel } = require("../models/auth");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 },
});
const bearerToken = require("../middlewares/bearerToken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/oauth2/redirect/google",
    },
    function verify(accessToken, refreshToken, profile, cb) {
      UserModel.findOne({ email: profile._json.email }).then((user) => {
        if (!user)
          UserModel.create({
            name: profile._json.name,
            email: profile._json.email,
            isActive: true,
            image: profile._json.picture,
            role: "user",
            code: null,
            profile,
          })
            .then((user) => cb(null, user))
            .catch((err) => cb(err, user));
        else cb(null, user);
      });
    }
  )
);

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// router.get(
//   "/oauth2/redirect/google",
//   passport.authenticate("google", {
//     successReturnToOrRedirect:
//       "http://localhost:8080/api/auth/login/google/successful",
//     failureRedirect: "http://localhost:3000/login",
//   },)
// );

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const { email, isActive, _id } = req.user;

    const token = jwt.sign({ email, isActive, _id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    console.log("success");

    res.setHeader("Content-Type", "text/html");
    res.send(`
      <!DOCTYPE html>
      <html>
        <body>
        <style>
          span {
            display: none;
          }
        </style>
        <span id="accessToken">${token}</span>
          <script src="/sendingToken.js"></script>
        </body>
      </html>
    `);
  }
);

router.get("/login/google/successful", (req, res) => {
  const { email, isActive } = req.user;
  const userString = {
    email,
    isActive,
  };

  const token = jwt.sign(userString, process.env.JWT_SECRET);

  res.setHeader("Content-Type", "text/html");

  res.send(`
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        const token = "${token}";
        window.opener.postMessage(token, "${"https://style-hub-e-commerce-mocha.vercel.app"}");
      </script>
    </body>
    </html>
  `);
});

router.post("/login", loginValidation, postLogin);

router.post("/sign-up", singupValidation, postSignup);

router.post("/set-login", bearerToken, postSetCookie);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.use(userToken);

router.post("/confirm-account", confirmationValidation, postConfirmationCode);

router.get("/check-auth", postCheckAuth);

router.post("/upload-picture", upload.single("profilePic"), uploadProfilePic);

router.post("/change-password", changePasswordValidation, changePassword);

router.get("/logout", logout);

router.get("/send-code", sendCode);

router.post("/comment", async (req, res) => {
  const { comment, productId } = req.body;
  const userId = req.userCookie._id;

  try {
    const newComment = await CommentModel.create({ userId, comment });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
});

module.exports = router;
