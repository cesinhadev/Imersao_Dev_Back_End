import { getTodosPosts } from "../model/postModel.js";

export async function listarPosts(req, res){
    const result = await getTodosPosts();
    res.status(200).json(result);
}