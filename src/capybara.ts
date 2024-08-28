import { access, mkdir } from "fs/promises";

const exists = async (filename: string): Promise<boolean> =>
  await access(filename)
    .then(() => true)
    .catch(() => false);

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const tmpDir = "./tmp";

  if (!(await exists(tmpDir))) {
    await mkdir(tmpDir);
  }

  if (process.env.ENVIRONMENT === "DEV") {
    return;
  }

  while (true) {
    const minutes = new Date().getMinutes();

    if (minutes === 0) {
      console.log("Olá!");
    }

    await sleep(3600);
  }
})();
