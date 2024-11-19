import express from "express";

const posts = [
    {
        id:1,
        descricao:"foto teste",
        imagem:"https://placecats.com/millie/300/150"
    },
    {
        id:2,
        descricao:"gato dormindo",
        imagem:"https://placecats.com/millie/300/150"
    },
    {
        id:3,
        descricao:"gato comendo panqueca",
        imagem:"https://placecats.com/millie/300/150"
    },
    {
        id:4,
        descricao:"gato fazendo yoga",
        imagem:"https://placecats.com/millie/300/150"
    },
]

const app = express();
app.use(express.json());

//Iniciando servidor
app.listen("3000", () => {
    console.log("Estou escutando....");
});

/* Criando rota para ser comsumida*/
app.get("/post", (req, res) => {
    res.status(200).json(posts);
});

// Buscando o objeto pelo id
function buscarPorID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id);
    });
}
/* criando rota para devolver unico objeto*/
app.get("/post/:id", (req,res) =>{
    const index = buscarPorID(req.params.id);
    res.status(200).json(posts[index]);
});
