const { AuthService } = require("../models/auth");
const asyncErrHandler = require("../middlewares/asyncErrHandler");
const generateCode = require("../utils/generateConfirmationCode");
const AppError = require("../utils/AppError");
const creatingJWTToken = require("../utils/creatingJWTToken");
const formatResponseData = require("../utils/formatResponseData");

const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/sendingEmail");

const crypto = require("crypto");

const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

const AUTH_COOKIE_SETTING = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  expires: expiryDate,
};

const postLogin = asyncErrHandler(async (req, res) => {
  const user = req.body;
  const userData = await AuthService.getUserByEmail(user?.email);
  if (!userData)
    throw new AppError("Invalid Email Or Password", 403, "INVALID_CREDENTIALS");

  if (!userData.password)
    throw new AppError(
      "User uses another login functionality",
      403,
      "NO_PASSWORD"
    );

  const isValidPass = await userData.comparePassword(user?.password);

  if (!isValidPass)
    throw new AppError("Invalid Email Or Password", 403, "INVALID_CREDENTIALS");

  const token = creatingJWTToken(userData);
  res.cookie("token", token, AUTH_COOKIE_SETTING);
  const userDataResponse = formatResponseData(userData);
  res.json({ success: true, data: userDataResponse, code: null });
});

const postSignup = asyncErrHandler(async (req, res) => {
  req.body.code = {
    value: generateCode(),
    createdAt: Date.now(),
    expireAt: Date.now() + 15 * 60 * 1000,
  };

  const user = await AuthService.createUser(req.body);

  await sendEmail(
    user.email,
    "Verify your email address",
    `<div style="font-family:sans-serif;padding:24px;background:#f9f9f9;border-radius:8px;max-width:400px;margin:auto;">
      <h2 style="color:#333;">Welcome to Our Store!</h2>
      <p style="font-size:16px;color:#444;">Your verification code is:</p>
      <div style="font-size:2rem;font-weight:bold;color:#007bff;margin:16px 0;">${user.code.value}</div>
      <p style="color:#888;font-size:13px;">Please enter this code to verify your email address.</p>
    </div>`
  );

  const token = creatingJWTToken(user);
  res.cookie("token", token, AUTH_COOKIE_SETTING);
  const userDataResponse = formatResponseData(user);
  res.json({ success: true, data: userDataResponse, code: null });
});

const postConfirmationCode = asyncErrHandler(async (req, res) => {
  const userCookie = req.userCookie;
  const { code } = await AuthService.getUserCode(userCookie.email);
  if (!code || !code.value || !code.createdAt || !code.expireAt) {
    throw new AppError("No code found. Please request a new one.", 400);
  }
  if (Date.now() > code.expireAt) {
    throw new AppError("Code expired. Please request a new one.", 403);
  }
  if (String(req.body.code) !== String(code.value)) {
    throw new AppError("Invalid Code", 403);
  }
  const update = await AuthService.updateUser(userCookie.email, {
    isActive: true,
    code: null,
  });
  const token = creatingJWTToken(update);
  res.cookie("token", token, AUTH_COOKIE_SETTING);
  const userDataResponse = formatResponseData(update);
  res.json({ success: true, data: userDataResponse, code: null });
});

const postSetCookie = asyncErrHandler(async (req, res) => {
  const userToken = req.user;

  const user = await AuthService.getUserByEmail(userToken.email);

  if (!user) throw new AppError("User Not Found", 404);

  const token = creatingJWTToken(user);

  res.cookie("token", token, AUTH_COOKIE_SETTING);

  res.json({ success: true, data: "setting cookie successfully", code: null });
});

const postCheckAuth = asyncErrHandler(async (req, res) => {
  const userCookie = req.userCookie;

  let user = await AuthService.getUserByEmail(userCookie.email);

  if (!user) throw new AppError("User Not Found", 404);

  const userDataResponse = formatResponseData(user);

  res.json({ success: true, data: userDataResponse, code: null });
});

const uploadProfilePic = asyncErrHandler(async (req, res) => {
  cloudinary.uploader
    .upload_stream(
      {
        resource_type: "image",
        folder: "profile_picture",
      },
      (error, result) => {
        console.log(error);
        if (error)
          return res.status(500).json({
            success: false,
            message: "Failed to update profile picture",
            code: "PICTURE_UPDATE_FAILED",
          });

        AuthService.updateUser(req.userCookie.email, {
          image: result.secure_url,
        })
          .then(() => {
            res.json({
              success: true,
              data: "successfully updated user picture",
              code: null,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              success: false,
              message: "Failed to update profile picture",
              code: "PICTURE_UPDATE_FAILED",
            });
          });
      }
    )
    .end(req.file.buffer);
});

const changePassword = asyncErrHandler(async (req, res) => {
  const { email } = req.userCookie;
  const { password, currPassword } = req.body;

  const user = await AuthService.getUserByEmail(email);

  if (!user)
    return res
      .status(404)
      .json({ success: false, data: null, code: "USER_NOT_FOUND" });

  const checkpswrd = await user.comparePassword(currPassword);

  if (!checkpswrd)
    throw new AppError(
      "Current Password is incorrect",
      403,
      "INVALID_CREDENTIALS"
    );

  const bcryptSaltRounds = await bcrypt.genSalt(
    Number(process.env.HASH_SALT) || 12
  );

  const hashedPswrd = await bcrypt.hash(password, bcryptSaltRounds);

  const userUpdate = await user.updateOne(
    { password: hashedPswrd },
    { new: true }
  );

  res.json({
    success: true,
    data: "Password Changed Successfully",
    code: null,
  });
});

const logout = asyncErrHandler((req, res) =>
  res
    .clearCookie("token")
    .json({ success: true, data: "Logout Successfully", code: null })
);

const sendCode = asyncErrHandler(async (req, res) => {
  const { email } = req.userCookie;
  if (req.userCookie.isActive)
    return res
      .status(403)
      .json({ success: false, data: null, code: "ALREADY_ACTIVE" });
  const codeObj = {
    value: generateCode(),
    createdAt: Date.now(),
    expireAt: Date.now() + 15 * 60 * 1000,
  };
  const updateUser = await AuthService.updateUser(email, {
    code: codeObj,
  });
  if (!updateUser) throw new AppError("User Not Found", 404, "USER_NOT_FOUND");
  await sendEmail(
    email,
    "Your verification code",
    `<div style="font-family:sans-serif;padding:24px;background:#f9f9f9;border-radius:8px;max-width:400px;margin:auto;">
      <h2 style="color:#333;">Verification Code</h2>
      <p style="font-size:16px;color:#444;">Your code is:</p>
      <div style="font-size:2rem;font-weight:bold;color:#007bff;margin:16px 0;">${codeObj.value}</div>
      <p style="color:#888;font-size:13px;">Please enter this code to verify your email address.</p>
    </div>`
  );
  res.json({
    success: true,
    data: "Code sent successfully to your email",
    code: null,
  });
});

const forgotPassword = asyncErrHandler(async (req, res) => {
  const { email } = req.body;

  const user = await AuthService.getUserByEmail(email);
  if (!user)
    return res.json({
      success: false,
      data: "Check for magic link in your email",
      code: "USER_NOT_FOUND",
    });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const token = crypto.createHash("sha256").update(resetToken).digest("hex");

  await AuthService.updateUser(email, {
    resetPasswordToken: { token, expireAt: Date.now() + 15 * 60 * 1000 },
  });

  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
  const magicLink = `${clientUrl}/reset-password?token=${token}`;
  await sendEmail(
    email,
    "Reset your password",
    `<div style="font-family:sans-serif;padding:32px;background:#f7f7fa;border-radius:10px;max-width:440px;margin:auto;box-shadow:0 2px 8px #0001;">
      <h2 style="color:#2d2d2d;">Reset Your Password</h2>
      <p style="font-size:16px;color:#444;">We received a request to reset your password. Click the button below to set a new password:</p>
      <a href="${magicLink}" style="display:inline-block;padding:12px 28px;margin:24px 0;background:#007bff;color:#fff;text-decoration:none;font-weight:bold;border-radius:6px;font-size:18px;">Reset Password</a>
      <p style="color:#888;font-size:13px;">If you did not request this, you can safely ignore this email.</p>
      <p style="color:#bbb;font-size:12px;margin-top:24px;">This link will expire in 15 minutes.</p>
    </div>`
  );

  res.json({
    success: true,
    data: "Check for magic link in your email",
    code: null,
  });
});

const resetPassword = asyncErrHandler(async (req, res) => {
  const { resetToken, newPassword } = req.body;

  console.log(resetToken);

  const user = await AuthService.getUserByResetToken(resetToken);

  if (!user) throw new AppError("Invalid Token", 403);

  if (Date.now() > user.resetPasswordToken.expireAt)
    throw new AppError("Token has expired", 403);

  const bcryptSaltRounds = await bcrypt.genSalt(
    Number(process.env.HASH_SALT) || 12
  );

  const hashedPassword = await bcrypt.hash(newPassword, bcryptSaltRounds);

  await user.updateOne({
    password: hashedPassword,
    resetPasswordToken: null,
  });

  res.json({
    success: true,
    data: "Password has been changed successfully",
    code: null,
  });
});

module.exports = {
  postLogin,
  postSignup,
  postConfirmationCode,
  postSetCookie,
  postCheckAuth,
  uploadProfilePic,
  changePassword,
  logout,
  sendCode,
  forgotPassword,
  resetPassword,
};
