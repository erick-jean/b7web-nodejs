import express, { Request, Response } from "express";
import { createContact, deleteContact, getContacts } from "../services/contact";

const router = express.Router();

//Rota para criar um contato
router.post("/contato", async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || name.length < 2) {
    return res
      .status(400)
      .json({ error: "Nome precisa ter pelo menos 2 caracteres" });
  }
  await createContact(name);
  res.status(201).json({ contato: name });
});

//Rota para listar os contatos
router.get("/contatos", async (req: Request, res: Response) => {
  let list = await getContacts();
  res.status(200).json({ contatos: list });
});

//Rota para excluir um contato
router.delete("/contato", async (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ error: "Precisa mandar um nome para excluir" });
  }
  await deleteContact(name as string);
  res.status(200).json({ contato: name });
});

export default router;
