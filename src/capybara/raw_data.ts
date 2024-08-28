import { JSDOM } from "jsdom";
import { Source } from "./source";
import { Adapter } from "./adapter";
import { GoogleSearchAdapter } from "./adapter/google_search_adapter";

const SourceAdapter = new Map<Source, Adapter>([
  [Source.GoogleSearch, GoogleSearchAdapter],
]);

export type RawTarget = { price: number; url: string };

export const rawData = (source: Source, content: string): RawTarget[] => {
  const contentHTML = new JSDOM(content);
  const adapter = SourceAdapter.get(source);

  return adapter !== undefined
    ? adapter.rawData(contentHTML.window.document)
    : [];
};
