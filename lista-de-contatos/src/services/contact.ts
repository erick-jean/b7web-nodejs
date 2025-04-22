import { readFile } from "fs/promises";

const dataSource = "./data/list.txt";

export const getContacts = async () => {
  let list: string[] = [];
  try {
    const data = await readFile(dataSource, { encoding: "utf8" });
    list = data.split("\n");
  } catch (error) {}
  return list;
};
