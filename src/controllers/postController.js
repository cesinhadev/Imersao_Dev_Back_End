/* Importa as funções `getTodosPosts` e `createPost` do módulo `postModel.js`
 para interagir com o banco de dados.*/
import {
  getTodosPosts,
  createPost,
  atualizarPost,
} from "../model/postModel.js";
// Importa o módulo `fs` para realizar operações de sistema de arquivos.
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Define uma função assíncrona para listar todos os posts.
export async function listarPosts(req, res) {
  /* Chama a função para buscar os posts*/
  const result = await getTodosPosts();

  /* Envia uma resposta HTTP com status 200 (sucesso) e o resultado da consulta
    no formato JSON.*/
  res.status(200).json(result);
  console.log("Listado com sucesso !!!")
}

// Define uma função assíncrona para criar um novo post.
export async function criarNovoPost(req, res) {
  /* Obtém os dados do novo post a partir do corpo da requisição.
   Esses dados foram enviados pelo cliente em formato JSON.*/
  const novoPost = req.body;

  // Bloco try-catch para lidar com possíveis erros durante a criação do post.
  try {
    /* Chama a função `createPost` para inserir o novo post no banco de dados.
     A função retorna o post criado, que é armazenado na variável `postCriado`.*/
    const postCriado = await createPost(novoPost);

    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado.
    res.status(200).json(postCriado);
    console.log("Criado com sucesso !!!");

    // Se ocorrer algum erro durante a criação do post, este bloco será executado.
  } catch (erro) {
    // Imprime uma mensagem de erro no console para ajudar na depuração.
    console.error("Ocorreu erro na execução", erro);
  }
}

// Define uma função assíncrona para fazer o upload de uma imagem.
export async function uploadImage(req, res) {
  const imgPost = {
    descricao: "", // Inicializa a descrição como uma string vazia
    imgURL: req.file.originalname, // Obtém o nome original do arquivo da imagem
    alt: "", // Inicializa a descrição alternativa como uma string vazia
  };

  // Bloco try-catch para lidar com possíveis erros durante o upload e criação do post.
  try {
    // Cria um novo post no banco de dados.
    const postCriado = await createPost(imgPost);

    // Constrói o novo nome do arquivo, incluindo o ID do post criado.
    const imgAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Renomeia o arquivo temporário para o novo nome, movendo-o para a pasta `uploads`.
    fs.renameSync(req.file.path, imgAtualizada);

    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado.
    res.status(200).json(postCriado);
    console.log("Atualizado com sucesso !!!")
  } catch (erro) {
    // Imprime uma mensagem de erro mais detalhada no console.
    console.error(erro.message);

    // Envia uma resposta HTTP com status 500 (Erro interno do servidor) e uma mensagem de erro.
    res.status(500).json({ Erro: "Falha" });
  }
}

export async function atualizaNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgURL: urlImagem,
      descricao: descricao,
      alt: req.body.alt,
    };

    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
