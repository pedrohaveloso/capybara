import { JSDOM } from "jsdom";
import { Source } from "./source";
import { Adapter } from "./adapter";
import { GoogleSearch } from "./adapter/google_search";
import { MercadoLibre } from "./adapter/mercado_libre";

const SourceAdapter = new Map<Source, Adapter>([
  [Source.GoogleSearch, GoogleSearch],
  [Source.MercadoLibre, MercadoLibre],
]);

export type RawTarget = { price: number; url: string };

export const getData = (source: Source, content: string): RawTarget[] => {
  const contentHTML = new JSDOM(content);
  const adapter = SourceAdapter.get(source);

  return adapter !== undefined
    ? adapter.rawData(contentHTML.window.document)
    : [];
};
