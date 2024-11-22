// Importar as bibliotecas necessárias
import express from "express"; // Framework para criar servidores web
import multer from "multer"; // Biblioteca para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Funções para manipular posts
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configurar o armazenamento para arquivos enviados
const storage = multer.diskStorage({
  // Definir o diretório de destino para os arquivos enviados
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Salvar os arquivos na pasta 'uploads'
  },
  // Definir o nome do arquivo
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Usar o nome original do arquivo
  }
});

// Criar uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Configurar o middleware para analisar dados JSON no corpo das requisições
  app.use(express.json());

  app.use(cors(corsOptions))

  // Rota para obter todos os posts
  app.get("/posts", listarPosts); // Chamar a função listarPosts para lidar com essa rota

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost); // Chamar a função postarNovoPost para lidar com essa rota

  // Rota para fazer upload de uma imagem
  // Usar o middleware upload para lidar com o arquivo enviado antes de chamar uploadImagem
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exportar a função de rotas para ser usada em outros módulos
export default routes;