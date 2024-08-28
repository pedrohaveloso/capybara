import { access } from "fs/promises";

export const exists = async (filename: string): Promise<boolean> =>
  await access(filename)
    .then(() => true)
    .catch(() => false);
