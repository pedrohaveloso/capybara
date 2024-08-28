import { request } from "./kernel/request";
import { JSDOM } from "jsdom";
import { createInterface } from "node:readline";
import { writeFile } from "node:fs";

enum Source {
  GoogleSearch = "GoogleSearch",
  MercadoLivre = "MercadoLivre",
  Amazon = "Amazon",
}

type RawTargetData = { price: number; url: string };

interface Adapter {
  rawData(document: Document): RawTargetData[];
}

const validPriceNumber = (price: string): number => {
  return Number(price.replace(/[^0-9]/g, ""));
};

class GoogleSearchAdapter implements Adapter {
  rawData(document: Document): RawTargetData[] {
    const priceElements = document.querySelectorAll("span.a8Pemb.OFFNJ");

    return Array.from(priceElements).map((element) => {
      const price = element.textContent ?? "";

      const anchor = element.closest("a.shntl");

      const url = new URL(
        "https://google.com" +
          (anchor instanceof HTMLAnchorElement ? anchor.href : "")
      );

      return {
        price: validPriceNumber(price),
        url: url.searchParams.get("url") ?? "",
      };
    });
  }
}

const SourceAdapter = new Map<Source, Adapter>([
  [Source.GoogleSearch, new GoogleSearchAdapter()],
]);

const SourceUrl = new Map<Source, string>([
  [Source.GoogleSearch, "https://google.com/search?tbm=shop&q="],
  [Source.MercadoLivre, "https://lista.mercadolivre.com.br/"],
  [Source.Amazon, "https://amazon.com.br/s?k="],
]);

const content = async (source: Source, target: string) => {
  const sourceUrl = SourceUrl.get(source);

  if (sourceUrl === undefined) {
    return "";
  }

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    Referer: "http://www.google.com/",
  };

  const [status, response] = await request(
    `${sourceUrl}${encodeURIComponent(target)}`,
    { headers: headers }
  );

  const result = status == "ok" ? await response.text() : console.log(response);

  return result ?? "";
};

const rawData = (source: Source, content: string): RawTargetData[] => {
  const contentHTML = new JSDOM(content);
  const adapter = SourceAdapter.get(source);

  return adapter !== undefined
    ? adapter.rawData(contentHTML.window.document)
    : [];
};

// TODO REMOVE TEMPORÁRIO!:
const h = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("COMMAND: ", async (command) => {
    if (command === "fetch") {
      const getData = async (source: Source, name: string) => {
        const cont = await content(source, name);
        const raw = rawData(source, cont);
        return { name: name, data: raw };
      };

      const total = await Promise.all([
        getData(Source.GoogleSearch, "Iphone 15"),
        getData(Source.GoogleSearch, "Ryzen 5"),
        getData(Source.GoogleSearch, "Sofá 4 lugares"),
        getData(Source.GoogleSearch, "Televisão"),
        getData(Source.GoogleSearch, "Notebook Dell"),
      ]);

      writeFile("./results.json", JSON.stringify(total), {}, () => {});
    }

    rl.close();

    h();
  });
};

h();
