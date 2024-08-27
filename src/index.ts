import { request } from "./kernel/request";

enum Source {
  GoogleSearch = "GoogleSearch",
  MercadoLivre = "MercadoLivre",
  Amazon = "Amazon",
}

const SourceUrl = new Map<Source, string>([
  [Source.GoogleSearch, "https://google.com/search?tbm=shop&q="],
  [Source.MercadoLivre, "https://lista.mercadolivre.com.br/"],
  [Source.Amazon, "https://amazon.com.br/s?k="],
]);

const content = async (source: Source, target: string) => {
  const sourceUrl = SourceUrl.get(source);

  const [status, response] = await request(
    `${sourceUrl}${encodeURIComponent(target)}`
  );

  const result = status == "ok" ? await response.text() : console.log(response);

  return result ?? "";
};

(async () => {
  // console.log(await content(Source.Amazon, "Iphone 15"));
})();
