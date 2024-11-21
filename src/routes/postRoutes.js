import express from "express";
import { listarPosts } from "../controllers/postController.js";

const routes = (app) => {
  app.use(express.json());

  /* Criando rota para trazer odos os post*/
  app.get("/posts", listarPosts);
};

export default routes;