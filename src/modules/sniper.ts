import { writeFile } from "fs/promises";
import { request } from "./core/request";
import { getContent } from "./sniper/get_content";
import { getData } from "./sniper/get_data";
import { Source } from "./sniper/source";

export const sniper = async () => {
  const [status, body] = await request("http://localhost:3000/");

  if (status === "error") return;

  const json = await body.json();

  const targets = json["targets"] as Array<{
    name: string;
    sources: Array<string>;
  }>;

  const data = async (source: Source, name: string) => {
    const content = await getContent(source, name);
    return getData(source, content);
  };

  const allTargets = targets
    .map((target) =>
      target.sources.map((source) => ({ name: target.name, source: source }))
    )
    .flat(1);

  const fns = allTargets.map(
    (target) => async () =>
      await data(Source[target.source as Source], target.name)
  );

  const raw = await Promise.all(fns.map((fn) => fn()));

  await writeFile(
    `./tmp/raw_data_${Date.now()}.json`,
    JSON.stringify(raw.flat(1))
  );
};
