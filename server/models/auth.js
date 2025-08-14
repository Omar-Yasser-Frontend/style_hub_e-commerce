const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AppError = require("../utils/AppError");

const { emailRegex, passwordRegex } = require("../constants");
const generateConfirmationCode = require("../utils/generateConfirmationCode");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    index: true,
    match: [emailRegex, "Invalid email format"],
  },
  resetPasswordToken: {
    token: {
      type: String,
      default: null,
      index: true,
      unique: true,
      sparse: true,
    },
    expireAt: {
      type: Date,
      default: null,
    },
  },
  password: {
    type: String,
    match: [
      passwordRegex,
      "Password must contain uppercase, lowercase, number, and special character",
    ],
  },
  isActive: { type: Boolean, default: false },
  code: { value: String, createdAt: Number, expireAt: Number },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const genSalt = await bcrypt.genSalt(12);

  const pwHash = await bcrypt.hash(this.password, genSalt);

  this.password = pwHash;
  next();
});

const UserModel = mongoose.model("User", UserSchema);

class AuthService {
  static async createUser(userData) {
    try {
      console.log(userData);
      const user = await UserModel.create(userData);

      return user;
    } catch (err) {
      console.log(err);
  if (err.code === 11000) throw new AppError("Email already exists", 400, "EMAIL_EXISTS");
  throw new AppError("Failed to create user", 500, "USER_CREATION_FAILED");
    }
  }

  static async getUserByEmail(email) {
    const user = await UserModel.findOne({ email });

  if (!user) throw new AppError("User not found", 404, "USER_NOT_FOUND");

    return user;
  }

  static async getUserByResetToken(token) {
    const user = await UserModel.findOne({
      "resetPasswordToken.token": token,
    });

    return user;
  }

  static async getUserCode(email) {
    const code = await UserModel.findOne({ email }).select({ code: true });

    if (!code) return null;

    return code;
  }

  static async updateUser(email, data) {
    const updatedData = await UserModel.findOneAndUpdate({ email }, data, {
      new: true,
    });

    return updatedData;
  }

  static async getUserById(id) {
    const user = await UserModel.findById(id);

  if (!user) throw new AppError("Invalid Email Or Password", 403, "INVALID_CREDENTIALS");

    return user;
  }
}

module.exports = {
  UserModel,
  AuthService,
};
