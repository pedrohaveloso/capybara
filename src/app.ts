import { sleep } from "./modules/core/sleep";
import { exists } from "./modules/core/fs/exists";
import { mkdir } from "fs/promises";
import { sniper } from "./modules/sniper";

export const app = async () => {
  if (!(await exists("./tmp"))) {
    await mkdir("./tmp");
  }

  if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    return await sniper();
  }

  while (true) {
    const minutes = new Date().getMinutes();

    if (minutes === 0) {
      await sniper();
    }

    await sleep(60_000);
  }
};
