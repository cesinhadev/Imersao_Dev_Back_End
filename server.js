import express from "express";

const app = express();
app.listen("3000", () => {
    console.log("Estou escutando....");
});

app.get("/api", (req, res) => {
    res.status(200).send("Boas vinda a imersão Dev!!!");
});
