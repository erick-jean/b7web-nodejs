import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";
import { getContacts } from "../services/contact";

const router = express.Router();

const dataSource = "./data/list.txt";

router.post("/contato", async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || name.length < 2) {
    return res
      .status(400)
      .json({ error: "Nome precisa ter pelo menos 2 caracteres" });
  }

  let list = await getContacts();

  list.push(name);
  await writeFile(dataSource, list.join("\n"));
  res.status(201).json({ contato: name });
});

router.get("/contatos", async (req: Request, res: Response) => {
  let list = await getContacts();
  res.status(200).json({ contatos: list });
});

router.delete("/contato", async (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ error: "Precisa mandar um nome para excluir" });
  }
  let list = await getContacts();
  list = list.filter(
    (item) => item.toLocaleLowerCase() !== (name as string).toLocaleLowerCase()
  );

  await writeFile(dataSource, list.join("\n"));
  res.status(200).json({ contato: name });
});

export default router;
