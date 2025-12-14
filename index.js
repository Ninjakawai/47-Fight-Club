const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;
app.use(express.static(__dirname));

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to the database:", err);
    return;
  } else {
    console.log(`Connected to the ${process.env.DATABASE} database...`);
  }
});

app.use(
  session({
    secret: crypto.randomBytes(48).toString("base64"),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  }),
);

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

app.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const request = "select username, password from admin";
    const [rows] = await connection.promise().execute(request);
    if (rows.length === 0)
      return res.status(401).json({ message: "Utilisateur inconnue" });

    const user = rows[0];
    const passwordVerif = await bcrypt.compare(password, user.password);
    if (!passwordVerif)
      return res.status(401).json({ message: "Information incorrect" });

    if (user.username == username && passwordVerif) {
      req.session.isAdmin = true;
      return res.json({ message: "Administrateur connecter" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
    return res.json({ message: "Erreur" });
  }
});

app.get("/event", (req, res) => {
  return res.json(JSON.parse(fs.readFileSync("events.json", "utf-8")));
});

const requireAdmin = (req, res, next) => {
  if (req.session.isAdmin) return next();
  res.redirect("/admin/login");
};

app.post("/events-write", requireAdmin, (req, res) => {
  const e = req.body;

  let data = [];

  if (fs.existsSync("events.json")) {
    const fileContent = fs.readFileSync("events.json", "utf-8").trim();

    if (fileContent.length > 0) {
      try {
        data = JSON.parse(fileContent);
      } catch (e) {
        data = [];
      }
    }
  }

  const event = { id: data.length, ...e };
  data.push(event);

  fs.writeFile("events.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(500).send("Erreur serveur");
    return res.send("Événement ajouté !");
  });
});

app.delete("/events-delete/:id", requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);

  const fileContent = fs.readFileSync("events.json", "utf-8").trim();
  const array = JSON.parse(fileContent);

  const data = array.filter((e, index) => index !== id);
  fs.writeFileSync("events.json", JSON.stringify(data, null, 2));
  res.send("Événement supprimé");
});

app.get("/admin", requireAdmin, (req, res) => {
  res.sendFile(path.join(__dirname + "/admin/home.html"));
});

app.get("/admin-logout", requireAdmin, (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/logout");
  });
});

app.get("/admin/logout", (req, res) => {
  res.sendFile(path.join(__dirname + "/admin/logout.html"));
});

app.use((req, res, next) => {
  res.status(404).redirect("/erreur-404");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
