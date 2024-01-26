const express = require("express");
const app = express();
const cors = require("cors");
const webpush = require("web-push");
port = 3000;

app.use(cors());
app.use(express.json());

const apiKeys = {
  publicKey:
    "BHMGI2o2wRuH5pbm9TUgUfEhE-FbuigaKflt9BrxzaFP-JpfUNDJ-QEPoP_aOoqCSEM6bsabYTq15sJlFATI9Kk",
  privateKey: "Na3r44AS3rTZeGEKyPla-s8I0JCkpkgE9byCdS29QWc",
};

webpush.setVapidDetails(
  "mailto:torabi46@gmail.com",
  apiKeys.publicKey,
  apiKeys.privateKey
),
  app.get("/", (req, res) => {
    res.send("hello from server");
  });

const subsData = [];

app.get("/send-notification", (req, res) => {
  webpush.sendNotification(subsData[0], "Hello world from server");
  res.json({ status: "success", message: "Message sent successfully" });
});

app.post("/save-subscription", (req, res) => {
  subsData.push(req.body);

  res.json({ status: "success", message: "subscription saved!" });
});
app.listen(port, () => {
  console.log("port is running on 3000");
});
