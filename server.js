import express from "express";
import routes from "./src/routes/postsRoutes.js";


// // Array de posts de exemplo (será substituído pelos dados do banco de dados)
// const posts = [
//     { id: 1, descricao: "Uma foto teste", imagem: "https://placecats.com/millie/300/150" },
//     { id: 2, descricao: "Gato fazendo yoga", imagem: "https://placecats.com/millie/300/150" },
//     { id: 3, descricao: "Gato fazendo panqueca", imagem: "https://placecats.<ctrl61>com/millie/300/150" },
// ];

// Cria uma instância do Express
const app = express();
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

