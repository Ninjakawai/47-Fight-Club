const express = require("express");
const session = require("express-session");
onst path = require("path");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/histoire", (req, res) => {
  res.sendFile(path.join(__dirname + "/histoire.html"));
});

app.get("/rejoindre", (req, res) => {
  res.sendFile(path.join(__dirname + "/nous-rejoindre.html"));
});

app.get("/hall-of-fame", (req, res) => {
  res.sendFile(path.join(__dirname + "/hall-of-fame.html"));
});

app.get("/don", (req, res) => {
  res.sendFile(path.join(__dirname + "/don.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname + "/contact.html"));
});

app.get("/calendrier", (req, res) => {
  res.sendFile(path.join(__dirname + "/calendrier.html"));
});

app.get("/admin/login", (req, res) => {
  if (req.session.isAdmin == true) return res.redirect("/admin");
  res.sendFile(path.join(__dirname + "/admin/login.html"));
});

app.get("/erreur-404", (req, res) => {
  res.sendFile(path.join(__dirname + "/erreur-404.html"));
});

app.use((req, res, next) => {
  res.status(404).redirect("/erreur-404");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
