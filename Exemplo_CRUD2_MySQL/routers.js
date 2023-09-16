import { connection } from './db.js';
import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
    res.send('Bem-vindo à minha aplicação Node.js com MySQL!');
  });

router.get('/movies', (req, res) => {
    connection.query('SELECT * FROM `movies`', function (err, results, fields) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
      }
      res.json(results); // Envia os resultados como resposta no formato JSON
    });
});

router.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM `movies` WHERE cod = ?';

    connection.query(query, [id], function (err, results, fields) {
        if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
        }

        if (results.length === 0) {
        return res.status(404).json({ error: 'Filme não encontrado' });
        }

        res.json(results[0]); // Envia o primeiro resultado como resposta no formato JSON
  });
});

// Rota para inserir um novo filme
router.post('/new', async (req, res) => {
    try {
      const { titulo, sinopse, duracao, imagem, dataLancamento } = req.body;
      if (!titulo || !sinopse || !duracao || !imagem || !dataLancamento) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
  
      // Decodifica a imagem base64 para binário
      const imagemBinario = Buffer.from(imagem, 'base64');

      //Para decodificar use
     //var base64Image = new Buffer(arrayBuffer, 'binary').toString('base64');

  
      const query = 'INSERT INTO `movies` (titulo, sinopse, duracao, imagem, dataLancamento) VALUES (?, ?, ?, ?, ?)';
      const values = [titulo, sinopse, duracao, imagemBinario, dataLancamento];
  
      const [result] = connection.execute(query, values);
  
      res.status(201).json({ message: 'Filme inserido com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
    }
  });