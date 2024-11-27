import express from "express";
import routes from "./src/routes/postRoutes.js";

const app = express();
routes(app)

//Iniciando servidor
app.listen("3000", () => {
    console.log("Estou escutando....");
});





// Buscando o objeto pelo id
/*function buscarPorID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}*/
/* criando rota para devolver unico objeto*/
/*app.get("/post/:id", (req,res) =>{
    const index = buscarPorID(req.params.id);
    res.status(200).json(posts[index]);
});*/
