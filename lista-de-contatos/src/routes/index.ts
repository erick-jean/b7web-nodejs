import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";

const dataSource = "./data/list.txt";

const router = express.Router();

router.post("/contato", async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || name.length < 2) {
    return res
      .status(400)
      .json({ error: "Nome precisa ter pelo menos 2 caracteres" });
  }

  //processamento dos dados
  let list: string[] = [];
  try {
    const data = await readFile(dataSource, { encoding: "utf8" });
    list = data.split("\n");
  } catch (error) {}
  list.push(name);
  await writeFile(dataSource, list.join("\n"));
  res.status(201).json({ contato: name });
});


router.get("/contatos", async (req: Request, res: Response) => {
    let list: string[] = [];
    try {
      const data = await readFile(dataSource, { encoding: "utf8" });
      list = data.split("\n");
    } catch (error) {}
    res.status(200).json({ contatos: list });
});


router.delete("/contato", async (req: Request, res: Response) => {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ error: "Precisa mandar um nome para excluir" });
    }
    let list: string[] = [];
    try {
      const data = await readFile(dataSource, { encoding: "utf8" });
      list = data.split("\n");
    } catch (error) {}
    list = list.filter((item) => item.toLocaleLowerCase() !== (name as string).toLocaleLowerCase());

    await writeFile(dataSource, list.join("\n"));
    res.status(200).json({ contato: name });

});

export default router;
