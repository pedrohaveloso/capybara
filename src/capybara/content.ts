import { request } from "./kernel/request";
import { Source } from "./source";

const sourceUrl = new Map<Source, string>([
  [Source.GoogleSearch, "https://google.com/search?tbm=shop&q="],
  [Source.MercadoLivre, "https://lista.mercadolivre.com.br/"],
  [Source.Amazon, "https://amazon.com.br/s?k="],
]);

export const content = async (source: Source, target: string) => {
  const url = sourceUrl.get(source);

  if (url === undefined) {
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
    `${url}${encodeURIComponent(target)}`,
    { headers: headers }
  );

  const result = status == "ok" ? await response.text() : console.log(response);

  return result ?? "";
};
