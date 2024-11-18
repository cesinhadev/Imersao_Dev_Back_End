import express from "express";

const app = express();

//Iniciando servidor
app.listen("3000", () => {
    console.log("Estou escutando....");
});

/* Criando rota para ser comsumida*/
app.get("/api", (req, res) => {
    res.status(200).send("Boas vinda a imersão Dev!!!");
});

/* Criando rotas para comsumir dados no formado .json*/
app.get("/book", (req, res) => {
    res.status(200).send({
        "titulo": "Capitão de Areia",
        "autor": "Jorge Amado",
        "ano":1937,
        "Genero": "Ficção"
    });
});