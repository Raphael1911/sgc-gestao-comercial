import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import Item from './models/Item.js';

const app = express();

app.use(cors());
app.use(express.json());

// Conectando ao MongoDB Local via Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB Local com sucesso!'))
  .catch((err) => console.error('Erro ao conectar:', err));

//Rota POST para criar um novo item

app.post('/api/itens', async (req, res) => {
    try {
      const criarItem = new Item(req.body);
      await criarItem.save();
      res.status(201).json(criarItem);
    } catch (error) {
      res.status(400).json({ error: "Falha ao criar o item", detalhes: error.message });
    }
    });

    //Rota PUT para atualizar um item existente
    app.put('/api/itens/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const atualizarItem = await Item.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
      if (!atualizarItem) {
        return res.status(404).json({ error: "Item não encontrado" });
      }
      res.json(atualizarItem);
    } catch (error) {
      res.status(400).json({ error: "Falha ao atualizar o item", detalhes: error.message });
    }
  });

    //Rota DELETE para remover um item
    app.delete('/api/itens/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletarItem = await Item.findByIdAndDelete(id);
      if (!deletarItem) {
        return res.status(404).json({ error: "Item não encontrado" });
      }
      res.json({ message: "Item removido com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao remover o item", detalhes: error.message });
    }
  });

//Rota GET para buscar os itens
app.get('/api/itens', async (req, res) => {
    try {
      const itens = await Item.find();
      res.json(itens);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar os itens", detalhes: error.message });
    }
  });

 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});