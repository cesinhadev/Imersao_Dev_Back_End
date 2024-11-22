import { getTodosPosts, createPost } from "../model/postModel.js";

export async function listarPosts(req, res){
    const result = await getTodosPosts();
    res.status(200).json(result);
}

export async function criarNovoPost(req, res){
    const novoPost = req.body;

    try {
        const postCriado = await createPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error("Ocorreu erro na execusão", erro);
    }
}