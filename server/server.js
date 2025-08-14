const express = require("express");
const sanitizeMongodb = require("express-mongo-sanitize");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { default: helmet } = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cart");
const webhookRouter = require("./routes/webhook");
const paymentRouter = require("./routes/payment");
const orderRouter = require("./routes/order");
const commentRouter = require("./routes/comment");
const searchRouter = require("./routes/search");

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(
      `Database connected successfully on uri ${process.env.MONGODB_URI}...`
    );
  })
  .catch((err) => console.log(err));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
  })
);

app.use((req, res, next) => {
  Object.defineProperty(req, "query", {
    ...Object.getOwnPropertyDescriptor(req, "query"),
    value: req.query,
    writable: true,
  });
  next();
});

// app.use((req, res, next) => {
//   sanitizeMongodb.sanitize(req.query);

//   sanitizeMongodb.sanitize(req.body);

//   sanitizeMongodb.sanitize(req.params);

//   next();
// });

app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:3000"],
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(express.static("public"));

app.use(helmet({ crossOriginOpenerPolicy: false }));

app.use(cookieParser());

app.use("/api/webhook", webhookRouter);

app.use(express.json({ limit: "10kb" }));

app.use(sanitizeMongodb());

app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/orders", orderRouter);
app.use("/api/comments", commentRouter);
app.use("/api/search", searchRouter);

app.use((req, res) => {
  res.status(404).send("Route Not Found");
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message, err.stack);
  const status = err?.status || 500;
  const code = err?.code || "INTERNAL_SERVER_ERROR";
  const message =
    process.env.NODE_ENV === "production"
      ? "Something went wrong"
      : err.message;

  res.status(status).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    code,
  });
});

const server = app.listen(port, () =>
  console.log(`Starting Server On Port ${port}...`)
);

process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Server shutting down due to unhandled rejection.");
    process.exit(1);
  });
});
