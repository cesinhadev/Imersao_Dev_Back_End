import express from "express";
import { criarNovoPost, listarPosts } from "../controllers/postController.js";

const routes = (app) => {
  app.use(express.json());

  /* Criando rota para trazer odos os post*/
  app.get("/posts", listarPosts);
  app.post("/criarPost", criarNovoPost );
};

export default routes;