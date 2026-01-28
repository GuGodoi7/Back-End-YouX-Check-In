import express from 'express';
import db from './database.js';

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar uma nova tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Estudar Node.js
 *               description:
 *                 type: string
 *                 example: Revisar Express, SQLite e Swagger
 *               completed:
 *                 type: boolean
 *                 enum: [true, false]
 *                 example: false
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Dados inválidos ou completed errado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/tasks', (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Título inválido' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      error: 'O campo "completed" só aceita true ou false!'
    });
  }

  const isCompleted = completed === true;

  db.run(
    `INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)`,
    [title.trim(), description || null, isCompleted ? 1 : 0],
    function(err) {
      if (err) return res.status(500).json({ error: 'Erro ao criar tarefa' });

      res.status(201).json({
        id: this.lastID,
        titulo: title.trim(),
        descricao: description || null,
        concluida: isCompleted
      });
    }
  );
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar tarefas
 *     description: Retorna todas as tarefas ou filtra por status de conclusão
 *     parameters:
 *       - in: query
 *         name: completed
 *         required: false
 *         schema:
 *           type: boolean
 *           enum: [true, false]
 *         description: Filtra tarefas por concluídas
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *       400:
 *         description: Parâmetro inválido
 *       500:
 *         description: Erro interno
 */
router.get('/tasks', (req, res) => {
  const { completed } = req.query;

  let query = 'SELECT * FROM tasks';
  const params = [];

  if (completed !== undefined) {
    if (completed !== 'true' && completed !== 'false') {
      return res.status(400).json({
        error: ') parâmetro completed só aceita true ou false!'
      });
    }
    query += ' WHERE completed = ?';
    params.push(completed === 'true' ? 1 : 0);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao listar tarefas' });

    const tarefas = rows.map(task => ({
      id: task.id,
      titulo: task.title,
      descricao: task.description,
      concluida: Boolean(task.completed),
      criado_em: task.created_at,
      atualizado_em: task.updated_at
    }));

    res.json(tarefas);
  });
});

export default router;
