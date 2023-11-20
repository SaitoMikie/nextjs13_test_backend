import express, { Request, Express, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
const prisma = new PrismaClient();

// Todoの一覧を呼び出すapi
app.get("/allTodos", async (req: Request, res: Response) => {
  try {
    const allTodos = await prisma.todo.findMany();
    return res.json(allTodos);
  } catch (error) {
    return res.status(500).json(`Error get Todos:${error}`);
  }
});

// Todoを追加する
app.post("/createTodo", async (req: Request, res: Response) => {
  const { title, details, isCompleted } = req.body;

  try {
    const createTodo = await prisma.todo.create({
      data: {
        title,
        details,
        isCompleted,
      },
    });
    return res.json(createTodo);
  } catch (error) {
    return res.status(400).json(`Error creating Todo:${error}`);
  }
});

// Todoを編集する
app.put("/editTodo/:id", async (req: Request, res: Response) => {
  const { title, details, isCompleted } = req.body;
  const id = Number(req.params.id);

  try {
    const editTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        details,
        isCompleted,
      },
    });
    return res.json(editTodo);
  } catch (error) {
    return res.status(400).json(`Error edit Todo:${error}`);
  }
});

// Todoを削除する
app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const deleteTodo = await prisma.todo.delete({
      where: { id },
    });
    return res.json(deleteTodo);
  } catch (error) {
    return res.status(500).json(`Error delete Todo:${error}`);
  }
});

app.listen(PORT, () => console.log("server is running"));
