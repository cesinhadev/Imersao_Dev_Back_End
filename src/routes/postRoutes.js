import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com o upload de arquivos
import {
  atualizaNovoPost,
  criarNovoPost, // Função para criar um novo post
  listarPosts, // Função para listar todos os posts
  uploadImage, // Função para fazer upload de uma imagem para um post
} from "../controllers/postController.js";
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000",
  optionSuccessStatus:200
}



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Define o diretório onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantém o nome original do arquivo
  },
});

const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições
  app.use(express.json());
  app.use(cors(corsOptions)); 

  // Rota para listar todos os posts
  app.get("/posts", listarPosts); 

  // Rota para criar um novo post
  app.post("/criarPost", criarNovoPost);

  // Rota para fazer upload de uma imagem
  app.post("/upload", upload.single("img"), uploadImage);
  
  
  app.put("/upload/:id", atualizaNovoPost);
};

export default routes;
