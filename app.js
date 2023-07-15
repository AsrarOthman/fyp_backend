import express from "express";
import register from "./controller/auth/register.js";
import login from "./controller/auth/login.js";
import view from "./controller/user/view.js";
import listAll from "./controller/user/listAll.js";
import { check } from "express-validator";
import validatorResponse from "./middleware/validatorResponse.js";
import isAuthenticated from "./middleware/isAuthenticated.js";
import logout from "./controller/auth/logout.js";
import rules from "./middleware/rules.js";
import checkStatus from "./controller/health/checkStatus.js";
import dataRules from "./controller/user/dataRules.js";
import downloadUserInformation from "./controller/user/downloadUserInformation.js";
import pdfFile from "./controller/user/pdfFIle.js";
import getPdf from "./controller/user/getPdf.js";
import getAlldataPdf from "./controller/user/getAlldataPdf.js";
import dwnPdf from "./controller/user/dwnPdf.js";
const app = express();
app.use(express.json());

// tambah code ini bila apa problem dengan CORS policy restrictions
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});
// tambah code ini bila apa problem dengan CORS policy restrictions

// public routes tak ada validator dan authenticated
app.get("/", checkStatus);
app.get("/public", (req, res) =>
  res.status(200).json({ message: "Public route" })
);
app.post(
  "/api/register",
  check("email").notEmpty().bail().isEmail().bail(),
  check("username").notEmpty().bail().isLength({ min: 4 }).bail(),
  check("password").notEmpty().bail().isLength({ min: 8 }).bail(),
  validatorResponse,
  register
);

app.post(
  "/api/login",
  check("identifier").notEmpty().bail(),
  check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
  validatorResponse,
  login
);

// private routes
app.post("/api/pdffile", pdfFile);
app.get("/api/getpdf", getPdf);
app.get("/api/getpdfall", getAlldataPdf);
app.get("/private", isAuthenticated, dataRules);
app.get("/rules", isAuthenticated, rules, (req, res) =>
  res.status(200).json({ message: "rules route", user: req.user })
);
app.get('/api/pdffile/:id',dwnPdf);
app.get("/api/users", isAuthenticated, listAll);
app.get("/api/users/:username", isAuthenticated, view);
app.get("/api/users/download/:id", isAuthenticated, downloadUserInformation);
app.put("/api/logout", isAuthenticated, logout);

export default app;
